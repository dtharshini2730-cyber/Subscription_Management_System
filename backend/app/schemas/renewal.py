import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field, ConfigDict


class RenewalReminderCreate(BaseModel):
    reminder_days_before: int = Field(..., ge=1, le=30)


class RenewalReminderResponse(BaseModel):
    id: uuid.UUID
    subscription_id: uuid.UUID
    renewal_date: date
    reminder_days_before: int
    reminder_status: str
    sent_at: Optional[datetime] = None
    notes: Optional[str] = None
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RenewalHistoryResponse(BaseModel):
    id: uuid.UUID
    subscription_id: uuid.UUID
    previous_expiry_date: date
    renewed_to_date: date
    renewal_amount: Decimal
    reminder_count: int
    status: str
    notes: Optional[str] = None
    renewed_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RenewalSummaryResponse(BaseModel):
    subscription_id: uuid.UUID
    subscription_number: str
    customer_name: str
    status: str
    current_expiry_date: date
    next_renewal_date: date
    reminder_schedule: List[int]
    next_reminder_in_days: Optional[int]
    reminder_count: int
    last_renewal_at: Optional[datetime] = None
    renewal_ready: bool


class RenewalRenewRequest(BaseModel):
    new_expiry_date: Optional[date] = None
    renewal_amount: Optional[Decimal] = Field(default=None, ge=Decimal("0.00"))
    notes: Optional[str] = None
