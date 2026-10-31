'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockDiscounts } from '@/data';
import { Button } from '@/components/ui/Button';
import { Plus, CheckCircle } from 'lucide-react';

export default function DiscountsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Discounts &amp; Promotional Rules
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Admin-controlled discount engine: percentage deductions, fixed amounts, seat minimums, and usage limits.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('New Discount Rule wizard ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create Discount</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockDiscounts.map((disc) => (
            <div key={disc.id} className="editorial-card rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blush">
                <span className="font-mono text-xs font-black text-crimson px-2.5 py-1 rounded bg-red-50 border border-crimson/20">
                  {disc.code}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {disc.type}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-espresso">{disc.name}</h3>
                <p className="text-2xl font-black text-espresso mt-2 font-mono">
                  {disc.type === 'PERCENTAGE' ? `${disc.value}% OFF` : `$${disc.value} FLAT`}
                </p>
                <p className="text-xs text-stone-grey mt-1">
                  Scope: <strong className="text-espresso">{disc.scope}</strong>
                  {disc.minQuantity ? ` · Minimum ${disc.minQuantity} seats required` : ''}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-ivory border border-blush text-xs space-y-1.5">
                <div className="flex justify-between text-stone-grey">
                  <span>Usage Limit:</span>
                  <span className="font-mono font-bold text-espresso">{disc.currentUses} / {disc.maxUses || '∞'} used</span>
                </div>
                <div className="flex justify-between text-stone-grey">
                  <span>Validity Window:</span>
                  <span className="font-mono text-stone-grey-dark">{disc.validFrom} → {disc.validTo || 'Permanent'}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-grey flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Active Rule
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Editing discount rule ${disc.code}`)}
                >
                  Configure Rule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
