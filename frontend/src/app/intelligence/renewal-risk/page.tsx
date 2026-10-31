'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { RenewalRiskOverview } from '@/components/dashboard/RenewalRiskOverview';
import { mockDiscountRecommendations } from '@/data';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RenewalRiskPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Renewal Risk &amp; Churn Defense
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Real-time predictive flags targeting upcoming contract expiration, payment delays, and account disengagement.
            </p>
          </div>
        </div>

        {/* Primary Risk Overview */}
        <RenewalRiskOverview />

        {/* Smart Discount Recommendations */}
        <div className="editorial-card rounded-xl p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-blush/60 mb-4">
            <div className="p-1.5 rounded-lg bg-burgundy/10 text-burgundy">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
                Smart Discount Recommendations
              </h3>
              <p className="text-[11px] text-stone-grey">
                Margin-safe promotional suggestions designed to lock in long-term renewals
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {mockDiscountRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl bg-ivory/60 border border-blush flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-espresso">{rec.customerName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 text-crimson font-black border border-crimson/20">
                      {rec.suggestedPercent}% Off ({rec.suggestedDiscountCode})
                    </span>
                  </div>
                  <p className="text-xs text-stone-grey-dark max-w-2xl">{rec.rationale}</p>
                  <p className="text-[11px] text-emerald-800 font-bold">
                    Projected Retention Boost: +{rec.projectedRetentionBoostPercent}% · Margin Impact: {rec.marginImpact}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert(`Offer ${rec.suggestedDiscountCode} dispatched to ${rec.customerName}!`)}
                  className="text-xs shrink-0"
                >
                  Apply &amp; Send Offer
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
