import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field


class QuotationLineCreate(BaseModel):
    product_id: uuid.UUID
    variant_id: Optional[uuid.UUID] = None
    quantity: int = Field(default=1, ge=1)
    unit_price: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))  # Can be auto-populated from product if None
    tax_rate: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    discount_amount: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))


class QuotationLineResponse(BaseModel):
    id: uuid.UUID
    quotation_id: uuid.UUID
    product_id: uuid.UUID
    variant_id: Optional[uuid.UUID] = None
    quantity: int
    unit_price: Decimal
    tax_rate: Decimal
    discount_amount: Decimal
    total: Decimal

    model_config = {"from_attributes": True}


class QuotationCreate(BaseModel):
    customer_id: uuid.UUID
    plan_id: uuid.UUID
    valid_until: date
    payment_terms: str = "Immediate"
    notes: Optional[str] = None
    lines: List[QuotationLineCreate] = []


class QuotationUpdate(BaseModel):
    valid_until: Optional[date] = None
    payment_terms: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    lines: Optional[List[QuotationLineCreate]] = None


class QuotationConvertRequest(BaseModel):
    target_status: str = "CONFIRMED"  # CONFIRMED or ACTIVE
    start_date: Optional[date] = None


class QuotationResponse(BaseModel):
    id: uuid.UUID
    quotation_number: str
    customer_id: uuid.UUID
    plan_id: uuid.UUID
    status: str
    valid_until: date
    payment_terms: str
    subtotal: Decimal
    tax_total: Decimal
    discount_total: Decimal
    grand_total: Decimal
    notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    lines: List[QuotationLineResponse] = []

    model_config = {"from_attributes": True}
