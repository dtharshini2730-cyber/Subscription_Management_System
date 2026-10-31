import uuid
from datetime import date
from decimal import Decimal
from typing import Any, Dict, List, Optional
from pydantic import BaseModel


class HealthScoreItem(BaseModel):
    subscription_id: uuid.UUID
    subscription_number: str
    customer_name: str
    health_score: int  # 0 to 100
    status: str
    risk_level: str  # LOW, MEDIUM, HIGH
    factors: List[str]


class HealthScoreResponse(BaseModel):
    items: List[HealthScoreItem]
    average_score: float


class RenewalRiskItem(BaseModel):
    subscription_id: uuid.UUID
    subscription_number: str
    customer_name: str
    expiry_date: date
    days_to_expiry: int
    renewal_risk: str  # HIGH, MEDIUM, LOW
    estimated_revenue_at_risk: Decimal
    recommended_action: str


class RenewalRiskResponse(BaseModel):
    high_risk_count: int
    total_at_risk_revenue: Decimal
    items: List[RenewalRiskItem]


class InvoiceAnomalyItem(BaseModel):
    invoice_id: uuid.UUID
    invoice_number: str
    customer_name: str
    total_amount: Decimal
    historical_average: Decimal
    deviation_percent: float
    reason: str


class InvoiceAnomalyResponse(BaseModel):
    anomalies_detected: int
    items: List[InvoiceAnomalyItem]


class DiscountRecommendationItem(BaseModel):
    customer_id: uuid.UUID
    customer_name: str
    current_mrr: Decimal
    suggested_discount_code: str
    discount_percentage: Decimal
    reason: str


class DiscountRecommendationResponse(BaseModel):
    recommendations: List[DiscountRecommendationItem]


class AssistantQueryRequest(BaseModel):
    query: str


class AssistantQueryResponse(BaseModel):
    query: str
    intent: str
    answer: str
    data: Optional[Dict[str, Any]] = None
