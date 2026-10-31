import { TaxRule } from '@/types';

export const mockTaxes: TaxRule[] = [
  {
    id: 'tax-us-tx',
    name: 'Texas State Sales Tax',
    code: 'TX-SALES-8.25',
    ratePercent: 8.25,
    country: 'USA',
    region: 'TX',
    calculationType: 'EXCLUSIVE',
    isDefault: true,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'tax-uk-vat',
    name: 'UK Standard VAT',
    code: 'UK-VAT-20',
    ratePercent: 20.0,
    country: 'UK',
    calculationType: 'EXCLUSIVE',
    isDefault: false,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'tax-in-gst',
    name: 'India Integrated GST',
    code: 'IN-IGST-18',
    ratePercent: 18.0,
    country: 'IND',
    calculationType: 'EXCLUSIVE',
    isDefault: false,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
];
