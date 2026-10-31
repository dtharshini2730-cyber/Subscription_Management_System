'use client';

import React, { useState } from 'react';
import { Calendar, Download, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export type DatePeriod = '30d' | 'quarter' | 'year' | 'all';

interface PageHeaderProps {
  title?: string;
  description?: string;
  currentPeriod: DatePeriod;
  onPeriodChange: (period: DatePeriod) => void;
  onExportReport: () => void;
  isExporting?: boolean;
}

export function PageHeader({
  title = 'Business Overview',
  description = 'Monitor your subscription business and revenue performance.',
  currentPeriod,
  onPeriodChange,
  onExportReport,
  isExporting = false,
}: PageHeaderProps) {
  const { currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const periodLabels: Record<DatePeriod, string> = {
    '30d': 'Last 30 Days',
    quarter: 'This Quarter',
    year: 'This Fiscal Year',
    all: 'All Time History',
  };

  const options: { id: DatePeriod; label: string }[] = [
    { id: '30d', label: 'Last 30 Days' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Fiscal Year' },
    { id: 'all', label: 'All Time History' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blush">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-crimson mb-1">
          {getGreeting()}, {currentUser?.name.split(' ')[0] ?? 'there'}
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-espresso tracking-tight">
          {title}
        </h1>
        <p className="text-xs md:text-sm text-stone-grey mt-1 max-w-2xl">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        {/* Date Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-blush text-xs font-semibold text-espresso hover:border-espresso/40 shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-crimson" />
            <span>{periodLabels[currentPeriod]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-grey" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-blush shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-stone-grey uppercase tracking-wider border-b border-blush/60">
                  Select Period
                </div>
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onPeriodChange(opt.id);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer',
                      currentPeriod === opt.id
                        ? 'bg-blush-soft text-crimson font-bold'
                        : 'text-espresso hover:bg-ivory'
                    )}
                  >
                    <span>{opt.label}</span>
                    {currentPeriod === opt.id && (
                      <Check className="w-3.5 h-3.5 text-crimson" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Export Report Button */}
        <Button
          variant="primary"
          size="md"
          onClick={onExportReport}
          isLoading={isExporting}
          className="shadow-sm crimson-glow"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>
    </div>
  );
}
