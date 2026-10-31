'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  Layers,
  FileText,
  Repeat,
  Receipt,
  CreditCard,
  Tag,
  Percent,
  LineChart,
  Bot,
  ShieldAlert,
  Activity,
  AlertTriangle,
  Settings,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { SubsenseLogo } from '@/components/ui/SubsenseLogo';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  roles?: UserRole[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { currentUser, currentRole } = useAuth();

  const sections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', href: '/', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Commercial Engine',
      items: [
        { label: 'Customers', href: '/customers', icon: Users, roles: ['ADMIN', 'STAFF'] },
        { label: 'Products', href: '/products', icon: Package, roles: ['ADMIN', 'STAFF'] },
        { label: 'Plans', href: '/plans', icon: Layers, roles: ['ADMIN', 'STAFF'] },
        { label: 'Quotations', href: '/quotations', icon: FileText, roles: ['ADMIN', 'STAFF'] },
        { label: 'Subscriptions', href: '/subscriptions', icon: Repeat, badge: 'Live' },
      ],
    },
    {
      title: 'Finance & Billing',
      items: [
        { label: 'Invoices', href: '/invoices', icon: Receipt },
        { label: 'Payments', href: '/payments', icon: CreditCard },
        { label: 'Discounts', href: '/discounts', icon: Tag, roles: ['ADMIN'] },
        { label: 'Taxes', href: '/taxes', icon: Percent, roles: ['ADMIN'] },
        { label: 'Analytics', href: '/analytics', icon: LineChart, roles: ['ADMIN', 'STAFF'] },
      ],
    },
    {
      title: 'Intelligence Suite',
      items: [
        { label: 'AI Assistant', href: '/intelligence/assistant', icon: Bot, badge: 'AI' },
        { label: 'Renewal Risk', href: '/intelligence/renewal-risk', icon: ShieldAlert },
        { label: 'Subscription Health', href: '/intelligence/health-score', icon: Activity },
        { label: 'Invoice Anomalies', href: '/intelligence/invoice-anomalies', icon: AlertTriangle },
      ],
    },
    {
      title: 'System',
      items: [
        { label: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#27201E] text-[#F5F1ED] flex flex-col shrink-0 border-r border-[#E8DAD5]/10 transition-transform duration-200 ease-in-out select-none shadow-xl lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#E8DAD5]/10 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="block">
            <SubsenseLogo size="lg" variant="dark" />
          </Link>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-grey hover:text-white hover:bg-white/10 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 sidebar-scroll">
          {sections.map((section, sIdx) => {
            const visibleItems = section.items.filter(
              (item) => !item.roles || (currentRole !== null && item.roles.includes(currentRole))
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={sIdx} className="space-y-1">
                <p className="px-3 text-[10px] font-bold tracking-[0.18em] text-[#9D9695] uppercase">
                  {section.title}
                </p>

                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all group',
                        isActive
                          ? 'bg-[#541415] text-white border border-[#D93645]/40 shadow-xs'
                          : 'text-[#D4D0CE] hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={cn(
                            'w-4 h-4 shrink-0 transition-colors',
                            isActive ? 'text-[#D93645]' : 'text-[#9D9695] group-hover:text-white'
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase tracking-wider',
                            item.badge === 'AI'
                              ? 'bg-[#D93645]/25 text-[#FF4D5E] border border-[#D93645]/40'
                              : 'bg-white/10 text-stone-grey-light'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        {currentUser && (
        <div className="p-3 m-3 rounded-xl bg-[#1D1715] border border-white/5">
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#541415] to-[#D93645] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden leading-tight min-w-0">
              <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-[#9D9695] truncate font-mono">{currentUser.email}</p>
            </div>
          </div>
        </div>
        )}
      </aside>
    </>
  );
}
