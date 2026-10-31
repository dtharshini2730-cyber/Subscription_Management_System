'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DatePeriod } from './PageHeader';

interface SubscriptionChartProps {
  period: DatePeriod;
}

export function SubscriptionChart({ period }: SubscriptionChartProps) {
  const dataByPeriod: Record<
    DatePeriod,
    { month: string; active: number; newSubs: number; churned: number }[]
  > = {
    '30d': [
      { month: 'Week 1', active: 132, newSubs: 6, churned: 1 },
      { month: 'Week 2', active: 136, newSubs: 5, churned: 1 },
      { month: 'Week 3', active: 139, newSubs: 4, churned: 1 },
      { month: 'Week 4', active: 142, newSubs: 5, churned: 2 },
    ],
    quarter: [
      { month: 'Aug', active: 125, newSubs: 14, churned: 3 },
      { month: 'Sep', active: 134, newSubs: 16, churned: 4 },
      { month: 'Oct', active: 142, newSubs: 12, churned: 2 },
    ],
    year: [
      { month: 'Jan', active: 92, newSubs: 10, churned: 2 },
      { month: 'Feb', active: 98, newSubs: 8, churned: 2 },
      { month: 'Mar', active: 105, newSubs: 11, churned: 3 },
      { month: 'Apr', active: 110, newSubs: 9, churned: 1 },
      { month: 'May', active: 116, newSubs: 12, churned: 4 },
      { month: 'Jun', active: 120, newSubs: 8, churned: 2 },
      { month: 'Jul', active: 124, newSubs: 9, churned: 3 },
      { month: 'Aug', active: 128, newSubs: 11, churned: 2 },
      { month: 'Sep', active: 135, newSubs: 12, churned: 3 },
      { month: 'Oct', active: 142, newSubs: 14, churned: 2 },
    ],
    all: [
      { month: '2024', active: 65, newSubs: 45, churned: 12 },
      { month: '2025', active: 95, newSubs: 58, churned: 15 },
      { month: '2026', active: 142, newSubs: 64, churned: 11 },
    ],
  };

  const chartData = dataByPeriod[period] || dataByPeriod.year;

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-espresso text-ivory p-3 rounded-lg shadow-xl border border-blush/20 text-xs font-sans">
          <p className="font-bold text-white mb-1.5 border-b border-white/10 pb-1">
            {label}
          </p>
          {payload.map((entry, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-stone-grey">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-white font-mono">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="editorial-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-blush/60">
        <div>
          <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
            Subscription Growth Dynamics
          </h3>
          <p className="text-[11px] text-stone-grey mt-0.5">
            Active portfolio progression vs. new activations and churn
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          +12.5% Net Growth
        </span>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DAD5" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#9D9695"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E8DAD5' }}
            />
            <YAxis
              stroke="#9D9695"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
            />
            <Bar
              dataKey="active"
              name="Active Subscriptions"
              fill="#541415"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="newSubs"
              name="New Activations"
              fill="#D93645"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="churned"
              name="Paused / Churned"
              fill="#9D9695"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
