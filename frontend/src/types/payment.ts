export type PaymentMethod = 'BANK_TRANSFER' | 'CREDIT_CARD' | 'ACH' | 'CHECK' | 'CASH';
export type PaymentStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  paymentNumber: string; // e.g. "PAY-2026-0312"
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string; // YYYY-MM-DD
  status: PaymentStatus;
  referenceNumber?: string;
  note?: string;
  recordedByUserName: string;
  createdAt: string;
}
