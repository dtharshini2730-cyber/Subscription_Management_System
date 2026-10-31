'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/formatters';
import { DatePeriod } from './PageHeader';

interface RevenueChartProps {
  period: DatePeriod;
}

export function RevenueChart({ period }: RevenueChartProps) {
  const [metricView, setMetricView] = useState<'both' | 'mrr' | 'collected'>('both');

  // Realistic revenue datasets adapted for selected period
  const dataByPeriod: Record<
    DatePeriod,
    { month: string; mrr: number; collected: number; target: number }[]
  > = {
    '30d': [
      { month: 'Oct 01', mrr: 4200, collected: 3800, target: 4500 },
      { month: 'Oct 08', mrr: 4320, collected: 4100, target: 4500 },
      { month: 'Oct 15', mrr: 4410, collected: 4250, target: 4500 },
      { month: 'Oct 22', mrr: 4450, collected: 4380, target: 4500 },
      { month: 'Oct 31', mrr: 4490, collected: 4420, target: 4500 },
    ],
    quarter: [
      { month: 'Aug 2026', mrr: 3800, collected: 3450, target: 4000 },
      { month: 'Sep 2026', mrr: 4150, collected: 3950, target: 4200 },
      { month: 'Oct 2026', mrr: 4490, collected: 4420, target: 4500 },
    ],
    year: [
      { month: 'Jan', mrr: 2400, collected: 2100, target: 2500 },
      { month: 'Feb', mrr: 2650, collected: 2400, target: 2800 },
      { month: 'Mar', mrr: 2900, collected: 2750, target: 3000 },
      { month: 'Apr', mrr: 3100, collected: 2950, target: 3300 },
      { month: 'May', mrr: 3350, collected: 3100, target: 3500 },
      { month: 'Jun', mrr: 3500, collected: 3400, target: 3800 },
      { month: 'Jul', mrr: 3680, collected: 3550, target: 4000 },
      { month: 'Aug', mrr: 3800, collected: 3700, target: 4200 },
      { month: 'Sep', mrr: 4150, collected: 4000, target: 4300 },
      { month: 'Oct', mrr: 4490, collected: 4420, target: 4500 },
    ],
    all: [
      { month: 'Q1 25', mrr: 1400, collected: 1300, target: 1500 },
      { month: 'Q2 25', mrr: 1800, collected: 1700, target: 2000 },
      { month: 'Q3 25', mrr: 2100, collected: 2000, target: 2200 },
      { month: 'Q4 25', mrr: 2400, collected: 2300, target: 2500 },
      { month: 'Q1 26', mrr: 2900, collected: 2750, target: 3000 },
      { month: 'Q2 26', mrr: 3500, collected: 3400, target: 3800 },
      { month: 'Q3 26', mrr: 4150, collected: 4000, target: 4300 },
      { month: 'Q4 26', mrr: 4490, collected: 4420, target: 4500 },
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

  // Custom Dark Espresso tooltip
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
                {formatCurrency(entry.value)}
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
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-blush/60">
        <div>
          <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
            Monthly Revenue &amp; Collections
          </h3>
          <p className="text-[11px] text-stone-grey mt-0.5">
            Recognized recurring revenue (MRR) vs. actual cash settlements
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-ivory border border-blush text-[11px] font-semibold">
          <button
            onClick={() => setMetricView('both')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              metricView === 'both'
                ? 'bg-white text-espresso shadow-xs font-bold'
                : 'text-stone-grey hover:text-espresso'
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => setMetricView('mrr')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              metricView === 'mrr'
                ? 'bg-crimson text-white shadow-xs font-bold'
                : 'text-stone-grey hover:text-espresso'
            }`}
          >
            MRR Only
          </button>
          <button
            onClick={() => setMetricView('collected')}
            className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
              metricView === 'collected'
                ? 'bg-burgundy text-white shadow-xs font-bold'
                : 'text-stone-grey hover:text-espresso'
            }`}
          >
            Collections
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Crimson Gradient */}
              <linearGradient id="crimsonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D93645" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D93645" stopOpacity={0.0} />
              </linearGradient>

              {/* Burgundy Gradient */}
              <linearGradient id="burgundyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#541415" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#541415" stopOpacity={0.0} />
              </linearGradient>
            </defs>

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
              tickFormatter={(v) => `$${v}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
            />

            {(metricView === 'both' || metricView === 'mrr') && (
              <Area
                type="monotone"
                dataKey="mrr"
                name="Monthly Recurring Revenue"
                stroke="#D93645"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#crimsonGradient)"
              />
            )}

            {(metricView === 'both' || metricView === 'collected') && (
              <Area
                type="monotone"
                dataKey="collected"
                name="Cash Collected"
                stroke="#541415"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#burgundyGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
