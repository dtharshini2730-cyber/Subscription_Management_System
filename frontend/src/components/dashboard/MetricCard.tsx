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
  // Icon container themes — all use warm-tinted surfaces
  const iconThemes = {
    crimson: {
      bg: 'text-crimson',
      iconBg: 'rgba(217,54,69,0.12)',
      iconBorder: 'rgba(217,54,69,0.2)',
    },
    burgundy: {
      bg: 'text-burgundy-light',
      iconBg: 'rgba(84,20,21,0.12)',
      iconBorder: 'rgba(84,20,21,0.2)',
    },
    espresso: {
      bg: 'text-espresso',
      iconBg: 'rgba(53,44,41,0.10)',
      iconBorder: 'rgba(53,44,41,0.15)',
    },
    stone: {
      bg: 'text-stone-grey-dark',
      iconBg: 'rgba(157,150,149,0.12)',
      iconBorder: 'rgba(157,150,149,0.2)',
    },
    emerald: {
      bg: 'text-emerald-700',
      iconBg: 'rgba(16,185,129,0.10)',
      iconBorder: 'rgba(16,185,129,0.18)',
    },
  };

  const theme = iconThemes[accentColor];

  return (
    <div
      onClick={onClick}
      className={cn(
        'editorial-card rounded-xl p-5 relative overflow-hidden group',
        onClick && 'cursor-pointer hover:-translate-y-0.5'
      )}
    >
      {/* Subtle corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.04] pointer-events-none"
        style={{ background: accentColor === 'crimson' ? '#D93645' : accentColor === 'burgundy' ? '#541415' : '#352C29' }}
      />

      {/* Top row: Title and Icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-stone-grey-dark uppercase tracking-[0.12em]">
            {title}
          </p>
          <p className="text-2xl lg:text-[2rem] font-extrabold text-espresso mt-2 tracking-tight font-sans leading-none">
            {value}
          </p>
        </div>
        <div
          className={cn(
            'p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-105 shrink-0',
            theme.bg
          )}
          style={{
            background: theme.iconBg,
            border: `1px solid ${theme.iconBorder}`,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom row: Trend & Comparison */}
      <div
        className="mt-4 pt-3 flex items-center justify-between text-xs gap-2 flex-wrap"
        style={{ borderTop: '1px solid rgba(53,44,41,0.1)' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {change && (
            <span
              className={cn(
                'inline-flex items-center font-bold px-2 py-0.5 rounded-full text-[11px]',
                isPositive
                  ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                  : 'text-crimson border border-crimson/25'
              )}
              style={!isPositive ? { background: 'rgba(217,54,69,0.09)' } : undefined}
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
          <span
            className="text-[10px] font-bold uppercase tracking-wider text-stone-grey px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(53,44,41,0.07)', border: '1px solid rgba(53,44,41,0.1)' }}
          >
            {badgeLabel}
          </span>
        )}
      </div>
    </div>
  );
}
