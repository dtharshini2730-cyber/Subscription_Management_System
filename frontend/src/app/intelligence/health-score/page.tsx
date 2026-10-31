'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { SubscriptionHealthSummary } from '@/components/dashboard/SubscriptionHealthSummary';

export default function HealthScorePage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="pb-6 border-b border-blush">
          <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
            Subscription Health Scoreboard
          </h1>
          <p className="text-xs text-stone-grey mt-1">
            Multivariate composite index tracking product usage, contract longevity, support ticket frequency, and payment timeliness.
          </p>
        </div>

        <SubscriptionHealthSummary />
      </div>
    </DashboardShell>
  );
}
