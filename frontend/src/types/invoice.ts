export type InvoiceStatus = 'DRAFT' | 'CONFIRMED' | 'PAID' | 'CANCELLED';

export interface InvoiceLine {
  id: string;
  productId: string;
  productName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  taxRatePercent: number;
  taxAmount: number;
  discountAmount: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "INV-2026-0891"
  subscriptionId?: string; // Optional (may be one-off or subscription-generated)
  subscriptionNumber?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  status: InvoiceStatus;
  issueDate: string; // YYYY-MM-DD
  dueDate: string;   // YYYY-MM-DD
  periodStart: string;
  periodEnd: string;
  lines: InvoiceLine[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentMethod?: string;
  confirmedAt?: string;
  paidAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  notes?: string;
  createdAt: string;
}
