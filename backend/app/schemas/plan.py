import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, Field


class PlanBase(BaseModel):
    name: str
    description: Optional[str] = None
    billing_frequency: str = "MONTHLY"  # DAILY, WEEKLY, MONTHLY, YEARLY
    price: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    min_quantity: int = Field(default=1, ge=1)
    available_from: date
    available_to: Optional[date] = None
    can_auto_close: bool = False
    can_pause: bool = True
    can_renew_early: bool = True


class PlanCreate(PlanBase):
    pass


class PlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    billing_frequency: Optional[str] = None
    price: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    min_quantity: Optional[int] = Field(default=None, ge=1)
    available_from: Optional[date] = None
    available_to: Optional[date] = None
    can_auto_close: Optional[bool] = None
    can_pause: Optional[bool] = None
    can_renew_early: Optional[bool] = None
    is_active: Optional[bool] = None


class PlanResponse(PlanBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
