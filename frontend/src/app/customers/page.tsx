'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockCustomers } from '@/data';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatters';
import { Search, Plus, Mail, Phone } from 'lucide-react';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Customers Directory
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Manage enterprise client profiles, credit terms, and linked subscription accounts.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('New Customer onboarding modal ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Customer</span>
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-stone-grey absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, contact, or email..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-blush text-espresso placeholder:text-stone-grey focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson"
            />
          </div>
          <span className="text-xs font-semibold text-stone-grey">
            Showing {filteredCustomers.length} of {mockCustomers.length} customers
          </span>
        </div>

        {/* Customers Table */}
        <div className="editorial-card rounded-xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-blush text-stone-grey font-semibold uppercase text-[11px] tracking-wider">
                  <th className="pb-3">Company &amp; Contact</th>
                  <th className="pb-3">Contact Details</th>
                  <th className="pb-3">Location &amp; Tax ID</th>
                  <th className="pb-3 text-center">Active Plans</th>
                  <th className="pb-3 text-right">Lifetime Spend</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/40">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy font-bold flex items-center justify-center shrink-0 text-xs">
                          {customer.companyName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-espresso text-xs">{customer.companyName}</p>
                          <p className="text-[11px] text-stone-grey">{customer.contactName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 space-y-0.5">
                      <p className="text-espresso font-mono text-[11px] flex items-center gap-1">
                        <Mail className="w-3 h-3 text-stone-grey" />
                        {customer.email}
                      </p>
                      <p className="text-stone-grey text-[11px] flex items-center gap-1">
                        <Phone className="w-3 h-3 text-stone-grey" />
                        {customer.phone}
                      </p>
                    </td>
                    <td className="py-3.5">
                      <p className="text-espresso font-medium">
                        {customer.billingAddress.city}, {customer.billingAddress.state} ({customer.billingAddress.country})
                      </p>
                      <p className="text-[10.5px] text-stone-grey font-mono mt-0.5">
                        Tax ID: {customer.taxNumber || 'N/A'}
                      </p>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px]">
                        {customer.activeSubscriptionsCount} Active
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-espresso">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="py-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => alert(`Customer account ${customer.companyName} profile loaded!`)}
                        className="text-xs text-crimson hover:bg-crimson/10"
                      >
                        Manage
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
