from datetime import datetime
from decimal import Decimal
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.invoice import Invoice
from app.models.payment import Payment
from app.schemas.payment import PaymentCreate


def generate_payment_number(db: Session) -> str:
    """Generate sequential payment number like PAY-2026-0001."""
    year = datetime.now().year
    count = db.query(Payment).count() + 1
    return f"PAY-{year}-{count:04d}"


def process_payment(db: Session, data: PaymentCreate) -> Payment:
    if not data.invoice_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invoice ID is required for payment recording",
        )

    invoice = db.query(Invoice).filter(Invoice.id == data.invoice_id).first()
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found",
        )

    if invoice.status == "CANCELLED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot record payment against a cancelled invoice",
        )

    if invoice.status == "DRAFT":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invoice must be confirmed before recording payments",
        )

    if invoice.status == "PAID":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invoice is already fully paid",
        )

    outstanding = invoice.total_amount - invoice.paid_amount
    if data.amount > outstanding:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Payment amount (${data.amount}) exceeds outstanding balance (${outstanding})",
        )

    payment = Payment(
        payment_number=generate_payment_number(db),
        invoice_id=invoice.id,
        amount=data.amount,
        payment_method=data.payment_method.upper(),
        payment_date=data.get_payment_date(),
        note=data.note,
    )
    db.add(payment)

    # Update invoice paid balance
    invoice.paid_amount += data.amount
    if invoice.paid_amount >= invoice.total_amount:
        invoice.status = "PAID"

    db.commit()
    db.refresh(payment)
    db.refresh(invoice)
    return payment
