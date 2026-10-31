import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, Field


class PaymentCreate(BaseModel):
    invoice_id: Optional[uuid.UUID] = None  # Optional when submitting to /invoices/{id}/payments
    amount: Decimal = Field(gt=Decimal("0.00"))
    payment_method: str = Field(default="CREDIT_CARD")  # CREDIT_CARD, BANK_TRANSFER, ACH, CHECK, CASH
    payment_date: Optional[date] = None
    date: Optional[date] = None  # frontend alias
    note: Optional[str] = None

    def get_payment_date(self) -> date:
        return self.payment_date or self.date or date.today()


class PaymentResponse(BaseModel):
    id: uuid.UUID
    payment_number: str
    invoice_id: uuid.UUID
    amount: Decimal
    payment_method: str
    payment_date: date
    note: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
