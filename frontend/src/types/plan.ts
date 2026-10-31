export type BillingFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface PlanPolicy {
  canAutoClose: boolean;  // Automatically closes when end date reached
  canCloseEarly: boolean; // Rep or customer can terminate before term
  canPause: boolean;      // Subscription can be temporarily suspended
  canRenew: boolean;      // Subscription can be manually or auto-renewed
}

export interface Plan {
  id: string;
  name: string;
  code: string;
  description: string;
  billingFrequency: BillingFrequency;
  price: number;
  minQuantity: number;
  availableFrom: string; // ISO date YYYY-MM-DD
  availableTo?: string;  // Optional expiration date
  policies: PlanPolicy;
  isActive: boolean;
  createdAt: string;
}
