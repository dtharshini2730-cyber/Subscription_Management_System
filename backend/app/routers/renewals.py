from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_roles
from app.db.database import get_db
from app.models.renewal import SubscriptionRenewalHistory, SubscriptionRenewalReminder
from app.models.user import User
from app.schemas.renewal import (
    RenewalHistoryResponse,
    RenewalReminderResponse,
    RenewalRenewRequest,
    RenewalSummaryResponse,
)
from app.services.renewal_service import (
    generate_renewal_reminders_for_subscription,
    get_subscription_reminders,
    get_upcoming_renewals,
    mark_reminder_as_sent,
    renew_subscription,
)

router = APIRouter(prefix="/renewals", tags=["Renewals"])


@router.get("/upcoming", response_model=List[RenewalSummaryResponse])
def list_upcoming_renewals(
    horizon_days: int = Query(default=30, ge=1, le=365),
    current_user: User = Depends(require_roles("ADMIN", "STAFF")),
    db: Session = Depends(get_db),
):
    data = get_upcoming_renewals(db, horizon_days=horizon_days)
    return data


@router.get("/{subscription_id}/reminders", response_model=List[RenewalReminderResponse])
def list_subscription_reminders(
    subscription_id: str,
    current_user: User = Depends(require_roles("ADMIN", "STAFF")),
    db: Session = Depends(get_db),
):
    return get_subscription_reminders(db, subscription_id)


@router.post("/{subscription_id}/generate-reminders", response_model=List[RenewalReminderResponse])
def generate_subscription_reminders(
    subscription_id: str,
    current_user: User = Depends(require_roles("ADMIN", "STAFF")),
    db: Session = Depends(get_db),
):
    return generate_renewal_reminders_for_subscription(db, subscription_id)


@router.post("/{subscription_id}/reminders/{reminder_id}/send", response_model=RenewalReminderResponse)
def send_reminder(
    subscription_id: str,
    reminder_id: str,
    current_user: User = Depends(require_roles("ADMIN", "STAFF")),
    db: Session = Depends(get_db),
):
    reminder = db.query(SubscriptionRenewalReminder).filter(
        SubscriptionRenewalReminder.id == reminder_id,
        SubscriptionRenewalReminder.subscription_id == subscription_id,
    ).first()
    if not reminder:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Renewal reminder not found")
    return mark_reminder_as_sent(db, str(reminder.id))


@router.get("/{subscription_id}/history", response_model=List[RenewalHistoryResponse])
def list_renewal_history(
    subscription_id: str,
    current_user: User = Depends(require_roles("ADMIN", "STAFF")),
    db: Session = Depends(get_db),
):
    return (
        db.query(SubscriptionRenewalHistory)
        .filter(SubscriptionRenewalHistory.subscription_id == subscription_id)
        .order_by(SubscriptionRenewalHistory.renewed_at.desc())
        .all()
    )


@router.post("/{subscription_id}/renew", response_model=RenewalHistoryResponse)
def renew_subscription_endpoint(
    subscription_id: str,
    payload: RenewalRenewRequest,
    current_user: User = Depends(require_roles("ADMIN", "STAFF")),
    db: Session = Depends(get_db),
):
    return renew_subscription(
        db,
        subscription_id,
        new_expiry_date=payload.new_expiry_date,
        renewal_amount=payload.renewal_amount,
        notes=payload.notes,
    )
