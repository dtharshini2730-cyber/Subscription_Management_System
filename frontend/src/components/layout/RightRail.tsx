'use client';

import React from 'react';
import { Target, BarChart3 } from 'lucide-react';

export function RightRail() {
  return (
    <aside className="w-80 shrink-0 hidden xl:flex flex-col gap-6 p-6 border-l border-[#E8DAD5]/10 bg-[#120F0E]/80 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto">
      {/* Institution & Academic Year Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center justify-between text-xs font-bold tracking-[0.2em] text-stone-grey uppercase">
          <span>AY 2026 — 2027</span>
        </div>
        <p className="text-[11px] font-semibold text-stone-grey-light uppercase tracking-wider mt-1">
          KGISL INSTITUTE OF TECHNOLOGY
        </p>
      </div>

      {/* Our Mission */}
      <div className="relative pl-6">
        <span className="absolute left-0 top-0 text-3xl font-serif text-crimson leading-none font-bold">
          &ldquo;
        </span>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-0.5 bg-crimson" />
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ivory">
            OUR MISSION
          </h4>
        </div>
        <p className="text-xs text-stone-grey leading-relaxed">
          To empower subscription-based businesses with intelligent tools, simplified billing, and data-driven insights for sustainable growth.
        </p>
      </div>

      {/* Our Vision */}
      <div className="relative pl-6">
        <span className="absolute left-0 top-0 text-3xl font-serif text-burgundy leading-none font-bold">
          &ldquo;
        </span>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-0.5 bg-burgundy" />
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ivory">
            OUR VISION
          </h4>
        </div>
        <p className="text-xs text-stone-grey leading-relaxed">
          A world where subscription-based businesses grow smarter with intelligent tools, automated governance, and predictive revenue intelligence.
        </p>
      </div>

      {/* Project Vision Card */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-crimson/40 transition-colors group">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-crimson/15 text-crimson border border-crimson/25 group-hover:scale-110 transition-transform">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              PROJECT VISION
            </h5>
            <p className="text-[11px] text-stone-grey leading-relaxed mt-1">
              Build a real-world ready subscription management platform with AI intelligence and modern SaaS experience.
            </p>
          </div>
        </div>
      </div>

      {/* Project Impact Card */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-burgundy/40 transition-colors group">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-burgundy/25 text-red-400 border border-burgundy/35 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              PROJECT IMPACT
            </h5>
            <p className="text-[11px] text-stone-grey leading-relaxed mt-1">
              Simplifying subscription operations for businesses and enabling smarter, automated financial decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Team Sentinels Card */}
      <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-burgundy/40 to-black/60 border border-crimson/30 text-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-stone-grey uppercase tracking-wider mb-1">
          <span>TEAM</span>
          <span className="text-crimson font-black tracking-widest">SENTINELS</span>
        </div>
        <p className="text-[10.5px] text-stone-grey leading-tight">
          Delivering the digital backbone for recurring revenue enterprises.
        </p>
      </div>
    </aside>
  );
}
