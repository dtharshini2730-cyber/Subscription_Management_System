import { Quotation, QuotationTemplate } from '@/types';

export const mockQuotationTemplates: QuotationTemplate[] = [
  {
    id: 'tpl-enterprise-suite',
    name: 'Enterprise Multi-Seat Software Bundle',
    description: 'Preconfigured ERP core with Odoo connector and 24/7 priority support.',
    defaultPlanId: 'plan-annual-corp',
    defaultValidityDays: 30,
    lines: [
      {
        productId: 'prod-01',
        productName: 'Brightloop Enterprise ERP',
        variantId: 'var-01-odoo',
        variantName: 'Odoo Ecosystem Connector',
        quantity: 10,
        unitPrice: 1760.0,
        taxRatePercent: 8.25,
        discountAmount: 0,
      },
      {
        productId: 'prod-03',
        productName: '24/7 Priority SLA Support',
        quantity: 1,
        unitPrice: 490.0,
        taxRatePercent: 8.25,
        discountAmount: 0,
      },
    ],
  },
];

export const mockQuotations: Quotation[] = [
  {
    id: 'quote-01',
    quotationNumber: 'QT-2026-0088',
    customerId: 'cust-02',
    customerName: 'Lumina Creative Studio',
    customerEmail: 'elena@luminastudio.design',
    planId: 'plan-monthly-pro',
    planName: 'Growth Monthly Plan',
    status: 'CONVERTED',
    issueDate: '2026-10-20',
    validUntil: '2026-11-20',
    paymentTerms: 'Immediate',
    convertedSubscriptionId: 'sub-02',
    lines: [
      {
        id: 'qline-01',
        productId: 'prod-01',
        productName: 'Brightloop Enterprise ERP',
        variantId: 'var-01-std',
        variantName: 'Standard Edition',
        quantity: 5,
        unitPrice: 1200.0,
        taxRatePercent: 8.25,
        taxAmount: 495.0,
        discountAmount: 0,
        lineTotal: 6495.0,
      },
    ],
    subtotal: 6000.0,
    taxTotal: 495.0,
    discountTotal: 0,
    grandTotal: 6495.0,
    notes: 'Approved offer successfully converted into Subscription SUB-2026-0102.',
    createdAt: '2026-10-20T10:00:00Z',
  },
];
