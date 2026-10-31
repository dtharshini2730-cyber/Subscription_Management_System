'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Settings,
  Lock,
  LogOut,
} from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const router = useRouter();
  const { currentUser, currentRole, logout } = useAuth();

  if (!isOpen || !currentUser) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 top-12 mt-2 w-72 rounded-xl bg-white border border-blush shadow-xl py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
        {/* User Card */}
        <div className="px-4 py-3 border-b border-blush/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-burgundy to-crimson text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-espresso truncate">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-stone-grey truncate font-mono">
                {currentUser.email}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-crimson/10 text-crimson border border-crimson/20">
                  {currentRole} Role
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="p-1 text-xs">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-espresso hover:bg-ivory transition-colors"
          >
            <Settings className="w-4 h-4 text-stone-grey" />
            <span>Account Settings</span>
          </Link>
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-espresso hover:bg-ivory transition-colors"
          >
            <Lock className="w-4 h-4 text-stone-grey" />
            <span>Password &amp; Security</span>
          </Link>
          <button
            onClick={() => {
              logout();
              onClose();
              router.replace('/login');
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-crimson hover:bg-red-50 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
