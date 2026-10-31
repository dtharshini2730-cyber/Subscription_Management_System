import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint, func
from sqlalchemy.orm import relationship

from app.db.database import Base, GUID


class SubscriptionRenewalReminder(Base):
    __tablename__ = "subscription_renewal_reminders"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    subscription_id = Column(GUID, ForeignKey("subscriptions.id", ondelete="CASCADE"), nullable=False, index=True)
    renewal_date = Column(Date, nullable=False)
    reminder_days_before = Column(Integer, nullable=False)
    reminder_status = Column(String(30), nullable=False, default="PENDING")
    sent_at = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    subscription = relationship("Subscription", back_populates="renewal_reminders")

    __table_args__ = (
        UniqueConstraint(
            "subscription_id",
            "renewal_date",
            "reminder_days_before",
            name="uq_renewal_reminder_schedule",
        ),
    )


class SubscriptionRenewalHistory(Base):
    __tablename__ = "subscription_renewal_history"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    subscription_id = Column(GUID, ForeignKey("subscriptions.id", ondelete="CASCADE"), nullable=False, index=True)
    previous_expiry_date = Column(Date, nullable=False)
    renewed_to_date = Column(Date, nullable=False)
    renewal_amount = Column(Numeric(12, 2), nullable=False, default=0.00)
    reminder_count = Column(Integer, nullable=False, default=0)
    status = Column(String(30), nullable=False, default="RENEWED")
    notes = Column(Text, nullable=True)
    renewed_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    subscription = relationship("Subscription", back_populates="renewal_history")
