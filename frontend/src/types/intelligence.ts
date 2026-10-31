export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RenewalRiskAlert {
  id: string;
  subscriptionId: string;
  subscriptionNumber: string;
  customerName: string;
  customerEmail: string;
  expiryDate: string;
  daysUntilExpiry: number;
  contractValue: number;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  primaryRiskFactor: string; // e.g. "Low login engagement", "Overdue previous invoice"
  recommendedAction: string;
}

export interface SubscriptionHealthMetric {
  id: string;
  customerId: string;
  customerName: string;
  activeSubscriptionsCount: number;
  healthScore: number; // 0-100
  mrr: number;
  paymentReliability: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'AT_RISK';
  usageTrend: 'INCREASING' | 'STABLE' | 'DECREASING';
  lastActivityDate: string;
}

export interface InvoiceAnomaly {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  anomalyType: 'PRICE_SPIKE' | 'UNEXPECTED_DISCOUNT' | 'POSSIBLE_DUPLICATE' | 'IRREGULAR_TAX';
  severity: 'WARNING' | 'CRITICAL';
  description: string;
  variancePercentage?: number;
  detectedAt: string;
  isResolved: boolean;
}

export interface SmartDiscountRecommendation {
  id: string;
  customerId: string;
  customerName: string;
  suggestedDiscountCode: string;
  suggestedPercent: number;
  targetProduct: string;
  rationale: string;
  projectedRetentionBoostPercent: number;
  marginImpact: 'NEGLIGIBLE' | 'LOW' | 'ACCEPTABLE';
}

export interface FinanceAssistantQuery {
  id: string;
  query: string;
  response: string;
  relevantMetrics?: {
    label: string;
    value: string | number;
    change?: string;
  }[];
  timestamp: string;
}
