'use client';

import React from 'react';
import {
  CheckCircle2,
  Layers,
  Receipt,
  TrendingUp,
  Sparkles,
  Briefcase,
  Calendar,
  Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectTimelineView() {
  const timelinePhases = [
    { num: 1, name: 'Phase 1', desc: 'Frontend Foundation', date: 'Oct 2026', current: true },
    { num: 2, name: 'Phase 2', desc: 'Core Modules', date: 'Nov 2026', current: false },
    { num: 3, name: 'Phase 3', desc: 'Finance Engine', date: 'Nov 2026', current: false },
    { num: 4, name: 'Phase 4', desc: 'AI Intelligence', date: 'Dec 2026', current: false },
    { num: 5, name: 'Phase 5', desc: 'Backend Integration', date: 'Dec 2026', current: false },
    { num: 6, name: 'Phase 6', desc: 'Testing & Demo', date: 'Dec 2026', current: false },
  ];

  const phaseTasks = [
    { name: 'Project Setup & Initialization', date: '31 Oct 2026', status: 'completed' },
    { name: 'Install Dependencies', date: '31 Oct 2026', status: 'completed' },
    { name: 'Configure Design System', date: '31 Oct 2026', status: 'completed' },
    { name: 'Setup Folder Structure', date: '31 Oct 2026', status: 'completed' },
    { name: 'Define TypeScript Types', date: '31 Oct 2026', status: 'completed' },
    { name: 'Create Layout (Sidebar + Topbar)', date: '31 Oct 2026', status: 'completed' },
    { name: 'Dashboard Implementation', date: '31 Oct 2026', status: 'completed' },
    { name: 'Responsive Testing', date: '31 Oct 2026', status: 'completed' },
  ];

  const recentActivity = [
    { time: '01:33 PM', text: 'Created project repository and structure', date: '31 Oct 2026' },
    { time: '01:40 PM', text: 'Added documentation files (architecture, schema, contracts)', date: '31 Oct 2026' },
    { time: '01:45 PM', text: 'Initialized Next.js 15 project with React 19', date: '31 Oct 2026' },
    { time: '02:10 PM', text: 'Installed core dependencies (lucide, recharts, tailwind-merge)', date: '31 Oct 2026' },
    { time: '02:25 PM', text: 'Configured official SUBSENSE 3D ribbon design system', date: '31 Oct 2026' },
  ];

  const keyFeatures = [
    { title: 'Subscription Management', desc: 'Products, Multi-variants, Plans, Customers', icon: Layers },
    { title: 'Automated Billing', desc: 'Invoices, Recurring runs, Taxes, Discounts', icon: Receipt },
    { title: 'Revenue Intelligence', desc: 'MRR tracking, Reporting, Forecasting', icon: TrendingUp },
    { title: 'AI Insights', desc: 'Renewal Risk, Health Score, Anomalies', icon: Sparkles },
    { title: 'Business Intelligence', desc: 'Smarter Decisions, Sustainable Growth', icon: Briefcase },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Metadata Cards (Image 2 left cards layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-4 bg-[#181312] border border-white/10 flex items-center gap-3.5">
          <div className="p-3 rounded-lg bg-white/5 text-crimson border border-white/10">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-grey">Project Start</p>
            <p className="text-sm font-bold text-white mt-0.5">31 OCT 2026</p>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-gradient-to-r from-[#2B1516] to-[#181312] border border-crimson/40 flex items-center gap-3.5 shadow-lg shadow-crimson/10">
          <div className="p-3 rounded-lg bg-crimson/20 text-crimson-bright border border-crimson/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-crimson-bright">Current Phase</p>
            <p className="text-sm font-black text-white mt-0.5">Phase 1: Frontend Foundation</p>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-[#181312] border border-white/10 flex items-center gap-3.5">
          <div className="p-3 rounded-lg bg-white/5 text-burgundy-light border border-white/10">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-grey">Target Demo</p>
            <p className="text-sm font-bold text-white mt-0.5">12 HOURS (Phase 1 Verified)</p>
          </div>
        </div>
      </div>

      {/* Horizontal Project Timeline (Image 2 Timeline Stepper) */}
      <div className="rounded-xl bg-[#161211] border border-white/10 p-6">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            PROJECT TIMELINE
          </h3>
          <span className="text-[11px] font-mono text-stone-grey">AY 2026 — 2027</span>
        </div>

        {/* Stepper with connecting line */}
        <div className="relative">
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-white/10 -z-0" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
            {timelinePhases.map((phase) => (
              <div key={phase.num} className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-transform duration-300',
                    phase.current
                      ? 'bg-crimson text-white ring-4 ring-crimson/20 scale-110 shadow-lg shadow-crimson/40'
                      : 'bg-[#221C1A] text-stone-grey border border-white/10'
                  )}
                >
                  {phase.num}
                </div>
                <p className={cn('text-xs font-bold', phase.current ? 'text-crimson' : 'text-white')}>
                  {phase.name}
                </p>
                <p className="text-[10.5px] text-stone-grey mt-0.5">{phase.desc}</p>
                <span className="text-[9.5px] text-stone-grey/70 font-mono mt-1">{phase.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Phase Tasks & Tech Stack & Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phase 1 Tasks Checklist */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                PHASE 1 TASKS
              </h4>
              <p className="text-[10.5px] text-stone-grey mt-0.5">8 / 8 Completed</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-crimson">100%</span>
              <div className="w-16 h-1.5 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-crimson w-full rounded-full" />
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {phaseTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5 text-xs hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-crimson shrink-0" />
                  <span className="text-white font-medium text-[11.5px]">{task.name}</span>
                </div>
                <span className="text-[10px] text-stone-grey font-mono shrink-0">
                  {task.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Cards */}
        <div className="rounded-xl bg-[#161211] border border-white/10 p-5">
          <div className="pb-3 border-b border-white/10 mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              KEY MODULES &amp; CAPABILITIES
            </h4>
            <p className="text-[10.5px] text-stone-grey mt-0.5">Built per Brightloop Software specifications</p>
          </div>

          <div className="space-y-2.5">
            {keyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-start gap-3 hover:border-crimson/30 transition-colors"
                >
                  <div className="p-2 rounded bg-crimson/15 text-crimson shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{feat.title}</h5>
                    <p className="text-[10.5px] text-stone-grey mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Status Gauge & Recent Activity */}
        <div className="space-y-6">
          {/* Status Donut Card */}
          <div className="rounded-xl bg-[#161211] border border-white/10 p-5">
            <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                PROJECT STATUS
              </h4>
              <span className="text-[10px] font-bold text-crimson uppercase tracking-wider">
                Phase 1 Complete
              </span>
            </div>

            <div className="flex items-center justify-around py-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* SVG circular progress */}
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="38"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="38"
                    stroke="#D93645"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="238.76"
                    strokeDashoffset="167" // 30% overall progress
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-black text-white font-mono">30%</span>
                  <span className="text-[8px] uppercase text-stone-grey font-bold">Overall</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-crimson" />
                  <span className="text-stone-grey text-[11px]">Completed: <strong className="text-white">8 Tasks</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-burgundy-light" />
                  <span className="text-stone-grey text-[11px]">In Progress: <strong className="text-white">Phase 2</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-stone-grey text-[11px]">Pending: <strong className="text-white">5 Phases</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-stone-grey font-semibold text-[11px]">Assigned Team:</span>
              <span className="font-extrabold text-crimson tracking-widest text-[11px]">SENTINELS</span>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="rounded-xl bg-[#161211] border border-white/10 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10 mb-3">
              RECENT ACTIVITY
            </h4>
            <div className="space-y-2.5">
              {recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-[11px] truncate">{act.text}</p>
                    <span className="text-[10px] text-stone-grey font-mono">{act.time} · {act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
