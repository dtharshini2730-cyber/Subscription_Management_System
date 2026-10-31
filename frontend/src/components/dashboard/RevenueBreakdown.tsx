'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

export function RevenueBreakdown() {
  const breakdownItems = [
    {
      name: 'Brightloop Enterprise ERP (Base)',
      sku: 'BL-ERP-STD',
      amount: 27120.0,
      share: 46.5,
      growth: '+14.2%',
      color: 'bg-crimson',
      barColor: 'from-crimson to-crimson-bright',
    },
    {
      name: 'Odoo Ecosystem Variant (+ $560)',
      sku: 'BL-ERP-ODOO-560',
      amount: 22862.4,
      share: 39.2,
      growth: '+28.5%',
      color: 'bg-burgundy',
      barColor: 'from-burgundy to-burgundy-light',
    },
    {
      name: 'Real-Time Revenue Analytics Add-on',
      sku: 'BL-ANL-200',
      amount: 4900.0,
      share: 8.4,
      growth: '+9.1%',
      color: 'bg-stone-grey-dark',
      barColor: 'from-stone-grey-dark to-stone-grey',
    },
    {
      name: '24/7 Priority SLA Support',
      sku: 'BL-SUP-300',
      amount: 3490.0,
      share: 5.9,
      growth: '+4.0%',
      color: 'bg-espresso',
      barColor: 'from-espresso to-espresso-light',
    },
  ];

  const totalRecognized = breakdownItems.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="editorial-card rounded-xl p-5">
      <div className="flex items-center justify-between pb-3 border-b border-blush/60 mb-5">
        <div>
          <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
            Revenue by Product &amp; Variant
          </h3>
          <p className="text-[11px] text-stone-grey mt-0.5">
            Contribution across software editions, connectors, and service tiers
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-stone-grey uppercase tracking-wider">Total Recognized</p>
          <p className="text-sm font-extrabold text-espresso font-mono">
            {formatCurrency(totalRecognized)}
          </p>
        </div>
      </div>

      {/* Progress Multi-Bar */}
      <div className="h-3 rounded-full bg-ivory overflow-hidden flex gap-0.5 border border-blush mb-5">
        {breakdownItems.map((item, idx) => (
          <div
            key={idx}
            className={`h-full bg-gradient-to-r ${item.barColor}`}
            style={{ width: `${item.share}%` }}
            title={`${item.name}: ${item.share}%`}
          />
        ))}
      </div>

      {/* Itemized List */}
      <div className="space-y-3.5">
        {breakdownItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg bg-ivory/60 border border-blush/60 hover:bg-white hover:border-blush transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.color}`} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-espresso truncate">
                  {item.name}
                </p>
                <p className="text-[10px] text-stone-grey font-mono mt-0.5">
                  SKU: {item.sku} · {item.share}% portfolio share
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 pl-3">
              <p className="text-xs font-extrabold text-espresso font-mono">
                {formatCurrency(item.amount)}
              </p>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800">
                <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
                {item.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
