'use client';

import React, { useState } from 'react';
import { BellRing, Check } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';

export function UpcomingRenewals() {
  const [remindedIds, setRemindedIds] = useState<string[]>([]);

  // Realistic upcoming renewals
  const upcomingList = [
    {
      id: 'sub-03',
      subNumber: 'SUB-2026-0103',
      customer: 'FinFlow Technologies Ltd',
      plan: 'Enterprise Annual Contract',
      expiryDate: '2026-12-31',
      daysLeft: 61,
      value: 31020.0,
      autoRenew: true,
    },
    {
      id: 'sub-01',
      subNumber: 'SUB-2026-0101',
      customer: 'Apex Logistics Inc.',
      plan: 'Growth Monthly Plan (Odoo Variant)',
      expiryDate: '2026-11-30',
      daysLeft: 30,
      value: 22862.4,
      autoRenew: true,
    },
    {
      id: 'sub-02',
      subNumber: 'SUB-2026-0102',
      customer: 'Lumina Creative Studio',
      plan: 'Growth Monthly Plan (Standard)',
      expiryDate: '2026-11-30',
      daysLeft: 30,
      value: 6495.0,
      autoRenew: false,
    },
  ];

  const handleSendReminder = (id: string, customer: string) => {
    setRemindedIds((prev) => [...prev, id]);
    alert(`Renewal reminder dispatched to ${customer}!`);
  };

  return (
    <div className="editorial-card rounded-xl p-5">
      <div className="flex items-center justify-between pb-3 border-b border-blush/60 mb-4">
        <div>
          <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
            Upcoming Contract Renewals
          </h3>
          <p className="text-[11px] text-stone-grey mt-0.5">
            Subscriptions expiring within the next 30 to 90 days
          </p>
        </div>
        <span className="text-xs font-bold text-stone-grey font-mono">
          {upcomingList.length} Accounts Due
        </span>
      </div>

      <div className="space-y-3">
        {upcomingList.map((item) => {
          const isReminded = remindedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-lg bg-ivory/60 border border-blush hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-espresso">
                    {item.customer}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blush/60 text-stone-grey-dark">
                    {item.subNumber}
                  </span>
                </div>
                <p className="text-[11px] text-stone-grey truncate">
                  {item.plan} · Expires <strong className="text-espresso">{formatDate(item.expiryDate)}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-xs font-mono font-extrabold text-espresso">
                    {formatCurrency(item.value)}
                  </p>
                  <span
                    className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.daysLeft <= 30
                        ? 'bg-red-50 text-crimson border border-crimson/20'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    In {item.daysLeft} days
                  </span>
                </div>

                <Button
                  variant={isReminded ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => handleSendReminder(item.id, item.customer)}
                  className="text-xs px-2.5 py-1"
                >
                  {isReminded ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 mr-1" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <BellRing className="w-3 h-3 mr-1" />
                      <span>Notice</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
