'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockTaxes } from '@/data';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function TaxesPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Tax Configuration &amp; Rules
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Admin-level tax policies automatically evaluated across customer jurisdictions on billing day.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('New Tax Rule wizard ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Tax Rule</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTaxes.map((tax) => (
            <div key={tax.id} className="editorial-card rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blush">
                <span className="font-mono text-xs font-bold text-stone-grey bg-ivory px-2 py-0.5 rounded border border-blush">
                  {tax.code}
                </span>
                {tax.isDefault && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Default Rule
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-espresso">{tax.name}</h3>
                <p className="text-3xl font-black text-espresso mt-2 font-mono">
                  {tax.ratePercent}%
                </p>
                <p className="text-xs text-stone-grey mt-1">
                  Jurisdiction: <strong className="text-espresso">{tax.country}</strong> {tax.region ? `(${tax.region})` : ''}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-ivory border border-blush text-xs space-y-1">
                <div className="flex justify-between text-stone-grey">
                  <span>Calculation Mode:</span>
                  <span className="font-semibold text-espresso">{tax.calculationType}</span>
                </div>
                <div className="flex justify-between text-stone-grey">
                  <span>Billing Automation:</span>
                  <span className="text-emerald-700 font-medium">Applied on generation</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Configuring ${tax.name}`)}
                className="w-full text-xs"
              >
                Modify Tax Rate
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
