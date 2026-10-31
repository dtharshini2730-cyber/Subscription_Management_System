'use client';

import React, { useState } from 'react';
import { Search, Eye, X, Receipt, Download } from 'lucide-react';
import { mockInvoices } from '@/data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Invoice } from '@/types';

export function RecentTransactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'CONFIRMED' | 'DRAFT'>('ALL');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Filter invoices based on search & status
  const filteredInvoices = mockInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || inv.status.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="editorial-card rounded-xl p-5">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blush/60 mb-4">
        <div>
          <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
            Recent Billing Transactions &amp; Invoices
          </h3>
          <p className="text-[11px] text-stone-grey mt-0.5">
            Active receivables, automated billing runs, and settlement records
          </p>
        </div>

        {/* Search & Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-stone-grey absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by customer, invoice..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-ivory rounded-lg border border-blush text-espresso placeholder:text-stone-grey focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson"
            />
          </div>

          <div className="flex items-center gap-1 bg-ivory p-0.5 rounded-lg border border-blush text-[11px] font-semibold">
            {(['ALL', 'PAID', 'CONFIRMED', 'DRAFT'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-2 py-1 rounded cursor-pointer transition-colors capitalize ${
                  statusFilter === filter
                    ? 'bg-crimson text-white font-bold shadow-xs'
                    : 'text-stone-grey hover:text-espresso'
                }`}
              >
                {filter.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blush text-stone-grey font-semibold text-[11px] uppercase tracking-wider">
              <th className="pb-3">Invoice Number</th>
              <th className="pb-3">Customer &amp; Account</th>
              <th className="pb-3">Billing Period</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blush/40">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-ivory/60 transition-colors group">
                  <td className="py-3 font-mono font-bold text-espresso">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-espresso">{inv.customerName}</p>
                    <p className="text-[10px] text-stone-grey">{inv.customerEmail}</p>
                  </td>
                  <td className="py-3 text-[11px] text-stone-grey-dark font-mono">
                    {inv.periodStart} → {inv.periodEnd}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={inv.status} size="sm" />
                  </td>
                  <td className="py-3 text-right font-mono font-extrabold text-espresso">
                    {formatCurrency(inv.totalAmount)}
                  </td>
                  <td className="py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInvoice(inv)}
                      className="text-xs px-2.5 py-1 text-crimson hover:bg-crimson/10 gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-stone-grey text-xs">
                  No invoices matched your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Invoice Inspector */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-blush shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-stone-grey hover:text-espresso hover:bg-ivory transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-blush">
              <div className="p-2.5 rounded-xl bg-crimson/10 text-crimson">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-espresso">
                  Invoice {selectedInvoice.invoiceNumber}
                </h4>
                <p className="text-xs text-stone-grey">
                  Issued {formatDate(selectedInvoice.issueDate)} · Due {formatDate(selectedInvoice.dueDate)}
                </p>
              </div>
            </div>

            {/* Customer & Status */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-ivory/60 border border-blush text-xs mb-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-grey">Customer</p>
                <p className="font-semibold text-espresso">{selectedInvoice.customerName}</p>
                <p className="text-[11px] text-stone-grey">{selectedInvoice.customerAddress}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-grey">Status &amp; Terms</p>
                <div className="mt-1">
                  <StatusBadge status={selectedInvoice.status} size="sm" />
                </div>
                <p className="text-[11px] text-stone-grey mt-1 font-mono">
                  Method: {selectedInvoice.paymentMethod || 'Net 15 Direct'}
                </p>
              </div>
            </div>

            {/* Line items list */}
            <div className="space-y-2 mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-grey">
                Billed Items
              </p>
              {selectedInvoice.lines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-ivory/30 border border-blush text-xs"
                >
                  <div>
                    <p className="font-semibold text-espresso">{line.productName}</p>
                    <p className="text-[10px] text-stone-grey">
                      Qty: {line.quantity} × {formatCurrency(line.unitPrice)} (Tax: {line.taxRatePercent}%)
                    </p>
                  </div>
                  <span className="font-mono font-bold text-espresso">
                    {formatCurrency(line.lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="p-3 rounded-xl bg-ivory border border-blush space-y-1.5 text-xs font-mono mb-5">
              <div className="flex justify-between text-stone-grey">
                <span>Subtotal:</span>
                <span>{formatCurrency(selectedInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-grey">
                <span>Tax (8.25%):</span>
                <span>{formatCurrency(selectedInvoice.taxTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-espresso text-sm pt-1.5 border-t border-blush">
                <span>Total Amount:</span>
                <span className="text-crimson">{formatCurrency(selectedInvoice.totalAmount)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedInvoice(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`Invoice ${selectedInvoice.invoiceNumber} PDF receipt downloaded!`);
                  setSelectedInvoice(null);
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
