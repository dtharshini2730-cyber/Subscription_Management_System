from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel


class ActivityItem(BaseModel):
    id: str
    type: str  # SUBSCRIPTION, INVOICE, PAYMENT
    title: str
    description: str
    timestamp: datetime
    amount: Optional[Decimal] = None
    status: Optional[str] = None


class DashboardOverviewResponse(BaseModel):
    active_subscriptions: int
    total_revenue: Decimal
    outstanding_amount: Decimal
    overdue_invoices_count: int
    overdue_invoices_amount: Decimal
    mrr: Decimal
    arr: Decimal
    paid_invoices_count: int
    draft_invoices_count: int
    total_customers: int
    recent_activity: List[ActivityItem] = []
