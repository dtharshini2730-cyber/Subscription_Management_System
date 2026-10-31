'use client';

import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockHealthMetrics } from '@/data';
import { formatCurrency } from '@/lib/formatters';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function SubscriptionHealthSummary() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'INCREASING':
        return <TrendingUp className="w-3 h-3 text-emerald-600 mr-1" />;
      case 'DECREASING':
        return <TrendingDown className="w-3 h-3 text-crimson mr-1" />;
      default:
        return <Minus className="w-3 h-3 text-stone-grey mr-1" />;
    }
  };

  return (
    <div className="editorial-card rounded-xl p-5">
      <div className="flex items-center justify-between pb-3 border-b border-blush/60 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-burgundy/10 text-burgundy">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
              Subscription Health Scoreboard
            </h3>
            <p className="text-[11px] text-stone-grey">
              Multivariable account health, feature engagement &amp; reliability
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          88% Avg Health
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {mockHealthMetrics.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-lg bg-ivory/60 border border-blush hover:bg-white transition-all space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-espresso">{item.customerName}</p>
                <p className="text-[10.5px] text-stone-grey font-mono">
                  {item.activeSubscriptionsCount} Subscriptions · {formatCurrency(item.mrr)} MRR
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-grey uppercase font-bold">Health</span>
                <p className="text-base font-black text-espresso font-mono">
                  {item.healthScore}
                  <span className="text-[10px] text-stone-grey font-normal">/100</span>
                </p>
              </div>
            </div>

            {/* Health Bar */}
            <div className="h-2 rounded-full bg-ivory-dark overflow-hidden border border-blush">
              <div
                className={`h-full rounded-full ${
                  item.healthScore >= 80
                    ? 'bg-emerald-600'
                    : item.healthScore >= 60
                    ? 'bg-amber-500'
                    : 'bg-crimson'
                }`}
                style={{ width: `${item.healthScore}%` }}
              />
            </div>

            {/* Metadata Badges */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-blush/60">
              <div className="flex items-center text-[10.5px] font-semibold text-stone-grey">
                {getTrendIcon(item.usageTrend)}
                <span>{item.usageTrend}</span>
              </div>
              <StatusBadge status={item.paymentReliability} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
