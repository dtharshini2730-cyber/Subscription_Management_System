export type ProductType = 'SOFTWARE' | 'SERVICE' | 'ADD_ON' | 'CONSUMABLE';

export interface ProductVariant {
  id: string;
  productId: string;
  name: string; // e.g. "Odoo Brand Edition", "Enterprise Dedicated Support"
  attributeName: string; // e.g. "Brand", "Tier"
  attributeValue: string; // e.g. "Odoo", "Gold"
  additionalPrice: number; // e.g. 560
  sku: string;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  type: ProductType;
  salesPrice: number;
  costPrice: number;
  description?: string;
  notes?: string;
  variants: ProductVariant[];
  isActive: boolean;
  createdAt: string;
}
