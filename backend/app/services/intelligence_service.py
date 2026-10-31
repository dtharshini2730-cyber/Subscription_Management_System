import re
from datetime import date, datetime
from decimal import Decimal
from typing import Any, Dict, List
from dateutil.relativedelta import relativedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models.customer import Customer
from app.models.invoice import Invoice
from app.models.payment import Payment
from app.models.subscription import Subscription
from app.schemas.intelligence import (
    AssistantQueryResponse,
    DiscountRecommendationItem,
    DiscountRecommendationResponse,
    HealthScoreItem,
    HealthScoreResponse,
    InvoiceAnomalyItem,
    InvoiceAnomalyResponse,
    RenewalRiskItem,
    RenewalRiskResponse,
)


def calculate_health_scores(db: Session) -> HealthScoreResponse:
    today = date.today()
    subs = db.query(Subscription).filter(Subscription.status.in_(["ACTIVE", "PAUSED", "CONFIRMED"])).all()

    items: List[HealthScoreItem] = []
    total_score = 0

    for sub in subs:
        score = 85
        factors = []

        # Check overdue invoices for customer
        overdue_invoices = (
            db.query(Invoice)
            .filter(
                Invoice.customer_id == sub.customer_id,
                Invoice.status == "CONFIRMED",
                Invoice.due_date < today,
            )
            .count()
        )
        if overdue_invoices > 0:
            score -= 30
            factors.append(f"{overdue_invoices} overdue invoice(s) pending payment")

        # Check if customer has paid invoices
        paid_count = (
            db.query(Invoice)
            .filter(
                Invoice.customer_id == sub.customer_id,
                Invoice.status == "PAID",
            )
            .count()
        )
        if paid_count > 0:
            score += 10
            factors.append(f"Prompt payment history ({paid_count} settled invoices)")

        # Status impact
        if sub.status == "PAUSED":
            score -= 25
            factors.append("Subscription currently paused")
        elif sub.status == "ACTIVE":
            score += 5
            factors.append("Active recurring billing cycle")

        # Clamp 0 - 100
        score = max(5, min(100, score))
        total_score += score

        if score >= 75:
            risk = "LOW"
        elif score >= 50:
            risk = "MEDIUM"
        else:
            risk = "HIGH"

        items.append(
            HealthScoreItem(
                subscription_id=sub.id,
                subscription_number=sub.subscription_number,
                customer_name=sub.customer.company_name if sub.customer else "Unknown",
                health_score=score,
                status=sub.status,
                risk_level=risk,
                factors=factors,
            )
        )

    avg = round(total_score / len(items), 1) if items else 100.0
    return HealthScoreResponse(items=items, average_score=avg)


def detect_renewal_risks(db: Session) -> RenewalRiskResponse:
    today = date.today()
    threshold_date = today + relativedelta(days=45)

    expiring_subs = (
        db.query(Subscription)
        .filter(
            Subscription.status.in_(["ACTIVE", "PAUSED"]),
            Subscription.expiry_date >= today,
            Subscription.expiry_date <= threshold_date,
        )
        .all()
    )

    items: List[RenewalRiskItem] = []
    total_at_risk = Decimal("0.00")
    high_risk_count = 0

    for sub in expiring_subs:
        days = (sub.expiry_date - today).days

        # Check late payments
        has_overdue = (
            db.query(Invoice)
            .filter(
                Invoice.customer_id == sub.customer_id,
                Invoice.status == "CONFIRMED",
                Invoice.due_date < today,
            )
            .first()
            is not None
        )

        if sub.status == "PAUSED" or has_overdue:
            risk = "HIGH"
            high_risk_count += 1
            action = "Urgent: Assign senior account executive & offer renewal grace incentive"
        elif days <= 14:
            risk = "MEDIUM"
            action = "Dispatch 14-day renewal notice with fast-track confirmation link"
        else:
            risk = "LOW"
            action = "Standard automated renewal notification schedule"

        if risk in ["HIGH", "MEDIUM"]:
            total_at_risk += sub.grand_total

        items.append(
            RenewalRiskItem(
                subscription_id=sub.id,
                subscription_number=sub.subscription_number,
                customer_name=sub.customer.company_name if sub.customer else "Unknown",
                expiry_date=sub.expiry_date,
                days_to_expiry=days,
                renewal_risk=risk,
                estimated_revenue_at_risk=sub.grand_total,
                recommended_action=action,
            )
        )

    return RenewalRiskResponse(
        high_risk_count=high_risk_count,
        total_at_risk_revenue=total_at_risk,
        items=items,
    )


