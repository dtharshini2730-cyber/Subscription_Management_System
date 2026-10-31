import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'default'
  | 'draft'
  | 'quotation'
  | 'confirmed'
  | 'active'
  | 'closed'
  | 'paid'
  | 'overdue'
  | 'crimson'
  | 'burgundy'
  | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-blush text-espresso border border-blush/60',
    draft: 'bg-ivory-dark text-stone-grey border border-stone-grey/30',
    quotation: 'bg-blush-soft text-burgundy border border-burgundy/20 font-medium',
    confirmed: 'bg-stone-grey/15 text-espresso border border-stone-grey/40 font-medium',
    active: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium',
    closed: 'bg-gray-100 text-gray-600 border border-gray-200',
    paid: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium',
    overdue: 'bg-red-50 text-crimson border border-crimson/30 font-semibold',
    crimson: 'bg-crimson text-white font-medium',
    burgundy: 'bg-burgundy text-white font-medium',
    outline: 'border border-stone-grey/40 text-espresso bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
