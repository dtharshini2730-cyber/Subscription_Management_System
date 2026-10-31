import uuid
from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import relationship
from app.db.database import Base, GUID


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    subscription_number = Column(String(100), unique=True, nullable=False, index=True)
    customer_id = Column(GUID, ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    plan_id = Column(GUID, ForeignKey("plans.id", ondelete="RESTRICT"), nullable=False)
    quotation_id = Column(GUID, ForeignKey("quotations.id", ondelete="SET NULL"), nullable=True)
    status = Column(
        String(50),
        nullable=False,
        default="DRAFT",
    )  # DRAFT, QUOTATION, CONFIRMED, ACTIVE, PAUSED, CLOSED
    start_date = Column(Date, nullable=False)
    expiry_date = Column(Date, nullable=False)
    next_billing_date = Column(Date, nullable=True)
    payment_terms = Column(String(100), nullable=False, default="Immediate")
    subtotal = Column(Numeric(12, 2), nullable=False, default=0.00)
    tax_total = Column(Numeric(12, 2), nullable=False, default=0.00)
    discount_total = Column(Numeric(12, 2), nullable=False, default=0.00)
    grand_total = Column(Numeric(12, 2), nullable=False, default=0.00)
    pause_reason = Column(String(255), nullable=True)
    auto_close = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    customer = relationship("Customer", back_populates="subscriptions")
    plan = relationship("Plan", back_populates="subscriptions")
    quotation = relationship("Quotation")
    lines = relationship("SubscriptionLine", back_populates="subscription", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="subscription")


class SubscriptionLine(Base):
    __tablename__ = "subscription_lines"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    subscription_id = Column(GUID, ForeignKey("subscriptions.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(GUID, ForeignKey("products.id", ondelete="RESTRICT"), nullable=False)
    variant_id = Column(GUID, ForeignKey("product_variants.id", ondelete="SET NULL"), nullable=True)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Numeric(12, 2), nullable=False, default=0.00)
    tax_rate = Column(Numeric(5, 2), nullable=False, default=0.00)
    discount_amount = Column(Numeric(12, 2), nullable=False, default=0.00)
    total = Column(Numeric(12, 2), nullable=False, default=0.00)

    # Relationships
    subscription = relationship("Subscription", back_populates="lines")
    product = relationship("Product")
    variant = relationship("ProductVariant")
