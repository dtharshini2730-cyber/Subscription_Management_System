export type SubscriptionStatus = 'DRAFT' | 'QUOTATION' | 'CONFIRMED' | 'ACTIVE' | 'CLOSED';

export interface SubscriptionLine {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  taxRatePercent: number;
  taxAmount: number;
  discountAmount: number;
  lineTotal: number;
}

export interface Subscription {
  id: string;
  subscriptionNumber: string; // e.g. "SUB-2026-0108"
  customerId: string;
  customerName: string;
  customerEmail: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;  // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  nextBillingDate: string;
  paymentTerms: string; // e.g. "Net 15", "Net 30", "Immediate"
  isPaused?: boolean;
  pausedAt?: string;
  lines: SubscriptionLine[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
