'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { NotificationPanel } from './NotificationPanel';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, authError, retrySession } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !authError) {
      router.replace('/login');
    }
  }, [authError, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="text-sm text-stone-grey" role="status">Loading your SUBSENSE session...</p>
      </main>
    );
  }

  if (authError) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-ivory px-4">
        <section className="editorial-card w-full max-w-lg rounded-xl p-6 text-center">
          <h1 className="text-lg font-bold text-espresso">Unable to verify your session</h1>
          <p className="mt-2 text-sm text-crimson" role="alert">{authError}</p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => void retrySession()}
              className="rounded-lg bg-burgundy px-4 py-2 text-sm font-semibold text-white hover:bg-crimson"
            >
              Retry
            </button>
            <Link href="/login" className="rounded-lg border border-blush px-4 py-2 text-sm font-semibold text-espresso">
              Sign in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-ivory text-espresso">
      {/* Dark Espresso Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Workspace (Warm Ivory) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={3}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <p className="mb-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900" role="status">
            Authentication is connected to the backend. Business pages still show demo data because their API endpoints are not implemented yet.
          </p>
          {children}
        </main>
      </div>

      {/* Slide-out Notifications Panel */}
      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
