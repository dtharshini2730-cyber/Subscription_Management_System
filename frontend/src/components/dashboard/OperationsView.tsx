'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  DollarSign,
  Repeat,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Receipt,
  Layers,
  Lock,
} from 'lucide-react';
import {
  mockSubscriptions,
  mockInvoices,
  mockProducts,
} from '@/data';
import { formatCurrency } from '@/lib/formatters';
import { validatePasswordPolicy } from '@/lib/validation';
import { isDuplicateInvoicePeriod } from '@/lib/calculator';

export function OperationsView() {
  const { currentUser, currentRole, canConfigureDiscountsAndTaxes, canCreateStaffAccounts } = useAuth();

  // Interactive Password Policy Tester state
  const [testPassword, setTestPassword] = useState('Brightloop@2026');
  const policyResult = validatePasswordPolicy(testPassword);

  // Status badge mapping helper
  const getSubStatusBadge = (status: string): BadgeVariant => {
    switch (status) {
      case 'DRAFT': return 'draft';
      case 'QUOTATION': return 'quotation';
      case 'CONFIRMED': return 'confirmed';
      case 'ACTIVE': return 'active';
      case 'CLOSED': return 'closed';
      default: return 'default';
    }
  };

  const getInvStatusBadge = (status: string): BadgeVariant => {
    switch (status) {
      case 'DRAFT': return 'draft';
      case 'CONFIRMED': return 'overdue';
      case 'PAID': return 'paid';
      case 'CANCELLED': return 'closed';
      default: return 'default';
    }
  };

  // Sample duplicate check simulation
  const isDuplicateSimulated = isDuplicateInvoicePeriod(
    mockInvoices,
    'sub-01',
    '2026-10-01',
    '2026-10-31'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome & Role Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-[#161211] border border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Subscription &amp; Revenue Operations Cockpit
            </h2>
            <Badge variant="crimson" className="text-[10px]">
              Live Engine
            </Badge>
          </div>
          <p className="text-xs text-stone-grey mt-1">
            Active Persona: <strong className="text-white">{currentUser.name}</strong> ({currentRole}) • Brightloop Software
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-ivory border-white/15 hover:bg-white/10 hover:border-white/30"
            onClick={() => alert('Quotation Builder ready for Phase 2!')}
          >
            <FileText className="w-3.5 h-3.5" />
            New Quote
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => alert('Billing Cycle Trigger simulated: Duplicate check hash verified, 0 duplicate invoices emitted!')}
          >
            <Receipt className="w-3.5 h-3.5" />
            Run Billing Cycle
          </Button>
        </div>
      </div>

      {/* Metric KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Recurring Revenue"
          value="$4,490.20"
          change="+18.4%"
          isPositive={true}
          subtitle="vs. prior 30 days"
          icon={DollarSign}
          accentColor="crimson"
        />
        <MetricCard
          title="Active Subscriptions"
          value="3 Enterprise"
          change="+1"
          isPositive={true}
          subtitle="0 churn this month"
          icon={Repeat}
          accentColor="burgundy"
        />
        <MetricCard
          title="Overdue Receivables"
          value="$22,862.40"
          change="1 Invoice"
          isPositive={false}
          subtitle="Apex Logistics (15d overdue)"
          icon={AlertCircle}
          accentColor="espresso"
        />
        <MetricCard
          title="Collection Efficiency"
          value="88.2%"
          change="+3.1%"
          isPositive={true}
          subtitle="Automated settlement"
          icon={TrendingUp}
          accentColor="stone"
        />
      </div>

      {/* Core Tables Grid: Subscriptions & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Subscriptions Master List */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Subscription Lifecycle Ledger
              </h3>
              <p className="text-[11px] text-stone-grey mt-0.5">
                Lifecycle: Draft → Quotation → Confirmed → Active → Closed
              </p>
            </div>
            <Badge variant="outline" className="border-white/20 text-stone-grey">
              {mockSubscriptions.length} Records
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-stone-grey font-semibold">
                  <th className="pb-2.5">Number</th>
                  <th className="pb-2.5">Customer &amp; Plan</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockSubscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3 font-mono font-bold text-white">
                      {sub.subscriptionNumber}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-white">{sub.customerName}</p>
                      <p className="text-[11px] text-stone-grey">{sub.planName}</p>
                    </td>
                    <td className="py-3">
                      <Badge variant={getSubStatusBadge(sub.status)}>
                        {sub.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-white">
                      {formatCurrency(sub.grandTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recurring Invoices & Billing Run */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Recurring Invoicing &amp; Billing Run
              </h3>
              <p className="text-[11px] text-stone-grey mt-0.5">
                Automated taxes, line totals, and duplicate prevention
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded font-medium border border-emerald-800/60">
              Idempotency Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-stone-grey font-semibold">
                  <th className="pb-2.5">Invoice #</th>
                  <th className="pb-2.5">Customer</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5 text-right">Total</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3 font-mono font-bold text-white">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-white">{inv.customerName}</p>
                      <p className="text-[10px] text-stone-grey font-mono">Period: {inv.periodStart} to {inv.periodEnd}</p>
                    </td>
                    <td className="py-3">
                      <Badge variant={getInvStatusBadge(inv.status)}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-white">
                      {formatCurrency(inv.totalAmount)}
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[11px] px-2 py-1 text-crimson hover:bg-crimson/15"
                        onClick={() => alert(`Invoice ${inv.invoiceNumber} verified:\nSubtotal: ${formatCurrency(inv.subtotal)}\nTax: ${formatCurrency(inv.taxTotal)}\nTotal: ${formatCurrency(inv.totalAmount)}`)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Domain Logic Verification Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Password Policy Interactive Tester */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-crimson" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Security: Password Policy
            </h4>
          </div>
          <p className="text-xs text-stone-grey mb-3">
            Required: &gt; 8 chars, uppercase, lowercase, special character.
          </p>

          <input
            type="text"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            placeholder="Type a password to test..."
            className="w-full px-3 py-1.5 text-xs bg-black/40 rounded border border-white/10 font-mono mb-3 text-white focus:outline-none focus:border-crimson"
          />

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-stone-grey">More than 8 characters (&gt; 8):</span>
              {policyResult.minLength ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-crimson" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-grey">Uppercase letter:</span>
              {policyResult.hasUppercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-crimson" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-grey">Lowercase letter:</span>
              {policyResult.hasLowercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-crimson" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-grey">Special character:</span>
              {policyResult.hasSpecialChar ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-crimson" />
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-grey">Policy Status:</span>
            <Badge variant={policyResult.isValid ? 'active' : 'overdue'}>
              {policyResult.isValid ? 'Compliant' : 'Non-compliant'}
            </Badge>
          </div>
        </div>

        {/* 2. Brightloop Product Variants Showcase */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-burgundy-light" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Product Variant Pricing
            </h4>
          </div>
          <p className="text-xs text-stone-grey mb-3">
            Case study: Brightloop ERP with Odoo variant adding +$560.
          </p>

          <div className="space-y-2.5">
            {mockProducts[0].variants.map((v) => (
              <div
                key={v.id}
                className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-white">{v.name}</p>
                  <p className="text-[10px] text-stone-grey font-mono">{v.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">
                    {v.additionalPrice > 0 ? `+$${v.additionalPrice}` : 'Base Price'}
                  </p>
                  <span className="text-[10px] text-stone-grey">
                    {formatCurrency(mockProducts[0].salesPrice + v.additionalPrice)} / mo
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-grey">
            <span>Tax Calculation:</span>
            <span className="font-semibold text-white">Auto 8.25% applied</span>
          </div>
        </div>

        {/* 3. Role-Based Access Guard Preview */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-crimson" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              RBAC Guard Matrix
            </h4>
          </div>
          <p className="text-xs text-stone-grey mb-3">
            Current Role: <strong className="text-crimson font-bold">{currentRole}</strong>
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
              <span className="text-stone-grey">Create Staff Accounts:</span>
              <Badge variant={canCreateStaffAccounts ? 'active' : 'draft'}>
                {canCreateStaffAccounts ? 'Allowed (Admin)' : 'Forbidden'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
              <span className="text-stone-grey">Configure Taxes &amp; Discounts:</span>
              <Badge variant={canConfigureDiscountsAndTaxes ? 'active' : 'draft'}>
                {canConfigureDiscountsAndTaxes ? 'Allowed (Admin)' : 'Forbidden'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
              <span className="text-stone-grey">Duplicate Billing Prevention:</span>
              <Badge variant="active">
                {isDuplicateSimulated ? 'Verified (Blocked Re-billing)' : 'Enabled'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
