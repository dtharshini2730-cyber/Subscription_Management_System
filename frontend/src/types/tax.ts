export type TaxCalculationType = 'EXCLUSIVE' | 'INCLUSIVE';

export interface TaxRule {
  id: string;
  name: string; // e.g. "Standard VAT", "State Sales Tax", "GST"
  code: string; // e.g. "VAT-20", "GST-18"
  ratePercent: number; // e.g. 20.0, 18.0, 8.25
  country: string;
  region?: string;
  calculationType: TaxCalculationType;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}
