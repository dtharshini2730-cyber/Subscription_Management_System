'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SubsenseLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export function SubsenseLogo({
  className,
  variant = 'dark',
  size = 'md',
  showSubtitle = false,
}: SubsenseLogoProps) {
  // Sizing definitions matching the official 3D ribbon + logotype ratio
  const sizeConfig = {
    sm: { height: 28, width: 88, iconSize: 28, subText: 'text-[8px]' },
    md: { height: 38, width: 120, iconSize: 36, subText: 'text-[9.5px]' },
    lg: { height: 48, width: 152, iconSize: 46, subText: 'text-[11px]' },
    xl: { height: 60, width: 190, iconSize: 58, subText: 'text-[12px]' },
  }[size];

  if (variant === 'icon-only') {
    return (
      <div className={cn('relative inline-flex items-center justify-center shrink-0', className)}>
        <Image
          src="/logo/subsense-icon.png"
          alt="SUBSENSE"
          width={sizeConfig.iconSize}
          height={sizeConfig.iconSize}
          className="object-contain transition-transform group-hover:scale-105 duration-200"
          priority
        />
      </div>
    );
  }

  // Choose the official logo asset based on background context
  const logoSrc =
    variant === 'dark'
      ? '/logo/subsense-logo-dark.png'
      : '/logo/subsense-logo-light.png';

  return (
    <div className={cn('flex flex-col select-none group', className)}>
      <div className="relative inline-flex items-center">
        <Image
          src={logoSrc}
          alt="SUBSENSE"
          width={sizeConfig.width}
          height={sizeConfig.height}
          style={{ width: `${sizeConfig.width}px`, height: `${sizeConfig.height}px` }}
          className="object-contain transition-transform group-hover:scale-[1.02] duration-200"
          priority
        />
      </div>
      {showSubtitle && (
        <span
          className={cn(
            'uppercase font-semibold tracking-[0.25em] text-stone-grey mt-1 pl-1',
            sizeConfig.subText
          )}
        >
          Intelligent Revenue Platform
        </span>
      )}
    </div>
  );
}
