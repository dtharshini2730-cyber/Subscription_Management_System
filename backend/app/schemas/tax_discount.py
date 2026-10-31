import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, Field


class TaxBase(BaseModel):
    name: str
    rate_percent: Decimal = Field(ge=Decimal("0.00"), le=Decimal("100.00"))
    is_compound: bool = False
    region_code: Optional[str] = None


class TaxCreate(TaxBase):
    pass


class TaxUpdate(BaseModel):
    name: Optional[str] = None
    rate_percent: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"), le=Decimal("100.00"))
    is_compound: Optional[bool] = None
    region_code: Optional[str] = None
    is_active: Optional[bool] = None


class TaxResponse(TaxBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class DiscountBase(BaseModel):
    code: str
    description: Optional[str] = None
    type: str = "PERCENTAGE"  # FIXED, PERCENTAGE
    value: Decimal = Field(gt=Decimal("0.00"))
    min_amount: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    min_quantity: int = Field(default=0, ge=0)
    valid_from: date
    valid_to: Optional[date] = None
    max_uses: Optional[int] = Field(default=None, ge=1)
    applies_to: str = "SUBSCRIPTION"  # SUBSCRIPTION, PRODUCT
    product_id: Optional[uuid.UUID] = None


class DiscountCreate(DiscountBase):
    pass


class DiscountUpdate(BaseModel):
    description: Optional[str] = None
    type: Optional[str] = None
    value: Optional[Decimal] = Field(default=None, gt=Decimal("0.00"))
    min_amount: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    min_quantity: Optional[int] = Field(default=None, ge=0)
    valid_from: Optional[date] = None
    valid_to: Optional[date] = None
    max_uses: Optional[int] = Field(default=None, ge=1)
    applies_to: Optional[str] = None
    product_id: Optional[uuid.UUID] = None
    is_active: Optional[bool] = None


class DiscountResponse(DiscountBase):
    id: uuid.UUID
    current_uses: int
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
