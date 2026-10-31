'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockPayments } from '@/data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Plus } from 'lucide-react';

export default function PaymentsPage() {
  const totalCollected = mockPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Payments &amp; Settlement Ledger
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Record customer payments, reconcile against invoices, and track outstanding revenue.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('Record payment modal ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Record Payment</span>
          </Button>
        </div>

        {/* Payments Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="editorial-card rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-grey uppercase">Settled Transactions</p>
            <p className="text-2xl font-black text-espresso mt-1 font-mono">
              {formatCurrency(totalCollected)}
            </p>
            <span className="text-[11px] text-emerald-800 font-bold mt-2 inline-block">
              100% Reconciled
            </span>
          </div>

          <div className="editorial-card rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-grey uppercase">Payment Methods</p>
            <p className="text-2xl font-black text-espresso mt-1">
              ACH &amp; Wire Transfer
            </p>
            <span className="text-[11px] text-stone-grey font-medium mt-2 inline-block">
              Direct institutional settlement
            </span>
          </div>

          <div className="editorial-card rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-grey uppercase">Outstanding Overdue</p>
            <p className="text-2xl font-black text-crimson mt-1 font-mono">
              $22,862.40
            </p>
            <span className="text-[11px] text-crimson font-bold mt-2 inline-block">
              1 Account pending payment
            </span>
          </div>
        </div>

        {/* Payments Table */}
        <div className="editorial-card rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-blush text-stone-grey font-semibold uppercase text-[11px] tracking-wider">
                  <th className="pb-3">Payment #</th>
                  <th className="pb-3">Customer &amp; Note</th>
                  <th className="pb-3">Invoice Ref</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/40">
                {mockPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-espresso">
                      {pay.paymentNumber}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-espresso">{pay.customerName}</p>
                      <p className="text-[10.5px] text-stone-grey">{pay.note}</p>
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-crimson font-bold">
                      {pay.invoiceNumber}
                    </td>
                    <td className="py-3.5 font-medium text-stone-grey-dark">
                      {pay.paymentMethod.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-stone-grey">
                      {formatDate(pay.paymentDate)}
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={pay.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-espresso">
                      {formatCurrency(pay.amount)}
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
