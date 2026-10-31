'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockAssistantQueries } from '@/data';
import { Button } from '@/components/ui/Button';
import { Bot, Send, Sparkles } from 'lucide-react';

export default function AssistantPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(mockAssistantQueries);

  const handleSend = () => {
    if (!query.trim()) return;

    const newQuery = {
      id: `qa-${Date.now()}`,
      query: query,
      response: `Based on your live billing ledger, recognized MRR stands at $4,490.20 with $22,862.40 in pending receivables. All 3 active corporate contracts are projected to renew successfully with automated discount rollovers applied.`,
      relevantMetrics: [
        { label: 'Forecasted Q4 MRR', value: '$5,200.00', change: '+15.8%' },
        { label: 'Collection Confidence', value: '94.2%', change: '+2.4%' },
      ],
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [newQuery, ...prev]);
    setQuery('');
  };

  const samplePrompts = [
    'What is our current Monthly Recurring Revenue (MRR)?',
    'Which accounts are at risk of non-renewal in Q4?',
    'What would be the margin impact of offering Apex Logistics a 10% discount?',
  ];

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-blush">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-crimson/10 text-crimson">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
                AI Finance &amp; Revenue Assistant
              </h1>
              <p className="text-xs text-stone-grey">
                Natural-language co-pilot for subscription forecasts, margin sensitivity, and cash flow queries.
              </p>
            </div>
          </div>
        </div>

        {/* Input box */}
        <div className="editorial-card rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about MRR, churn risk, outstanding receivables, or discounts..."
              className="flex-1 px-4 py-2.5 text-xs bg-ivory rounded-xl border border-blush text-espresso placeholder:text-stone-grey focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson"
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleSend}
              disabled={!query.trim()}
              className="crimson-glow"
            >
              <Send className="w-4 h-4 mr-1.5" />
              <span>Ask Co-Pilot</span>
            </Button>
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-grey">
              Suggested:
            </span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(p)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-ivory hover:bg-white text-stone-grey-dark border border-blush transition-colors cursor-pointer text-left"
              >
                &ldquo;{p}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="space-y-4">
          {messages.map((item) => (
            <div key={item.id} className="editorial-card rounded-xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-espresso text-ivory flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  Q
                </div>
                <p className="font-bold text-espresso text-xs pt-1">{item.query}</p>
              </div>

              <div className="p-4 rounded-xl bg-ivory/60 border border-blush text-xs leading-relaxed space-y-3">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                  <p className="text-stone-grey-dark">{item.response}</p>
                </div>

                {item.relevantMetrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-blush">
                    {item.relevantMetrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white border border-blush flex items-center justify-between">
                        <span className="text-stone-grey text-[11px]">{m.label}:</span>
                        <div className="flex items-center gap-1.5 font-bold font-mono text-espresso text-xs">
                          <span>{m.value}</span>
                          {m.change && (
                            <span className="text-emerald-700 text-[10px] font-sans">
                              ({m.change})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
