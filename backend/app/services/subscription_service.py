import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.customer import Customer
from app.models.plan import Plan
from app.models.product import Product, ProductVariant
from app.models.subscription import Subscription, SubscriptionLine
from app.schemas.subscription import SubscriptionCreate, SubscriptionLineCreate, SubscriptionUpdate
from app.utils.date_utils import get_next_period_dates


def generate_subscription_number(db: Session) -> str:
    """Generate sequential subscription number like SUB-2026-0001."""
    year = datetime.now().year
    count = db.query(Subscription).count() + 1
    return f"SUB-{year}-{count:04d}"


VALID_TRANSITIONS = {
    "DRAFT": ["QUOTATION", "CONFIRMED", "CLOSED"],
    "QUOTATION": ["CONFIRMED", "CLOSED"],
    "CONFIRMED": ["ACTIVE", "CLOSED"],
    "ACTIVE": ["PAUSED", "CLOSED"],
    "PAUSED": ["ACTIVE", "CLOSED"],
    "CLOSED": [],  # Terminal state
}


def validate_subscription_transition(current_status: str, new_status: str):
    curr = current_status.upper()
    nxt = new_status.upper()
    if curr == nxt:
        return
    allowed = VALID_TRANSITIONS.get(curr, [])
    if nxt not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid subscription transition: cannot transition from '{curr}' to '{nxt}'. Allowed: {allowed}",
        )


def calculate_subscription_totals(
    db: Session,
    lines_data: List[SubscriptionLineCreate],
) -> tuple[Decimal, Decimal, Decimal, Decimal, list[dict]]:
    """Compute subtotal, tax_total, discount_total, grand_total, and resolved line dicts."""
    subtotal = Decimal("0.00")
    tax_total = Decimal("0.00")
    discount_total = Decimal("0.00")
    resolved_lines = []

    for line_in in lines_data:
        product = db.query(Product).filter(Product.id == line_in.product_id).first()
        if not product or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product {line_in.product_id} not found or inactive",
            )

        unit_price = line_in.unit_price
        if unit_price is None or unit_price == Decimal("0.00"):
            unit_price = product.sales_price
            if line_in.variant_id:
                variant = db.query(ProductVariant).filter(ProductVariant.id == line_in.variant_id).first()
                if variant and variant.is_active:
                    unit_price += variant.additional_price

        qty = line_in.quantity
        line_base = unit_price * Decimal(qty)
        disc = min(line_in.discount_amount, line_base)
        line_after_disc = line_base - disc
        tax = (line_after_disc * line_in.tax_rate) / Decimal("100.00")
        line_total = line_after_disc + tax

        subtotal += line_base
        discount_total += disc
        tax_total += tax

        resolved_lines.append({
            "product_id": line_in.product_id,
            "variant_id": line_in.variant_id,
            "quantity": qty,
            "unit_price": unit_price,
            "tax_rate": line_in.tax_rate,
            "discount_amount": disc,
            "total": line_total,
        })

    grand_total = subtotal - discount_total + tax_total
    return subtotal, tax_total, discount_total, grand_total, resolved_lines


def create_subscription(db: Session, data: SubscriptionCreate) -> Subscription:
    customer = db.query(Customer).filter(Customer.id == data.customer_id).first()
    if not customer or not customer.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Customer not found or inactive",
        )

    plan = db.query(Plan).filter(Plan.id == data.plan_id).first()
    if not plan or not plan.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Plan not found or inactive",
        )

    if data.expiry_date <= data.start_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Expiry date must be after start date",
        )

    subtotal, tax_total, discount_total, grand_total, resolved_lines = calculate_subscription_totals(
        db, data.lines
    )

    # Next billing date is start_date when active or scheduled
    req_status = (data.status or "DRAFT").upper()
    next_billing = data.start_date if req_status == "ACTIVE" else None

    sub = Subscription(
        subscription_number=generate_subscription_number(db),
        customer_id=data.customer_id,
        plan_id=data.plan_id,
        quotation_id=data.quotation_id,
        status=req_status,
        start_date=data.start_date,
        expiry_date=data.expiry_date,
        next_billing_date=next_billing,
        payment_terms=data.payment_terms,
        subtotal=subtotal,
        tax_total=tax_total,
        discount_total=discount_total,
        grand_total=grand_total,
        auto_close=data.auto_close or plan.can_auto_close,
    )
    db.add(sub)
    db.flush()

    for line_dict in resolved_lines:
        line = SubscriptionLine(subscription_id=sub.id, **line_dict)
        db.add(line)

    db.commit()
    db.refresh(sub)
    return sub
