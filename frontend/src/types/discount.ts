export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type DiscountScope = 'SUBSCRIPTION' | 'PRODUCT';

export interface DiscountRule {
  id: string;
  code: string; // e.g. "SUMMER20", "ENTERPRISE-BULK"
  name: string;
  type: DiscountType;
  value: number; // percentage (e.g. 15 for 15%) or fixed dollar value (e.g. 100)
  scope: DiscountScope;
  applicableProductIds?: string[]; // If scope is 'PRODUCT'
  minPurchaseAmount?: number;
  minQuantity?: number;
  validFrom: string; // YYYY-MM-DD
  validTo?: string;   // YYYY-MM-DD
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
  createdAt: string;
}
