from datetime import date, datetime, timedelta
from decimal import Decimal
from typing import List, Optional

from dateutil.relativedelta import relativedelta
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.plan import Plan
from app.models.subscription import Subscription
from app.models.renewal import SubscriptionRenewalHistory, SubscriptionRenewalReminder

REMINDER_DAYS = (7, 3, 1)


def calculate_next_renewal_date(subscription: Subscription) -> date:
    """Return the subscription renewal date. For renewal management, this is the contract expiry date."""
    if not subscription.expiry_date:
        return subscription.start_date
    return subscription.expiry_date


def calculate_next_expiry_for_plan(plan: Optional[Plan], current_expiry_date: date) -> date:
    frequency = (plan.billing_frequency if plan else "MONTHLY").upper()
    if frequency == "DAILY":
        return current_expiry_date + relativedelta(days=1)
    if frequency == "WEEKLY":
        return current_expiry_date + relativedelta(weeks=1)
    if frequency == "YEARLY":
        return current_expiry_date + relativedelta(years=1)
    return current_expiry_date + relativedelta(months=1)


def generate_renewal_reminders_for_subscription(db: Session, subscription_id: str) -> List[SubscriptionRenewalReminder]:
    subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
    if not subscription:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

    base_renewal_date = calculate_next_renewal_date(subscription)
    reminders: List[SubscriptionRenewalReminder] = []

    for offset in REMINDER_DAYS:
        already_exists = (
            db.query(SubscriptionRenewalReminder)
            .filter(
                SubscriptionRenewalReminder.subscription_id == subscription.id,
                SubscriptionRenewalReminder.renewal_date == base_renewal_date,
                SubscriptionRenewalReminder.reminder_days_before == offset,
            )
            .first()
        )
        if already_exists:
            continue

        reminder = SubscriptionRenewalReminder(
            subscription_id=subscription.id,
            renewal_date=base_renewal_date,
            reminder_days_before=offset,
            reminder_status="PENDING",
            notes=f"Renewal reminder scheduled {offset} days before expiry.",
            is_active=(base_renewal_date - timedelta(days=offset)) >= date.today(),
        )
        db.add(reminder)
        reminders.append(reminder)

    db.commit()
    for reminder in reminders:
        db.refresh(reminder)
    return reminders


def get_upcoming_renewals(db: Session, horizon_days: int = 30) -> List[dict]:
    today = date.today()
    window_end = today + timedelta(days=horizon_days)

    subscriptions = (
        db.query(Subscription)
        .filter(
            Subscription.status.in_(["ACTIVE", "PAUSED", "CONFIRMED"]),
            Subscription.expiry_date >= today,
            Subscription.expiry_date <= window_end,
        )
        .all()
    )

    results: List[dict] = []
    for subscription in subscriptions:
        reminders = (
            db.query(SubscriptionRenewalReminder)
            .filter(
                SubscriptionRenewalReminder.subscription_id == subscription.id,
                SubscriptionRenewalReminder.reminder_status == "PENDING",
            )
            .order_by(SubscriptionRenewalReminder.reminder_days_before.asc())
            .all()
        )

        last_history = (
            db.query(SubscriptionRenewalHistory)
            .filter(SubscriptionRenewalHistory.subscription_id == subscription.id)
            .order_by(SubscriptionRenewalHistory.renewed_at.desc())
            .first()
        )

        next_reminder_in_days = None
        if reminders:
            reminder = reminders[0]
            next_reminder_in_days = (subscription.expiry_date - today).days - reminder.reminder_days_before

        results.append(
            {
                "subscription_id": subscription.id,
                "subscription_number": subscription.subscription_number,
                "customer_name": subscription.customer.company_name if subscription.customer else "Unknown customer",
                "status": subscription.status,
                "current_expiry_date": subscription.expiry_date,
                "next_renewal_date": calculate_next_renewal_date(subscription),
                "reminder_schedule": list(REMINDER_DAYS),
                "next_reminder_in_days": next_reminder_in_days,
                "reminder_count": len(reminders),
                "renewal_ready": len(reminders) > 0,
                "last_renewal_at": last_history.renewed_at if last_history else None,
            }
        )

    return results


def get_subscription_reminders(db: Session, subscription_id: str) -> List[SubscriptionRenewalReminder]:
    return (
        db.query(SubscriptionRenewalReminder)
        .filter(SubscriptionRenewalReminder.subscription_id == subscription_id)
        .order_by(SubscriptionRenewalReminder.reminder_days_before.asc())
        .all()
    )


def mark_reminder_as_sent(db: Session, reminder_id: str) -> SubscriptionRenewalReminder:
    reminder = db.query(SubscriptionRenewalReminder).filter(SubscriptionRenewalReminder.id == reminder_id).first()
    if not reminder:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Renewal reminder not found")

    if reminder.reminder_status == "SENT":
        return reminder

    reminder.reminder_status = "SENT"
    reminder.sent_at = datetime.utcnow()
    reminder.is_active = False
    db.commit()
    db.refresh(reminder)
    return reminder


def renew_subscription(db: Session, subscription_id: str, new_expiry_date: Optional[date] = None, renewal_amount: Optional[Decimal] = None, notes: Optional[str] = None) -> SubscriptionRenewalHistory:
    subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
    if not subscription:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

    current_expiry = subscription.expiry_date
    if not current_expiry:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Subscription has no expiry date")

    if new_expiry_date is None:
        new_expiry_date = calculate_next_expiry_for_plan(subscription.plan, current_expiry)

    if new_expiry_date <= current_expiry:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Renewal must extend the subscription beyond the current expiry date")

    existing_renewal = (
        db.query(SubscriptionRenewalHistory)
        .filter(
            SubscriptionRenewalHistory.subscription_id == subscription.id,
            SubscriptionRenewalHistory.previous_expiry_date == current_expiry,
            SubscriptionRenewalHistory.renewed_to_date == new_expiry_date,
        )
        .first()
    )
    if existing_renewal:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Duplicate renewal detected for this subscription period")

    if subscription.status.upper() in {"CLOSED"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Closed subscriptions cannot be renewed")

    subscription.expiry_date = new_expiry_date
    subscription.status = "ACTIVE"
    subscription.next_billing_date = new_expiry_date

    reminder_total = (
        db.query(SubscriptionRenewalReminder)
        .filter(
            SubscriptionRenewalReminder.subscription_id == subscription.id,
            SubscriptionRenewalReminder.renewal_date == current_expiry,
        )
        .count()
    )

    history = SubscriptionRenewalHistory(
        subscription_id=subscription.id,
        previous_expiry_date=current_expiry,
        renewed_to_date=new_expiry_date,
        renewal_amount=renewal_amount or Decimal("0.00"),
        reminder_count=reminder_total,
        status="RENEWED",
        notes=notes or "Subscription renewed successfully",
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    return history
