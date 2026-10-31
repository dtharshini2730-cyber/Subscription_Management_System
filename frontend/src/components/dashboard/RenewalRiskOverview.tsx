'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { mockRenewalRisks } from '@/data';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';

export function RenewalRiskOverview() {
  return (
    <div className="editorial-card rounded-xl p-5">
      <div className="flex items-center justify-between pb-3 border-b border-blush/60 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-crimson/10 text-crimson">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
              Renewal Risk Detection
            </h3>
            <p className="text-[11px] text-stone-grey">
              AI predictive model flagging early churn signals &amp; billing friction
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-crimson bg-red-50 border border-crimson/20 px-2 py-0.5 rounded-full">
          1 High Risk Flag
        </span>
      </div>

      <div className="space-y-3">
        {mockRenewalRisks.map((risk) => (
          <div
            key={risk.id}
            className="p-3.5 rounded-lg bg-ivory/60 border border-blush hover:bg-white transition-all space-y-2.5"
          >
            {/* Top row */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-bold text-xs text-espresso">{risk.customerName}</p>
                <p className="text-[10px] text-stone-grey font-mono">
                  {risk.subscriptionNumber} · Contract: {formatCurrency(risk.contractValue)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[10px] text-stone-grey uppercase font-bold">Score</span>
                  <p className="font-mono font-black text-xs text-crimson">
                    {risk.riskScore}/100
                  </p>
                </div>
                <StatusBadge status={risk.riskLevel} size="sm" />
              </div>
            </div>

            {/* Risk factor and action */}
            <div className="p-2.5 rounded bg-white border border-blush/80 text-[11px] space-y-1">
              <p className="text-stone-grey">
                <strong className="text-espresso">Primary Signal:</strong> {risk.primaryRiskFactor}
              </p>
              <p className="text-crimson font-medium">
                <strong>Recommended Action:</strong> {risk.recommendedAction}
              </p>
            </div>

            {/* Action footer */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[10.5px] text-stone-grey">
                Due in {risk.daysUntilExpiry} days ({formatDate(risk.expiryDate)})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Mitigation playbook triggered for ${risk.customerName}!`)}
                className="text-xs px-2.5 py-0.5 text-crimson hover:bg-crimson/10 border-crimson/30"
              >
                Trigger Action
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
