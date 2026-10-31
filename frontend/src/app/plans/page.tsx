'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockPlans } from '@/data';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatters';
import { Plus, Check } from 'lucide-react';

export default function PlansPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Subscription Plans &amp; Billing Cycles
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Configure daily, weekly, monthly, and yearly recurring rules, auto-close policies, and pause controls.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('New plan configuration builder ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create New Plan</span>
          </Button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPlans.map((plan) => (
            <div
              key={plan.id}
              className="editorial-card rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-blush mb-3">
                  <span className="text-[10px] font-mono font-bold text-stone-grey bg-ivory px-2 py-0.5 rounded border border-blush">
                    {plan.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-crimson bg-red-50 border border-crimson/20 px-2 py-0.5 rounded-full">
                    {plan.billingFrequency}
                  </span>
                </div>

                <h3 className="text-base font-bold text-espresso">{plan.name}</h3>
                <p className="text-xs text-stone-grey mt-1 leading-relaxed">
                  {plan.description}
                </p>

                <div className="my-5 py-3 border-y border-blush/60">
                  <p className="text-3xl font-black text-espresso font-mono">
                    {formatCurrency(plan.price)}
                  </p>
                  <p className="text-[11px] text-stone-grey font-medium mt-0.5">
                    Billed per {plan.billingFrequency.toLowerCase()} (Min Qty: {plan.minQuantity})
                  </p>
                </div>

                {/* Policies Checklist */}
                <div className="space-y-2 text-xs">
                  <p className="text-[10.5px] uppercase font-bold text-stone-grey tracking-wider">
                    Plan Lifecycle Policy
                  </p>
                  <div className="flex items-center gap-2 text-stone-grey-dark">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Auto-close on end: {plan.policies.canAutoClose ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-grey-dark">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Customer early termination: {plan.policies.canCloseEarly ? 'Allowed' : 'Locked'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-grey-dark">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Temporary suspension: {plan.policies.canPause ? 'Supported' : 'Disabled'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-grey-dark">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Early renewal: {plan.policies.canRenew ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blush flex items-center justify-between">
                <span className="text-[11px] text-stone-grey font-mono">
                  From: {plan.availableFrom}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Plan ${plan.name} settings updated!`)}
                  className="text-xs"
                >
                  Edit Plan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
