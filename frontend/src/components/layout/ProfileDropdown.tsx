'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import {
  Settings,
  Lock,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const { currentUser, currentRole, switchRole } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div
        className="absolute right-0 top-12 mt-2 w-72 rounded-xl py-2 z-40 animate-in fade-in zoom-in-95 duration-150"
        style={{
          background: '#EDE6DF',
          border: '1px solid #DDD0C9',
          boxShadow: '0 8px 32px rgba(53,44,41,0.18), 0 2px 8px rgba(53,44,41,0.10)',
        }}
      >
        {/* User Card */}
        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(53,44,41,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-burgundy to-crimson text-ivory flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
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
                <span
                  className="text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full text-crimson"
                  style={{ background: 'rgba(217,54,69,0.10)', border: '1px solid rgba(217,54,69,0.2)' }}
                >
                  {currentRole} Role
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Persona Quick Switcher */}
        <div
          className="p-3"
          style={{ borderBottom: '1px solid rgba(53,44,41,0.10)', background: 'rgba(53,44,41,0.04)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-grey mb-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-crimson" />
            <span>Switch Active Persona</span>
          </p>
          <div
            className="grid grid-cols-3 gap-1 p-1 rounded-lg text-[10px] text-center font-medium"
            style={{ background: 'rgba(53,44,41,0.06)', border: '1px solid rgba(53,44,41,0.08)' }}
          >
            {(['ADMIN', 'STAFF', 'CUSTOMER'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => {
                  switchRole(role);
                  onClose();
                }}
                className={cn(
                  'py-1 rounded cursor-pointer transition-colors capitalize font-semibold',
                  currentRole === role
                    ? 'bg-crimson text-ivory shadow-sm'
                    : 'text-stone-grey-dark hover:text-espresso hover:bg-white/40'
                )}
              >
                {role.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation links */}
        <div className="p-1 text-xs">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-espresso transition-colors hover:bg-espresso/8"
          >
            <Settings className="w-4 h-4 text-stone-grey" />
            <span>Account Settings</span>
          </Link>
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-espresso transition-colors hover:bg-espresso/8"
          >
            <Lock className="w-4 h-4 text-stone-grey" />
            <span>Password &amp; Security</span>
          </Link>
          <button
            onClick={() => {
              alert('Sign out simulated in Phase 2 demo!');
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-crimson transition-colors text-left cursor-pointer"
            style={{ ':hover': { background: 'rgba(217,54,69,0.08)' } } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(217,54,69,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
