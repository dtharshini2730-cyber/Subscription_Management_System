'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  Shield,
  Sparkles,
  Building2,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileDropdown } from './ProfileDropdown';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export function Navbar({
  onToggleSidebar,
  onOpenNotifications,
  unreadCount = 2,
}: NavbarProps) {
  const pathname = usePathname();
  const { currentUser, currentRole } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Generate dynamic breadcrumbs from path
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const title = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { title, href };
  });

  return (
    <header
      className="h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20"
      style={{
        background: '#2E2522',
        borderBottom: '1px solid rgba(232,218,213,0.10)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      }}
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-stone-grey hover:text-ivory hover:bg-white/10 lg:hidden cursor-pointer shrink-0 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-grey min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-ivory transition-colors shrink-0"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium text-stone-grey-light">Dashboard</span>
          </Link>

          {breadcrumbItems.length > 0 &&
            breadcrumbItems.map((item, idx) => (
              <React.Fragment key={item.href}>
                <ChevronRight className="w-3.5 h-3.5 text-stone-grey/40 shrink-0" />
                {idx === breadcrumbItems.length - 1 ? (
                  <span className="font-bold text-ivory/90 truncate">
                    {item.title}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-ivory truncate transition-colors text-stone-grey"
                  >
                    {item.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
        </nav>
      </div>

      {/* Right: Search, Role Badge, Notifications & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Search Field */}
        <div className="relative w-44 md:w-60 hidden sm:block">
          <Search className="w-3.5 h-3.5 text-stone-grey absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search subscriptions, customers..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg text-ivory/80 placeholder:text-stone-grey/70 focus:outline-none focus:ring-1 focus:ring-crimson transition-colors"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(232,218,213,0.15)',
            }}
          />
        </div>

        {/* Role Indicator Badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs hidden md:flex"
          style={{
            background: 'rgba(84,20,21,0.35)',
            border: '1px solid rgba(217,54,69,0.25)',
          }}
        >
          {currentRole === 'ADMIN' ? (
            <Shield className="w-3.5 h-3.5 text-crimson" />
          ) : currentRole === 'STAFF' ? (
            <Sparkles className="w-3.5 h-3.5 text-blush" />
          ) : (
            <Building2 className="w-3.5 h-3.5 text-stone-grey" />
          )}
          <span className="text-[10px] font-extrabold tracking-wider text-blush/90">
            {currentRole}
          </span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-stone-grey hover:text-ivory hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson"
              style={{ boxShadow: '0 0 0 2px #2E2522' }}
            />
          )}
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-white/10 hidden lg:block" />

        {/* User Profile Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy to-crimson text-ivory flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold text-ivory/90 leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-stone-grey font-mono">
                {currentUser.companyName || 'Brightloop Software'}
              </p>
            </div>
          </button>

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
