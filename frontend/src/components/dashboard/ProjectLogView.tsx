'use client';

import React from 'react';
import Image from 'next/image';
import {
  Calendar,
  Flag,
  Users2,
  CheckCircle2,
  Circle,
  Monitor,
  Layers,
  FileSpreadsheet,
  BrainCircuit,
  Server,
  Rocket,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectLogViewProps {
  onSwitchToOperations: () => void;
  onSwitchToTimeline: () => void;
}

export function ProjectLogView({ onSwitchToOperations, onSwitchToTimeline }: ProjectLogViewProps) {
  const phases = [
    {
      num: '01',
      title: 'Frontend Foundation',
      icon: Monitor,
      status: 'active',
      items: [
        { name: 'Project setup', done: true },
        { name: 'Design system', done: true },
        { name: 'Core architecture', done: true },
        { name: 'Dashboard UI', done: true },
      ],
    },
    {
      num: '02',
      title: 'Core Modules',
      icon: Layers,
      status: 'ready',
      items: [
        { name: 'Customers', done: false },
        { name: 'Products & Plans', done: false },
        { name: 'Quotations', done: false },
        { name: 'Subscriptions', done: false },
      ],
    },
    {
      num: '03',
      title: 'Finance Engine',
      icon: FileSpreadsheet,
      status: 'pending',
      items: [
        { name: 'Taxes & Discounts', done: false },
        { name: 'Invoices', done: false },
        { name: 'Payments', done: false },
        { name: 'Reporting & Analytics', done: false },
      ],
    },
    {
      num: '04',
      title: 'AI Intelligence',
      icon: BrainCircuit,
      status: 'pending',
      items: [
        { name: 'Renewal Risk', done: false },
        { name: 'Health Score', done: false },
        { name: 'Invoice Anomalies', done: false },
        { name: 'AI Assistant', done: false },
      ],
    },
    {
      num: '05',
      title: 'Backend Integration',
      icon: Server,
      status: 'future',
      items: [
        { name: 'FastAPI', done: false },
        { name: 'PostgreSQL', done: false },
        { name: 'Authentication', done: false },
        { name: 'API Integration', done: false },
      ],
    },
    {
      num: '06',
      title: 'Testing & Demo',
      icon: Rocket,
      status: 'future',
      items: [
        { name: 'End-to-end Testing', done: false },
        { name: 'Bug Fixes', done: false },
        { name: 'Final Deployment', done: false },
        { name: 'Presentation Prep', done: false },
      ],
    },
  ];

  const techStack = [
    { name: 'Next.js 15', icon: 'N' },
    { name: 'React 19', icon: '⚛' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Tailwind CSS', icon: '≈' },
    { name: 'Lucide React', icon: '✦' },
    { name: 'Recharts', icon: '⫯' },
  ];

  const futureStack = [
    { name: 'FastAPI', icon: '⚡' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Ollama (Optional)', icon: '🦙' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Visual Panel (Image 1 central centerpiece) */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#161211] min-h-[460px] flex flex-col justify-between p-8 md:p-12 shadow-2xl">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-art.jpg"
            alt="SUBSENSE Celestial Portal Arch"
            fill
            className="object-cover object-center opacity-70 mix-blend-luminosity brightness-90 contrast-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C] via-[#0F0D0C]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C] via-transparent to-black/40" />
        </div>

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-stone-grey">
            INTELLIGENT SUBSCRIPTION &amp; REVENUE MANAGEMENT PLATFORM
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToOperations}
              className="px-3.5 py-1.5 rounded-lg bg-crimson hover:bg-crimson-hover text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-lg shadow-crimson/30 flex items-center gap-1.5 cursor-pointer"
            >
              Launch Live App
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onSwitchToTimeline}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-ivory text-xs font-semibold tracking-wider uppercase transition-all border border-white/10 cursor-pointer"
            >
              Task Matrix
            </button>
          </div>
        </div>

        {/* Central Bold Typography */}
        <div className="relative z-10 my-auto py-8 max-w-2xl">
          <div className="flex items-baseline gap-3 mb-1">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              SUB<span className="text-crimson">SENSE</span>
            </h1>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-[0.18em] text-stone-grey-light uppercase mb-4">
            PROJECT LOG
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs font-bold tracking-[0.2em] text-stone-grey uppercase">
            <span>IDEAS</span>
            <span className="text-crimson">/</span>
            <span>EXECUTION</span>
            <span className="text-crimson">/</span>
            <span>PROGRESS</span>
            <span className="text-crimson">/</span>
            <span>IMPACT</span>
          </div>

          <p className="text-xs text-stone-grey tracking-wider uppercase mt-4 max-w-md font-medium">
            A detailed journey of building something meaningful.
          </p>
        </div>

        {/* Floating Callout (From Idea to Impact) */}
        <div className="relative z-10 hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-grey leading-relaxed">
            FROM<br />IDEA<br />TO<br />IMPACT
          </p>
          <div className="w-6 h-0.5 bg-crimson ml-auto mt-2" />
        </div>
      </div>

      {/* Current Phase Status Banner (Image 1 horizontal banner) */}
      <div className="rounded-xl bg-[#181312] border border-white/10 p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Phase Badge & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson font-black text-xl shrink-0">
              1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-stone-grey">
                  CURRENT PHASE
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-crimson/20 text-crimson-bright font-bold border border-crimson/30 text-[10px] uppercase">
                  Verified
                </span>
              </div>
              <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
                Phase 1 <span className="text-stone-grey font-medium text-sm">— Frontend Foundation</span>
              </h3>
              <p className="text-xs text-stone-grey">
                Project Setup · Design System · Core Architecture · Verification
              </p>
            </div>
          </div>

          {/* Progress & Metadata */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-8">
            <div className="w-48">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-stone-grey uppercase tracking-wider text-[10px]">Progress</span>
                <span className="text-crimson font-mono">100% (Ph1) / 30%</span>
              </div>
              <div className="h-2 rounded-full bg-black/60 overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-crimson to-crimson-bright rounded-full w-[30%]" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4 text-crimson" />
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-grey tracking-wider">Start Date</p>
                <p className="font-semibold text-white">31 OCT 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Flag className="w-4 h-4 text-burgundy-light" />
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-grey tracking-wider">Target Demo</p>
                <p className="font-semibold text-white">12 HOURS</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Users2 className="w-4 h-4 text-stone-grey-light" />
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-grey tracking-wider">Team</p>
                <p className="font-semibold text-crimson tracking-wider">SENTINELS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Phase Execution Roadmap Cards (Image 1 bottom phase row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.status === 'active';

          return (
            <div
              key={phase.num}
              className={cn(
                'rounded-xl p-4 transition-all duration-300 flex flex-col justify-between min-h-[220px]',
                isActive
                  ? 'bg-gradient-to-b from-[#2E1617] to-[#1A1111] border-2 border-crimson shadow-[0_0_25px_rgba(217,54,69,0.3)]'
                  : 'bg-[#151110] border border-white/10 hover:border-white/20'
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <Icon className={cn('w-4 h-4', isActive ? 'text-crimson' : 'text-stone-grey')} />
                  <span className={cn('font-mono font-black text-xs', isActive ? 'text-crimson' : 'text-stone-grey')}>
                    {phase.num}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white tracking-wide uppercase mb-3 line-clamp-1">
                  {phase.title}
                </h4>

                {/* Items */}
                <ul className="space-y-1.5 text-[11px]">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {item.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-crimson shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-stone-grey/40 shrink-0" />
                      )}
                      <span className={cn(item.done ? 'text-white font-medium' : 'text-stone-grey')}>
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {isActive && (
                <div className="mt-3 pt-2 border-t border-crimson/30 flex items-center justify-between text-[10px] text-crimson font-bold uppercase tracking-wider">
                  <span>Current Focus</span>
                  <span>100% Ready</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Tech Stack Footer (Image 1 bottom banner) */}
      <div className="rounded-xl bg-[#14100F] border border-white/10 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-grey">
            TECH STACK
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] font-semibold text-white flex items-center gap-1.5"
              >
                <span className="text-crimson font-mono text-xs">{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>

          <div className="hidden lg:block w-px h-5 bg-white/10 mx-2" />

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-grey">
            FUTURE STACK
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {futureStack.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 rounded bg-black/20 border border-white/5 text-[11px] font-medium text-stone-grey flex items-center gap-1.5"
              >
                <span>{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Closing Quote */}
        <div className="text-right text-[11px] text-stone-grey italic hidden xl:block">
          &ldquo;Documents show what you built. Logs show how you became who you are.&rdquo;
        </div>
      </div>
    </div>
  );
}
