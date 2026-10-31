import uuid
from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field


class ProductVariantBase(BaseModel):
    name: str
    additional_price: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    sku: str


class ProductVariantCreate(ProductVariantBase):
    pass


class ProductVariantUpdate(BaseModel):
    name: Optional[str] = None
    additional_price: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    sku: Optional[str] = None
    is_active: Optional[bool] = None


class ProductVariantResponse(ProductVariantBase):
    id: uuid.UUID
    product_id: uuid.UUID
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class ProductBase(BaseModel):
    name: str
    type: str = "SOFTWARE"  # SERVICE, SOFTWARE, CONSUMABLE
    sales_price: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    cost_price: Decimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    notes: Optional[str] = None


class ProductCreate(ProductBase):
    variants: Optional[List[ProductVariantCreate]] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    sales_price: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    cost_price: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    notes: Optional[str] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    variants: List[ProductVariantResponse] = []

    model_config = {"from_attributes": True}
