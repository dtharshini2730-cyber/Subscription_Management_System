'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockInvoiceAnomalies } from '@/data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Check } from 'lucide-react';

export default function InvoiceAnomaliesPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Invoice Anomaly &amp; Revenue Leakage Detection
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Automated heuristics scanning invoice lines for irregular pricing spikes, unauthorized discounts, or duplicate periods.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => alert('Anomaly scan completed: 0 critical revenue leakages detected!')}
          >
            Run Integrity Scan
          </Button>
        </div>

        <div className="space-y-4">
          {mockInvoiceAnomalies.map((anom) => (
            <div
              key={anom.id}
              className="editorial-card rounded-xl p-5 border-l-4 border-l-crimson space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-crimson" />
                  <span className="font-bold text-xs text-espresso">
                    {anom.customerName} · {anom.invoiceNumber}
                  </span>
                </div>
                <StatusBadge status={anom.severity} size="sm" />
              </div>

              <div className="p-3 rounded-lg bg-ivory border border-blush text-xs space-y-1">
                <p className="font-semibold text-espresso">Anomaly Type: {anom.anomalyType.replace('_', ' ')}</p>
                <p className="text-stone-grey-dark">{anom.description}</p>
                {anom.variancePercentage && (
                  <p className="text-crimson font-mono font-bold text-[11px]">
                    Variance Detected: +{anom.variancePercentage}% jump from contract baseline
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-stone-grey font-mono">
                  Flagged on {anom.detectedAt.slice(0, 10)}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert(`Anomaly on ${anom.invoiceNumber} verified as intentional Odoo variant upgrade!`)}
                  className="text-xs px-2.5 py-1"
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>Verify &amp; Clear</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
