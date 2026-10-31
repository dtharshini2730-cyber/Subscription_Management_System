import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field


class InvoiceLineCreate(BaseModel):
    product_id: uuid.UUID
    variant_id: Optional[uuid.UUID] = None
    description: Optional[str] = None
    quantity: int = Field(default=1, ge=1)
    unit_price: Decimal = Field(ge=Decimal("0.00"))
    tax_rate: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    discount_amount: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))


class InvoiceLineResponse(BaseModel):
    id: uuid.UUID
    invoice_id: uuid.UUID
    product_id: uuid.UUID
    variant_id: Optional[uuid.UUID] = None
    description: Optional[str] = None
    quantity: int
    unit_price: Decimal
    tax_rate: Decimal
    discount_amount: Decimal
    amount: Decimal

    model_config = {"from_attributes": True}


class InvoiceCreate(BaseModel):
    customer_id: uuid.UUID
    subscription_id: Optional[uuid.UUID] = None
    issue_date: date
    due_date: date
    period_start: date
    period_end: date
    notes: Optional[str] = None
    lines: List[InvoiceLineCreate] = []


class BillingRunRequest(BaseModel):
    as_of_date: Optional[date] = None


class BillingRunResponse(BaseModel):
    invoices_generated: int
    total_amount: Decimal
    invoice_ids: List[uuid.UUID]
    skipped_existing: int


class InvoiceResponse(BaseModel):
    id: uuid.UUID
    invoice_number: str
    subscription_id: Optional[uuid.UUID] = None
    customer_id: uuid.UUID
    status: str
    issue_date: date
    due_date: date
    period_start: date
    period_end: date
    subtotal: Decimal
    tax_amount: Decimal
    discount_amount: Decimal
    total_amount: Decimal
    paid_amount: Decimal
    outstanding_amount: Optional[Decimal] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    lines: List[InvoiceLineResponse] = []

    model_config = {"from_attributes": True}
