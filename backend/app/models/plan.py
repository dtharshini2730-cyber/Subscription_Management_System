import uuid
from sqlalchemy import Boolean, Column, Date, DateTime, Integer, Numeric, String, Text, func
from sqlalchemy.orm import relationship
from app.db.database import Base, GUID


class Plan(Base):
    __tablename__ = "plans"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    billing_frequency = Column(String(50), nullable=False, default="MONTHLY")  # DAILY, WEEKLY, MONTHLY, YEARLY
    price = Column(Numeric(12, 2), nullable=False, default=0.00)
    min_quantity = Column(Integer, nullable=False, default=1)
    available_from = Column(Date, nullable=False)
    available_to = Column(Date, nullable=True)
    can_auto_close = Column(Boolean, default=False, nullable=False)
    can_pause = Column(Boolean, default=True, nullable=False)
    can_renew_early = Column(Boolean, default=True, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    subscriptions = relationship("Subscription", back_populates="plan")
    quotations = relationship("Quotation", back_populates="plan")
