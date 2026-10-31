'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockSubscriptions } from '@/data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Plus, Search, Pause } from 'lucide-react';
import { SubscriptionStatus } from '@/types';

export default function SubscriptionsPage() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | SubscriptionStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.subscriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.planName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Subscriptions Master Ledger
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Complete lifecycle tracking: Draft → Quotation → Confirmed → Active → Closed.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('New Subscription wizard ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>New Subscription</span>
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-stone-grey absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by number, customer, plan..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-blush text-espresso placeholder:text-stone-grey focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson"
            />
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-blush text-[11px] font-semibold overflow-x-auto">
            {(['ALL', 'DRAFT', 'QUOTATION', 'CONFIRMED', 'ACTIVE', 'CLOSED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors capitalize ${
                  statusFilter === st
                    ? 'bg-crimson text-white font-bold shadow-xs'
                    : 'text-stone-grey hover:text-espresso'
                }`}
              >
                {st.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="editorial-card rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-blush text-stone-grey font-semibold uppercase text-[11px] tracking-wider">
                  <th className="pb-3">Sub Number</th>
                  <th className="pb-3">Customer &amp; Contact</th>
                  <th className="pb-3">Plan Cycle</th>
                  <th className="pb-3">Start &amp; Expiry</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Grand Total</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/40">
                {filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-espresso">
                      {sub.subscriptionNumber}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-espresso">{sub.customerName}</p>
                      <p className="text-[10.5px] text-stone-grey">{sub.customerEmail}</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-semibold text-espresso">{sub.planName}</p>
                      <p className="text-[10px] text-stone-grey">Terms: {sub.paymentTerms}</p>
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-stone-grey">
                      {formatDate(sub.startDate)} → {formatDate(sub.expiryDate)}
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={sub.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-espresso">
                      {formatCurrency(sub.grandTotal)}
                    </td>
                    <td className="py-3.5 text-right space-x-1.5">
                      {sub.status === 'ACTIVE' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert(`Subscription ${sub.subscriptionNumber} paused!`)}
                          className="text-xs px-2 py-0.5"
                        >
                          <Pause className="w-3 h-3 mr-1" />
                          <span>Pause</span>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`Viewing details for ${sub.subscriptionNumber}`)}
                          className="text-xs px-2 py-0.5 text-crimson"
                        >
                          Details
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
