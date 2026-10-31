'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockQuotations, mockQuotationTemplates } from '@/data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { FileText, Plus, CheckCircle, Repeat } from 'lucide-react';

export default function QuotationsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Quotations &amp; Proposals
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Start from reusable templates with preconfigured lines, issue proposals, and convert into active subscriptions.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('New Quotation builder modal ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create Quotation</span>
          </Button>
        </div>

        {/* Templates Banner */}
        <div className="p-4 rounded-xl bg-ivory border border-blush flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-burgundy/10 text-burgundy">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-espresso">
                Quotation Template: {mockQuotationTemplates[0].name}
              </p>
              <p className="text-[11px] text-stone-grey">
                Preconfigured with ERP core, Odoo connector, and 30-day validity window.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Template loaded into quote builder!')}
            className="text-xs shrink-0"
          >
            Use Template
          </Button>
        </div>

        {/* Quotations Table */}
        <div className="editorial-card rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-blush text-stone-grey font-semibold uppercase text-[11px] tracking-wider">
                  <th className="pb-3">Quotation #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Valid Until</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Grand Total</th>
                  <th className="pb-3 text-right">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/40">
                {mockQuotations.map((quote) => (
                  <tr key={quote.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-espresso">
                      {quote.quotationNumber}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-espresso">{quote.customerName}</p>
                      <p className="text-[10px] text-stone-grey">{quote.customerEmail}</p>
                    </td>
                    <td className="py-3 text-stone-grey-dark">{quote.planName}</td>
                    <td className="py-3 font-mono text-[11px] text-stone-grey">
                      {formatDate(quote.validUntil)}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={quote.status} size="sm" />
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-espresso">
                      {formatCurrency(quote.grandTotal)}
                    </td>
                    <td className="py-3 text-right">
                      {quote.status === 'CONVERTED' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Linked {quote.convertedSubscriptionId}</span>
                        </span>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => alert(`Quote ${quote.quotationNumber} converted to Subscription!`)}
                          className="text-xs px-2.5 py-1"
                        >
                          <Repeat className="w-3 h-3 mr-1" />
                          <span>Convert</span>
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
