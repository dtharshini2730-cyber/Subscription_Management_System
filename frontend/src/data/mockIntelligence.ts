import {
  RenewalRiskAlert,
  SubscriptionHealthMetric,
  InvoiceAnomaly,
  SmartDiscountRecommendation,
  FinanceAssistantQuery,
} from '@/types';

export const mockRenewalRisks: RenewalRiskAlert[] = [
  {
    id: 'risk-01',
    subscriptionId: 'sub-03',
    subscriptionNumber: 'SUB-2026-0103',
    customerName: 'FinFlow Technologies Ltd',
    customerEmail: 'm.sterling@finflow.co.uk',
    expiryDate: '2026-12-31',
    daysUntilExpiry: 61,
    contractValue: 31020.0,
    riskScore: 32,
    riskLevel: 'LOW',
    primaryRiskFactor: 'High contract size approaching Q4 review cycle',
    recommendedAction: 'Schedule annual executive business review with Marcus Sterling.',
  },
  {
    id: 'risk-02',
    subscriptionId: 'sub-01',
    subscriptionNumber: 'SUB-2026-0101',
    customerName: 'Apex Logistics Inc.',
    customerEmail: 'david.chen@apexlogistics.com',
    expiryDate: '2027-02-28',
    daysUntilExpiry: 120,
    contractValue: 22862.4,
    riskScore: 78,
    riskLevel: 'HIGH',
    primaryRiskFactor: 'Unpaid October invoice outstanding for 15+ days',
    recommendedAction: 'Trigger courtesy billing follow-up before service pause.',
  },
];

export const mockHealthMetrics: SubscriptionHealthMetric[] = [
  {
    id: 'health-01',
    customerId: 'cust-03',
    customerName: 'FinFlow Technologies Ltd',
    activeSubscriptionsCount: 3,
    healthScore: 94,
    mrr: 2585.0,
    paymentReliability: 'EXCELLENT',
    usageTrend: 'INCREASING',
    lastActivityDate: '2026-10-30',
  },
  {
    id: 'health-02',
    customerId: 'cust-01',
    customerName: 'Apex Logistics Inc.',
    activeSubscriptionsCount: 2,
    healthScore: 68,
    mrr: 1905.2,
    paymentReliability: 'FAIR',
    usageTrend: 'STABLE',
    lastActivityDate: '2026-10-22',
  },
];

export const mockInvoiceAnomalies: InvoiceAnomaly[] = [
  {
    id: 'anom-01',
    invoiceId: 'inv-02',
    invoiceNumber: 'INV-2026-0842',
    customerName: 'Apex Logistics Inc.',
    anomalyType: 'PRICE_SPIKE',
    severity: 'WARNING',
    description: 'Invoice amount represents an 80% jump due to Odoo variant activation.',
    variancePercentage: 80.0,
    detectedAt: '2026-10-01T08:05:00Z',
    isResolved: false,
  },
];

export const mockDiscountRecommendations: SmartDiscountRecommendation[] = [
  {
    id: 'rec-01',
    customerId: 'cust-01',
    customerName: 'Apex Logistics Inc.',
    suggestedDiscountCode: 'BULKSEATS15',
    suggestedPercent: 10,
    targetProduct: 'Brightloop Enterprise ERP',
    rationale: 'Customer added 4 additional seats last month. A 10% volume discount locks in a 12-month extension with 0% margin risk.',
    projectedRetentionBoostPercent: 24,
    marginImpact: 'LOW',
  },
];

export const mockAssistantQueries: FinanceAssistantQuery[] = [
  {
    id: 'qa-01',
    query: 'What is our current Monthly Recurring Revenue (MRR)?',
    response: 'As of October 2026, total recognized MRR is $4,490.20 across 3 active corporate subscriptions, showing a +18.4% month-over-month expansion.',
    relevantMetrics: [
      { label: 'Active MRR', value: '$4,490.20', change: '+18.4%' },
      { label: 'Active Accounts', value: '3', change: '+1' },
      { label: 'Collection Rate', value: '88.2%', change: '+3.1%' },
    ],
    timestamp: '2026-10-31T11:00:00Z',
  },
];
