import { DiscountRule } from '@/types';

export const mockDiscounts: DiscountRule[] = [
  {
    id: 'disc-bulk-15',
    code: 'BULKSEATS15',
    name: 'High-Volume Enterprise Seat Discount',
    type: 'PERCENTAGE',
    value: 15.0, // 15% off
    scope: 'SUBSCRIPTION',
    minQuantity: 10,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    maxUses: 100,
    currentUses: 14,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'disc-odoo-launch',
    code: 'ODOOLAUNCH200',
    name: 'Odoo Ecosystem Adoption Credit',
    type: 'FIXED_AMOUNT',
    value: 200.0, // $200 off
    scope: 'PRODUCT',
    applicableProductIds: ['prod-01'],
    minPurchaseAmount: 1000.0,
    validFrom: '2026-02-01',
    validTo: '2026-08-31',
    maxUses: 50,
    currentUses: 8,
    isActive: true,
    createdAt: '2026-02-01T00:00:00Z',
  },
];
