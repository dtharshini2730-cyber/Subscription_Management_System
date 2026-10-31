import uuid
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import relationship
from app.db.database import Base, GUID


class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    quotation_number = Column(String(100), unique=True, nullable=False, index=True)
    customer_id = Column(GUID, ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    plan_id = Column(GUID, ForeignKey("plans.id", ondelete="RESTRICT"), nullable=False)
    status = Column(String(50), nullable=False, default="DRAFT")  # DRAFT, SENT, ACCEPTED, REJECTED, EXPIRED
    valid_until = Column(Date, nullable=False)
    payment_terms = Column(String(100), nullable=False, default="Immediate")
    subtotal = Column(Numeric(12, 2), nullable=False, default=0.00)
    tax_total = Column(Numeric(12, 2), nullable=False, default=0.00)
    discount_total = Column(Numeric(12, 2), nullable=False, default=0.00)
    grand_total = Column(Numeric(12, 2), nullable=False, default=0.00)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    customer = relationship("Customer", back_populates="quotations")
    plan = relationship("Plan", back_populates="quotations")
    lines = relationship("QuotationLine", back_populates="quotation", cascade="all, delete-orphan")


class QuotationLine(Base):
    __tablename__ = "quotation_lines"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    quotation_id = Column(GUID, ForeignKey("quotations.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(GUID, ForeignKey("products.id", ondelete="RESTRICT"), nullable=False)
    variant_id = Column(GUID, ForeignKey("product_variants.id", ondelete="SET NULL"), nullable=True)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Numeric(12, 2), nullable=False, default=0.00)
    tax_rate = Column(Numeric(5, 2), nullable=False, default=0.00)
    discount_amount = Column(Numeric(12, 2), nullable=False, default=0.00)
    total = Column(Numeric(12, 2), nullable=False, default=0.00)

    # Relationships
    quotation = relationship("Quotation", back_populates="lines")
    product = relationship("Product")
    variant = relationship("ProductVariant")
