export interface Customer {
  id: string;
  userId?: string; // Linked portal user account
  companyName: string;
  contactName: string;
  email: string; // Must be unique
  phone: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  taxNumber?: string;
  currency: string;
  creditLimit?: number;
  totalSpent: number;
  activeSubscriptionsCount: number;
  createdAt: string;
}