def detect_invoice_anomalies(db: Session) -> InvoiceAnomalyResponse:
    # Detect invoices that diverge significantly (>1.8x) from customer historical average
    customers = db.query(Customer).all()
    anomalies: List[InvoiceAnomalyItem] = []

    for cust in customers:
        invoices = (
            db.query(Invoice)
            .filter(Invoice.customer_id == cust.id, Invoice.status != "CANCELLED")
            .all()
        )
        if len(invoices) < 2:
            continue

        amounts = [inv.total_amount for inv in invoices]
        avg = sum(amounts) / Decimal(len(amounts))
        if avg <= 0:
            continue

        for inv in invoices:
            ratio = float(inv.total_amount / avg)
            if ratio >= 1.8:
                deviation = round((ratio - 1.0) * 100, 1)
                anomalies.append(
                    InvoiceAnomalyItem(
                        invoice_id=inv.id,
                        invoice_number=inv.invoice_number,
                        customer_name=cust.company_name,
                        total_amount=inv.total_amount,
                        historical_average=round(avg, 2),
                        deviation_percent=deviation,
                        reason=f"Invoice total is {deviation}% above customer historical average",
                    )
                )

    return InvoiceAnomalyResponse(
        anomalies_detected=len(anomalies),
        items=anomalies,
    )


def get_discount_recommendations(db: Session) -> DiscountRecommendationResponse:
    # Find customers with high spend or at-risk renewals to recommend loyalty or retention discounts
    today = date.today()
    recs: List[DiscountRecommendationItem] = []

    subs = db.query(Subscription).filter(Subscription.status == "ACTIVE").all()
    for sub in subs:
        if sub.grand_total >= Decimal("500.00"):
            recs.append(
                DiscountRecommendationItem(
                    customer_id=sub.customer_id,
                    customer_name=sub.customer.company_name if sub.customer else "Unknown",
                    current_mrr=sub.grand_total,
                    suggested_discount_code="ENTERPRISE_LOYALTY_15",
                    discount_percentage=Decimal("15.00"),
                    reason="High-value client tier: Proactively lock in multi-year contract",
                )
            )
        elif (sub.expiry_date - today).days <= 30:
            recs.append(
                DiscountRecommendationItem(
                    customer_id=sub.customer_id,
                    customer_name=sub.customer.company_name if sub.customer else "Unknown",
                    current_mrr=sub.grand_total,
                    suggested_discount_code="EARLY_RENEWAL_10",
                    discount_percentage=Decimal("10.00"),
                    reason="Upcoming renewal window: Offer incentive for immediate confirmation",
                )
            )

    return DiscountRecommendationResponse(recommendations=recs[:10])


def process_finance_query(db: Session, query: str) -> AssistantQueryResponse:
    q = query.lower().strip()
    today = date.today()

    if any(k in q for k in ["mrr", "monthly recurring"]):
        # Calculate MRR
        subs = db.query(Subscription).filter(Subscription.status == "ACTIVE").all()
        mrr = Decimal("0.00")
        for s in subs:
            freq = s.plan.billing_frequency.upper()
            if freq == "MONTHLY":
                mrr += s.grand_total
            elif freq == "YEARLY":
                mrr += s.grand_total / Decimal("12")
            elif freq == "WEEKLY":
                mrr += s.grand_total * Decimal("4.33")
            elif freq == "DAILY":
                mrr += s.grand_total * Decimal("30")
        mrr_val = round(mrr, 2)
        return AssistantQueryResponse(
            query=query,
            intent="CALCULATE_MRR",
            answer=f"The current Monthly Recurring Revenue (MRR) is ${mrr_val:,} across {len(subs)} active subscriptions.",
            data={"mrr": float(mrr_val), "active_subscriptions": len(subs)},
        )

    if any(k in q for k in ["overdue", "unpaid", "late"]):
        overdue_invoices = (
            db.query(Invoice)
            .filter(Invoice.status == "CONFIRMED", Invoice.due_date < today)
            .all()
        )
        total_overdue = sum((inv.total_amount - inv.paid_amount) for inv in overdue_invoices)
        return AssistantQueryResponse(
            query=query,
            intent="OVERDUE_METRICS",
            answer=f"There are {len(overdue_invoices)} overdue invoices totaling ${total_overdue:,.2f} in outstanding balance.",
            data={"count": len(overdue_invoices), "total_amount": float(total_overdue)},
        )

    if any(k in q for k in ["revenue", "total collected", "payments"]):
        total_rev = db.query(func.coalesce(func.sum(Payment.amount), 0)).scalar()
        return AssistantQueryResponse(
            query=query,
            intent="TOTAL_REVENUE",
            answer=f"Total recorded revenue across all settled payments is ${Decimal(total_rev):,.2f}.",
            data={"total_revenue": float(total_rev)},
        )

    if any(k in q for k in ["customer", "clients", "how many"]):
        total_cust = db.query(Customer).filter(Customer.is_active == True).count()
        return AssistantQueryResponse(
            query=query,
            intent="CUSTOMER_COUNT",
            answer=f"Brightloop currently manages {total_cust} active corporate customers in the platform.",
            data={"customer_count": total_cust},
        )

    # General executive summary fallback
    active_count = db.query(Subscription).filter(Subscription.status == "ACTIVE").count()
    return AssistantQueryResponse(
        query=query,
        intent="GENERAL_STATUS",
        answer=f"Platform status: {active_count} active subscriptions operating smoothly under automated billing management.",
        data={"active_subscriptions": active_count},
    )
