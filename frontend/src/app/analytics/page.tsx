'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { SubscriptionChart } from '@/components/dashboard/SubscriptionChart';
import { RevenueBreakdown } from '@/components/dashboard/RevenueBreakdown';

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Revenue &amp; Portfolio Analytics
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Annual Recurring Revenue (ARR), Monthly Recurring Revenue (MRR), cohort retention, and cash efficiency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-grey">FY 2026 Run Rate:</span>
            <span className="text-lg font-black text-crimson font-mono">$700,468.80 ARR</span>
          </div>
        </div>

        {/* Analytics KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="editorial-card rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-grey uppercase">Average Revenue Per Account (ARPA)</p>
            <p className="text-2xl font-black text-espresso mt-1 font-mono">$1,459.30</p>
            <span className="text-[11px] text-emerald-800 font-bold mt-2 inline-block">+14.5% vs Q2</span>
          </div>

          <div className="editorial-card rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-grey uppercase">Customer Lifetime Value (LTV)</p>
            <p className="text-2xl font-black text-espresso mt-1 font-mono">$38,240.00</p>
            <span className="text-[11px] text-emerald-800 font-bold mt-2 inline-block">LTV:CAC Ratio 4.8x</span>
          </div>

          <div className="editorial-card rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-grey uppercase">Net Revenue Retention (NRR)</p>
            <p className="text-2xl font-black text-espresso mt-1 font-mono">118.4%</p>
            <span className="text-[11px] text-emerald-800 font-bold mt-2 inline-block">Best-in-class expansion</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart period="year" />
          <SubscriptionChart period="year" />
        </div>

        <RevenueBreakdown />
      </div>
    </DashboardShell>
  );
}
