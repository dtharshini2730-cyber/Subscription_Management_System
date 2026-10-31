'use client';

import React, { useState } from 'react';
import { X, Bell, AlertCircle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'warning' | 'info';
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-01',
      title: 'Invoice Past Due (15 Days)',
      message: 'INV-2026-0842 for Apex Logistics ($22,862.40) requires payment follow-up.',
      time: '10m ago',
      read: false,
      type: 'alert',
    },
    {
      id: 'notif-02',
      title: 'Subscription Confirmed',
      message: 'Subscription SUB-2026-0102 for Lumina Creative Studio was confirmed.',
      time: '1h ago',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-03',
      title: 'High Renewal Risk Detected',
      message: 'AI assistant flagged Apex Logistics contract renewal due to unpaid invoices.',
      time: '3h ago',
      read: false,
      type: 'warning',
    },
    {
      id: 'notif-04',
      title: 'Billing Cycle Ready',
      message: 'November 1st automated recurring invoice run is scheduled and ready.',
      time: '5h ago',
      read: true,
      type: 'info',
    },
  ]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-crimson" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-burgundy" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-2xs animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Slide-in Flyout Panel */}
      <div className="fixed top-0 right-0 z-50 h-screen w-96 max-w-full bg-white border-l border-blush shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-blush flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-crimson/10 text-crimson">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
                Notifications
              </h3>
              <p className="text-[11px] text-stone-grey">
                {unreadCount} unread platform alert{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-grey hover:text-espresso hover:bg-ivory transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="px-5 py-2.5 bg-ivory/60 border-b border-blush flex items-center justify-between text-xs">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="text-[11px] font-semibold text-crimson hover:underline disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            Mark all as read
          </button>
          <button
            onClick={clearAll}
            className="text-[11px] font-medium text-stone-grey hover:text-espresso cursor-pointer"
          >
            Clear all
          </button>
        </div>

        {/* Notification Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-blush/60 opacity-70'
                    : 'bg-blush-soft/50 border-crimson/20 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-xs font-bold text-espresso truncate">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-stone-grey font-mono shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-grey-dark leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-xs text-stone-grey space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600/50 mx-auto" />
              <p className="font-semibold text-espresso">All caught up!</p>
              <p>No new notifications right now.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blush bg-ivory text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full text-xs"
          >
            Close Panel
          </Button>
        </div>
      </div>
    </>
  );
}
