import { Invoice } from '@/types';

/**
 * Precision currency rounder to 2 decimal places
 */
export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates line totals including applicable taxes and discounts
 */
export function calculateLineTotal(
  unitPrice: number,
  quantity: number,
  taxRatePercent: number = 0,
  discountAmount: number = 0
): { subtotal: number; taxAmount: number; discountAmount: number; lineTotal: number } {
  const subtotal = roundCurrency(unitPrice * quantity);
  const netBeforeTax = Math.max(0, subtotal - discountAmount);
  const taxAmount = roundCurrency((netBeforeTax * taxRatePercent) / 100);
  const lineTotal = roundCurrency(netBeforeTax + taxAmount);

  return {
    subtotal,
    taxAmount,
    discountAmount,
    lineTotal,
  };
}

/**
 * Prevents duplicate recurring invoices by generating a unique period hash key
 */
export function generateBillingPeriodKey(
  subscriptionId: string,
  periodStart: string,
  periodEnd: string
): string {
  return `${subscriptionId}::${periodStart}::${periodEnd}`;
}

/**
 * Checks whether an invoice already exists for a subscription within the same billing period
 */
export function isDuplicateInvoicePeriod(
  existingInvoices: Invoice[],
  subscriptionId: string,
  periodStart: string,
  periodEnd: string
): boolean {
  const targetKey = generateBillingPeriodKey(subscriptionId, periodStart, periodEnd);
  return existingInvoices.some((inv) => {
    if (inv.subscriptionId !== subscriptionId || inv.status === 'CANCELLED') {
      return false;
    }
    const invKey = generateBillingPeriodKey(inv.subscriptionId, inv.periodStart, inv.periodEnd);
    return invKey === targetKey;
  });
}
