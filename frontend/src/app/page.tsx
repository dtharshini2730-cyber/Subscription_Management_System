'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Repeat,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { PageHeader, DatePeriod } from '@/components/dashboard/PageHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { SubscriptionChart } from '@/components/dashboard/SubscriptionChart';
import { RevenueBreakdown } from '@/components/dashboard/RevenueBreakdown';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { UpcomingRenewals } from '@/components/dashboard/UpcomingRenewals';
import { RenewalRiskOverview } from '@/components/dashboard/RenewalRiskOverview';
import { SubscriptionHealthSummary } from '@/components/dashboard/SubscriptionHealthSummary';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { exportRevenueReportCsv } from '@/lib/exportCsv';
import { mockSubscriptions, mockInvoices, mockPayments } from '@/data';

export default function DashboardPage() {
  const [period, setPeriod] = useState<DatePeriod>('year');
  const [isExporting, setIsExporting] = useState(false);

  // Period-adjusted KPI metrics
  const kpiData: Record<
    DatePeriod,
    {
      revenue: string;
      revenueChange: string;
      revenueComparison: string;
      activeSubs: string;
      subsChange: string;
      subsComparison: string;
      outstanding: string;
      outstandingChange: string;
      outstandingComparison: string;
      overdue: string;
      overdueBadge: string;
      overdueComparison: string;
    }
  > = {
    '30d': {
      revenue: '$22,862.40',
      revenueChange: '+8.2%',
      revenueComparison: '+$1,740 vs last 30d',
      activeSubs: '142 Accounts',
      subsChange: '+3.5%',
      subsComparison: '+5 net activations',
      outstanding: '$22,862.40',
      outstandingChange: '1 Invoice',
      outstandingComparison: 'Due within 15 days',
      overdue: '$6,495.00',
      overdueBadge: 'Critical',
      overdueComparison: '1 invoice > 15 days',
    },
    quarter: {
      revenue: '$45,840.00',
      revenueChange: '+14.6%',
      revenueComparison: '+$5,820 vs last quarter',
      activeSubs: '142 Accounts',
      subsChange: '+9.2%',
      subsComparison: '+12 net activations',
      outstanding: '$22,862.40',
      outstandingChange: '-2.1%',
      outstandingComparison: 'Receivables stable',
      overdue: '$6,495.00',
      overdueBadge: 'Action Req',
      overdueComparison: '2 accounts overdue',
    },
    year: {
      revenue: '$58,372.40',
      revenueChange: '+18.4%',
      revenueComparison: '+$9,082 vs prior period',
      activeSubs: '142 Accounts',
      subsChange: '+12.5%',
      subsComparison: '+16 net new accounts',
      outstanding: '$22,862.40',
      outstandingChange: '4 Invoices',
      outstandingComparison: 'Active billing run',
      overdue: '$6,495.00',
      overdueBadge: 'Follow-up',
      overdueComparison: '2 invoices overdue',
    },
    all: {
      revenue: '$148,290.00',
      revenueChange: '+32.1%',
      revenueComparison: 'All-time platform growth',
      activeSubs: '142 Accounts',
      subsChange: '+42.0%',
      subsComparison: 'Portfolio baseline',
      outstanding: '$22,862.40',
      outstandingChange: 'Current',
      outstandingComparison: 'Receivables under review',
      overdue: '$6,495.00',
      overdueBadge: 'Review',
      overdueComparison: 'Historical overdue total',
    },
  };

  const currentKpi = kpiData[period];

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportRevenueReportCsv({
        subscriptions: mockSubscriptions,
        invoices: mockInvoices,
        payments: mockPayments,
      });
      setIsExporting(false);
    }, 600);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
        {/* Page Header */}
        <PageHeader
          title="Business Overview"
          description="Monitor your subscription portfolio, recurring cash flow, and automated billing engine."
          currentPeriod={period}
          onPeriodChange={setPeriod}
          onExportReport={handleExportReport}
          isExporting={isExporting}
        />

        {/* 4 Core KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <MetricCard
            title="Total Revenue"
            value={currentKpi.revenue}
            change={currentKpi.revenueChange}
            isPositive={true}
            comparisonText={currentKpi.revenueComparison}
            icon={DollarSign}
            accentColor="crimson"
          />
          <MetricCard
            title="Active Subscriptions"
            value={currentKpi.activeSubs}
            change={currentKpi.subsChange}
            isPositive={true}
            comparisonText={currentKpi.subsComparison}
            icon={Repeat}
            accentColor="burgundy"
          />
          <MetricCard
            title="Outstanding Amount"
            value={currentKpi.outstanding}
            change={currentKpi.outstandingChange}
            isPositive={false}
            comparisonText={currentKpi.outstandingComparison}
            icon={Clock}
            accentColor="espresso"
          />
          <MetricCard
            title="Overdue Invoices"
            value={currentKpi.overdue}
            badgeLabel={currentKpi.overdueBadge}
            isPositive={false}
            comparisonText={currentKpi.overdueComparison}
            icon={AlertTriangle}
            accentColor="stone"
          />
        </div>

        {/* Primary Visualizations Row: Revenue & Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart period={period} />
          <SubscriptionChart period={period} />
        </div>

        {/* Secondary Row: Revenue Breakdown & Upcoming Renewals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueBreakdown />
          <UpcomingRenewals />
        </div>

        {/* Transactions Ledger Row */}
        <RecentTransactions />

        {/* Intelligence & Health Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RenewalRiskOverview />
          <SubscriptionHealthSummary />
        </div>

        {/* Operational Activity Stream */}
        <ActivityFeed />
      </div>
    </DashboardShell>
  );
}
