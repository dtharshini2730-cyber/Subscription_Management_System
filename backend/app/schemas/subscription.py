import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field


class SubscriptionLineCreate(BaseModel):
    product_id: uuid.UUID
    variant_id: Optional[uuid.UUID] = None
    quantity: int = Field(default=1, ge=1)
    unit_price: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    tax_rate: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    discount_amount: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))


class SubscriptionLineResponse(BaseModel):
    id: uuid.UUID
    subscription_id: uuid.UUID
    product_id: uuid.UUID
    variant_id: Optional[uuid.UUID] = None
    quantity: int
    unit_price: Decimal
    tax_rate: Decimal
    discount_amount: Decimal
    total: Decimal

    model_config = {"from_attributes": True}


class SubscriptionCreate(BaseModel):
    customer_id: uuid.UUID
    plan_id: uuid.UUID
    quotation_id: Optional[uuid.UUID] = None
    status: Optional[str] = "DRAFT"  # DRAFT, QUOTATION, CONFIRMED, ACTIVE
    start_date: date
    expiry_date: date
    payment_terms: str = "Immediate"
    auto_close: bool = False
    lines: List[SubscriptionLineCreate] = []


class SubscriptionUpdate(BaseModel):
    plan_id: Optional[uuid.UUID] = None
    start_date: Optional[date] = None
    expiry_date: Optional[date] = None
    payment_terms: Optional[str] = None
    auto_close: Optional[bool] = None
    lines: Optional[List[SubscriptionLineCreate]] = None


class SubscriptionStatusUpdate(BaseModel):
    status: str
    reason: Optional[str] = None


class SubscriptionPauseRequest(BaseModel):
    reason: Optional[str] = "Paused by user"


class SubscriptionRenewRequest(BaseModel):
    new_expiry_date: Optional[date] = None  # If None, automatically extended by 1 plan cycle duration


class SubscriptionResponse(BaseModel):
    id: uuid.UUID
    subscription_number: str
    customer_id: uuid.UUID
    plan_id: uuid.UUID
    quotation_id: Optional[uuid.UUID] = None
    status: str
    start_date: date
    expiry_date: date
    next_billing_date: Optional[date] = None
    payment_terms: str
    subtotal: Decimal
    tax_total: Decimal
    discount_total: Decimal
    grand_total: Decimal
    pause_reason: Optional[str] = None
    auto_close: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    lines: List[SubscriptionLineResponse] = []

    model_config = {"from_attributes": True}
