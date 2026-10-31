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
    <header className="h-16 bg-white border-b border-blush px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-espresso hover:bg-ivory border border-blush lg:hidden cursor-pointer shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-grey min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-espresso transition-colors shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-stone-grey" />
            <span className="hidden sm:inline font-medium">Dashboard</span>
          </Link>

          {breadcrumbItems.length > 0 &&
            breadcrumbItems.map((item, idx) => (
              <React.Fragment key={item.href}>
                <ChevronRight className="w-3.5 h-3.5 text-stone-grey/50 shrink-0" />
                {idx === breadcrumbItems.length - 1 ? (
                  <span className="font-bold text-espresso truncate">
                    {item.title}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-espresso truncate transition-colors"
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
        <div className="relative w-44 md:w-64 hidden sm:block">
          <Search className="w-3.5 h-3.5 text-stone-grey absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search subscriptions, customers..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-ivory rounded-lg border border-blush text-espresso placeholder:text-stone-grey focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson"
          />
        </div>

        {/* Role Indicator Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-ivory rounded-lg border border-blush text-xs hidden md:flex">
          {currentRole === 'ADMIN' ? (
            <Shield className="w-3.5 h-3.5 text-crimson" />
          ) : currentRole === 'STAFF' ? (
            <Sparkles className="w-3.5 h-3.5 text-burgundy" />
          ) : (
            <Building2 className="w-3.5 h-3.5 text-stone-grey" />
          )}
          <span className="text-[10px] font-extrabold tracking-wider text-espresso">
            {currentRole}
          </span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-stone-grey hover:text-espresso hover:bg-ivory border border-transparent hover:border-blush transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-espresso" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson ring-2 ring-white" />
          )}
        </button>

        {/* User Profile Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-2 border-l border-blush hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy to-crimson text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold text-espresso leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-stone-grey font-mono">
                {currentUser.companyName || 'Brightloop'}
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
