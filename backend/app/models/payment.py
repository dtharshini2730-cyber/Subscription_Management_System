import uuid
from sqlalchemy import Column, Date, DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy.orm import relationship
from app.db.database import Base, GUID


class Payment(Base):
    __tablename__ = "payments"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    payment_number = Column(String(100), unique=True, nullable=False, index=True)
    invoice_id = Column(GUID, ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Numeric(12, 2), nullable=False)
    payment_method = Column(
        String(50),
        nullable=False,
    )  # CREDIT_CARD, BANK_TRANSFER, ACH, CHECK, CASH
    payment_date = Column(Date, nullable=False)
    note = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    invoice = relationship("Invoice", back_populates="payments")
