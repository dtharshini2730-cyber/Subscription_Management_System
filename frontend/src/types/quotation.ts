export type QuotationStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'EXPIRED' | 'CONVERTED';

export interface QuotationLine {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  discountPercent?: number;
  discountAmount?: number;
  taxRatePercent: number;
  taxAmount: number;
  lineTotal: number;
}

export interface QuotationTemplate {
  id: string;
  name: string;
  description: string;
  defaultPlanId: string;
  defaultValidityDays: number;
  lines: Omit<QuotationLine, 'id' | 'taxAmount' | 'lineTotal'>[];
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g. "QT-2026-0042"
  customerId: string;
  customerName: string;
  customerEmail: string;
  planId: string;
  planName: string;
  status: QuotationStatus;
  issueDate: string;
  validUntil: string;
  paymentTerms: string;
  lines: QuotationLine[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  convertedSubscriptionId?: string;
  notes?: string;
  createdAt: string;
}
