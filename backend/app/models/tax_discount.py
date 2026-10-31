import uuid
from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import relationship
from app.db.database import Base, GUID


class Tax(Base):
    __tablename__ = "taxes"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    rate_percent = Column(Numeric(5, 2), nullable=False)  # e.g., 18.00 for 18%
    is_compound = Column(Boolean, default=False, nullable=False)
    region_code = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Discount(Base):
    __tablename__ = "discounts"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    code = Column(String(50), unique=True, nullable=False, index=True)
    description = Column(String(255), nullable=True)
    type = Column(String(20), nullable=False)  # FIXED, PERCENTAGE
    value = Column(Numeric(12, 2), nullable=False)  # $ amount or %
    min_amount = Column(Numeric(12, 2), default=0.00, nullable=False)
    min_quantity = Column(Integer, default=0, nullable=False)
    valid_from = Column(Date, nullable=False)
    valid_to = Column(Date, nullable=True)
    max_uses = Column(Integer, nullable=True)
    current_uses = Column(Integer, default=0, nullable=False)
    applies_to = Column(String(50), default="SUBSCRIPTION", nullable=False)  # SUBSCRIPTION, PRODUCT
    product_id = Column(GUID, ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationship
    product = relationship("Product")
