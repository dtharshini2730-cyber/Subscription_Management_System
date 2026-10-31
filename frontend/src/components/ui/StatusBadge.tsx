import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'ACTIVE'
  | 'DRAFT'
  | 'QUOTATION'
  | 'CONFIRMED'
  | 'CLOSED'
  | 'PAID'
  | 'CANCELLED'
  | 'OVERDUE'
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW'
  | 'CRITICAL'
  | 'EXCELLENT'
  | 'GOOD'
  | 'FAIR'
  | 'AT_RISK';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({
  status,
  size = 'md',
  className,
  showDot = true,
}: StatusBadgeProps) {
  const normalized = (status || '').toUpperCase() as StatusType;

  // Curated color mappings using Warm Ivory, Crimson, Deep Burgundy, and Emerald
  const styles: Record<
    string,
    { bg: string; text: string; border: string; dot: string }
  > = {
    ACTIVE: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    PAID: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    COMPLETED: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    EXCELLENT: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    CONFIRMED: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
    QUOTATION: {
      bg: 'bg-blush-soft',
      text: 'text-burgundy',
      border: 'border-burgundy/20',
      dot: 'bg-burgundy',
    },
    DRAFT: {
      bg: 'bg-stone-grey/10',
      text: 'text-stone-grey-dark',
      border: 'border-stone-grey/30',
      dot: 'bg-stone-grey',
    },
    CLOSED: {
      bg: 'bg-stone-grey/10',
      text: 'text-stone-grey-dark',
      border: 'border-stone-grey/30',
      dot: 'bg-stone-grey',
    },
    CANCELLED: {
      bg: 'bg-stone-grey/10',
      text: 'text-stone-grey-dark',
      border: 'border-stone-grey/30',
      dot: 'bg-stone-grey',
    },
    OVERDUE: {
      bg: 'bg-red-50',
      text: 'text-crimson',
      border: 'border-crimson/30',
      dot: 'bg-crimson',
    },
    CRITICAL: {
      bg: 'bg-red-50',
      text: 'text-crimson',
      border: 'border-crimson/30',
      dot: 'bg-crimson',
    },
    FAILED: {
      bg: 'bg-red-50',
      text: 'text-crimson',
      border: 'border-crimson/30',
      dot: 'bg-crimson',
    },
    HIGH: {
      bg: 'bg-red-50',
      text: 'text-crimson',
      border: 'border-crimson/30',
      dot: 'bg-crimson',
    },
    MEDIUM: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    PENDING: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    FAIR: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    LOW: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
    GOOD: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
    AT_RISK: {
      bg: 'bg-red-50',
      text: 'text-crimson',
      border: 'border-crimson/30',
      dot: 'bg-crimson',
    },
  };

  const style = styles[normalized] || {
    bg: 'bg-stone-grey/10',
    text: 'text-espresso',
    border: 'border-stone-grey/25',
    dot: 'bg-stone-grey',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full border tracking-wide uppercase',
        style.bg,
        style.text,
        style.border,
        sizeClasses,
        className
      )}
    >
      {showDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', style.dot)}
        />
      )}
      <span>{status}</span>
    </span>
  );
}
