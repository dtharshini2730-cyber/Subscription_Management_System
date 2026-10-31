import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  comparisonText?: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: 'crimson' | 'burgundy' | 'espresso' | 'stone' | 'emerald';
  badgeLabel?: string;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  comparisonText,
  subtitle,
  icon: Icon,
  accentColor = 'crimson',
  badgeLabel,
  onClick,
}: MetricCardProps) {
  const iconThemes = {
    crimson: {
      bg: 'bg-red-50 text-crimson border-crimson/20',
      pill: 'bg-crimson/10 text-crimson',
    },
    burgundy: {
      bg: 'bg-burgundy/10 text-burgundy border-burgundy/20',
      pill: 'bg-burgundy/10 text-burgundy',
    },
    espresso: {
      bg: 'bg-espresso/10 text-espresso border-espresso/20',
      pill: 'bg-espresso/10 text-espresso',
    },
    stone: {
      bg: 'bg-stone-grey/15 text-stone-grey-dark border-stone-grey/25',
      pill: 'bg-stone-grey/15 text-stone-grey-dark',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pill: 'bg-emerald-50 text-emerald-800',
    },
  };

  const theme = iconThemes[accentColor];

  return (
    <div
      onClick={onClick}
      className={cn(
        'editorial-card rounded-xl p-5 relative overflow-hidden group',
        onClick && 'cursor-pointer hover:border-crimson/40 hover:-translate-y-0.5'
      )}
    >
      {/* Top row: Title and Icon */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-stone-grey uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-extrabold text-espresso mt-1.5 tracking-tight font-sans">
            {value}
          </p>
        </div>
        <div
          className={cn(
            'p-2.5 rounded-lg border transition-transform duration-200 group-hover:scale-105 shrink-0',
            theme.bg
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom row: Trend & Comparison */}
      <div className="mt-4 pt-3 border-t border-blush/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {change && (
            <span
              className={cn(
                'inline-flex items-center font-bold px-2 py-0.5 rounded-full text-[11px]',
                isPositive
                  ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                  : 'text-crimson bg-red-50 border border-crimson/20'
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {change}
            </span>
          )}
          {(comparisonText || subtitle) && (
            <span className="text-stone-grey text-[11px] font-medium truncate">
              {comparisonText || subtitle}
            </span>
          )}
        </div>

        {badgeLabel && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-grey px-1.5 py-0.5 rounded bg-ivory border border-blush">
            {badgeLabel}
          </span>
        )}
      </div>
    </div>
  );
}
