'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockInvoices } from '@/data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Play, Download, Printer } from 'lucide-react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(mockInvoices);

  const handleRunBilling = () => {
    alert('Idempotent billing run executed: Scanned all active subscriptions. 0 duplicate intervals found. Invoices are in sync!');
  };

  const handleConfirmInvoice = (id: string, number: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'CONFIRMED' } : inv))
    );
    alert(`Invoice ${number} confirmed and posted to receivables!`);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Invoices &amp; Recurring Billing Engine
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Automated invoice generation from subscriptions, tax calculations, and duplicate billing protection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => alert('Batch export to PDF ready!')}
            >
              <Printer className="w-4 h-4 mr-1.5" />
              <span>Print Batch</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleRunBilling}
              className="crimson-glow"
            >
              <Play className="w-4 h-4 mr-1.5" />
              <span>Run Billing Cycle</span>
            </Button>
          </div>
        </div>

        {/* Invoices Master Table */}
        <div className="editorial-card rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-blush text-stone-grey font-semibold uppercase text-[11px] tracking-wider">
                  <th className="pb-3">Invoice Number</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Billing Period</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Tax (8.25%)</th>
                  <th className="pb-3 text-right">Total Amount</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/40">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-espresso">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-espresso">{inv.customerName}</p>
                      <p className="text-[10px] text-stone-grey font-mono">{inv.subscriptionNumber}</p>
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-stone-grey">
                      {inv.periodStart} → {inv.periodEnd}
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-stone-grey">
                      {formatDate(inv.dueDate)}
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={inv.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-right font-mono text-stone-grey">
                      {formatCurrency(inv.taxTotal)}
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-espresso">
                      {formatCurrency(inv.totalAmount)}
                    </td>
                    <td className="py-3.5 text-right space-x-1.5">
                      {inv.status === 'DRAFT' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleConfirmInvoice(inv.id, inv.invoiceNumber)}
                          className="text-xs px-2 py-0.5"
                        >
                          Confirm
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Invoice ${inv.invoiceNumber} receipt downloaded!`)}
                        className="text-xs px-2 py-0.5"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
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
