'use client';

import React from 'react';
import {
  Receipt,
  CreditCard,
  Tag,
  AlertTriangle,
  Repeat,
} from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: 'act-01',
      title: 'Quotation Converted',
      description: 'QT-2026-0088 converted into active subscription SUB-2026-0102 for Lumina Studio.',
      time: '12 minutes ago',
      icon: Repeat,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'act-02',
      title: 'Recurring Invoice Generated',
      description: 'INV-2026-0899 drafted with Texas State Sales Tax (8.25%) applied.',
      time: '45 minutes ago',
      icon: Receipt,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'act-03',
      title: 'ACH Payment Reconciled',
      description: '$22,862.40 settled against invoice INV-2026-0801 for Apex Logistics.',
      time: '2 hours ago',
      icon: CreditCard,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'act-04',
      title: 'Renewal Friction Detected',
      description: 'AI model flagged overdue invoice risk for Apex Logistics contract review.',
      time: '3 hours ago',
      icon: AlertTriangle,
      color: 'bg-red-50 text-crimson border-crimson/20',
    },
    {
      id: 'act-05',
      title: 'Odoo Variant Configured',
      description: 'Odoo Ecosystem Connector (+$560) variant added to Enterprise ERP catalog.',
      time: '5 hours ago',
      icon: Tag,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  return (
    <div className="editorial-card rounded-xl p-5">
      <div className="flex items-center justify-between pb-3 border-b border-blush/60 mb-4">
        <div>
          <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
            Operational Activity Feed
          </h3>
          <p className="text-[11px] text-stone-grey mt-0.5">
            Real-time audit log of quotes, invoices, payments, and system events
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-grey bg-ivory px-2 py-0.5 rounded border border-blush">
          Live Stream
        </span>
      </div>

      <div className="relative pl-6 space-y-4">
        {/* Timeline vertical bar */}
        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-blush" />

        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="relative flex items-start gap-3 text-xs group">
              {/* Dot */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 -ml-[25px] bg-white ${item.color}`}
              >
                <Icon className="w-2.5 h-2.5" />
              </div>

              <div className="flex-1 min-w-0 p-2.5 rounded-lg bg-ivory/50 border border-blush/60 hover:bg-white transition-colors">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h5 className="font-bold text-espresso text-xs">{item.title}</h5>
                  <span className="text-[10px] text-stone-grey shrink-0 font-mono">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-stone-grey-dark leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
