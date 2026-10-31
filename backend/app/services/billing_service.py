import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional
from dateutil.relativedelta import relativedelta
from sqlalchemy.orm import Session
from app.models.invoice import Invoice, InvoiceLine
from app.models.subscription import Subscription
from app.schemas.invoice import BillingRunResponse
from app.utils.date_utils import get_next_period_dates


def generate_invoice_number(db: Session) -> str:
    """Generate sequential invoice number like INV-2026-0001."""
    year = datetime.now().year
    count = db.query(Invoice).count() + 1
    return f"INV-{year}-{count:04d}"


def calculate_due_date(issue_date: date, payment_terms: str) -> date:
    """Determine invoice due date based on payment terms."""
    terms = payment_terms.lower()
    if "15" in terms:
        return issue_date + relativedelta(days=15)
    elif "30" in terms:
        return issue_date + relativedelta(days=30)
    elif "60" in terms:
        return issue_date + relativedelta(days=60)
    elif "end of month" in terms:
        return issue_date + relativedelta(day=31)
    else:  # Immediate / Default
        return issue_date


def generate_invoice_for_subscription(
    db: Session,
    subscription: Subscription,
    period_start: date,
    period_end: date,
    issue_date: Optional[date] = None,
) -> Optional[Invoice]:
    """
    Generate a recurring invoice for an active subscription.
    Checks and prevents duplicate invoices for the same period.
    """
    if not issue_date:
        issue_date = date.today()

    # 1. Duplicate invoice prevention rule
    existing = (
        db.query(Invoice)
        .filter(
            Invoice.subscription_id == subscription.id,
            Invoice.period_start == period_start,
            Invoice.period_end == period_end,
        )
        .first()
    )
    if existing:
        return None  # Already billed for this period

    due_date = calculate_due_date(issue_date, subscription.payment_terms)

    invoice = Invoice(
        invoice_number=generate_invoice_number(db),
        subscription_id=subscription.id,
        customer_id=subscription.customer_id,
        status="DRAFT",
        issue_date=issue_date,
        due_date=due_date,
        period_start=period_start,
        period_end=period_end,
        subtotal=subscription.subtotal,
        tax_amount=subscription.tax_total,
        discount_amount=subscription.discount_total,
        total_amount=subscription.grand_total,
        paid_amount=Decimal("0.00"),
        notes=f"Auto-generated recurring invoice for period {period_start} to {period_end}",
    )
    db.add(invoice)
    db.flush()

    # Copy lines from subscription to invoice
    for s_line in subscription.lines:
        inv_line = InvoiceLine(
            invoice_id=invoice.id,
            product_id=s_line.product_id,
            variant_id=s_line.variant_id,
            description=f"Subscription billing ({subscription.subscription_number})",
            quantity=s_line.quantity,
            unit_price=s_line.unit_price,
            tax_rate=s_line.tax_rate,
            discount_amount=s_line.discount_amount,
            amount=s_line.total,
        )
        db.add(inv_line)

    # Advance subscription's next_billing_date to period_end
    subscription.next_billing_date = period_end

    # Check if subscription reached expiry and auto_close is enabled
    if subscription.auto_close and period_end >= subscription.expiry_date:
        subscription.status = "CLOSED"

    db.commit()
    db.refresh(invoice)
    return invoice


def execute_billing_run(db: Session, as_of_date: Optional[date] = None) -> BillingRunResponse:
    """
    Scan all ACTIVE subscriptions due for billing on or before as_of_date,
    generating recurring invoices without duplicate periods.
    """
    if not as_of_date:
        as_of_date = date.today()

    active_subs = (
        db.query(Subscription)
        .filter(
            Subscription.status == "ACTIVE",
            Subscription.start_date <= as_of_date,
            Subscription.expiry_date > as_of_date,
        )
        .all()
    )

    created_ids: List[uuid.UUID] = []
    total_amount = Decimal("0.00")
    skipped_count = 0

    for sub in active_subs:
        billing_start = sub.next_billing_date or sub.start_date
        if billing_start > as_of_date:
            continue

        _, billing_end = get_next_period_dates(billing_start, sub.plan.billing_frequency)
        # Cap period_end to sub expiry
        if billing_end > sub.expiry_date:
            billing_end = sub.expiry_date

        invoice = generate_invoice_for_subscription(
            db=db,
            subscription=sub,
            period_start=billing_start,
            period_end=billing_end,
            issue_date=as_of_date,
        )

        if invoice:
            created_ids.append(invoice.id)
            total_amount += invoice.total_amount
        else:
            skipped_count += 1

    return BillingRunResponse(
        invoices_generated=len(created_ids),
        total_amount=total_amount,
        invoice_ids=created_ids,
        skipped_existing=skipped_count,
    )
