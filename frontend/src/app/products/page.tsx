'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { mockProducts } from '@/data';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatters';
import { Plus, CheckCircle2 } from 'lucide-react';

export default function ProductsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush">
          <div>
            <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
              Products &amp; Variant Matrix
            </h1>
            <p className="text-xs text-stone-grey mt-1">
              Configure product catalog, billable variants (e.g. Odoo brand surcharges), and recurring add-ons.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => alert('Product creation wizard ready for Phase 3!')}
            className="crimson-glow"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create Product</span>
          </Button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockProducts.map((prod) => (
            <div
              key={prod.id}
              className="editorial-card rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-blush mb-3">
                  <span className="text-[10px] font-mono font-bold text-stone-grey bg-ivory px-2 py-0.5 rounded border border-blush">
                    {prod.sku}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {prod.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-espresso">{prod.name}</h3>
                <p className="text-xs text-stone-grey mt-1 leading-relaxed">
                  {prod.description}
                </p>

                <div className="mt-4 pt-3 border-t border-blush/60 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-stone-grey">Base Sales Price:</span>
                  <span className="text-lg font-black text-espresso font-mono">
                    {formatCurrency(prod.salesPrice)}
                    <span className="text-xs font-normal text-stone-grey"> / mo</span>
                  </span>
                </div>

                {/* Variants listing */}
                {prod.variants.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-[10.5px] uppercase font-bold text-stone-grey tracking-wider">
                      Configured Variants ({prod.variants.length})
                    </p>
                    <div className="space-y-1.5">
                      {prod.variants.map((v) => (
                        <div
                          key={v.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-ivory border border-blush text-xs"
                        >
                          <div>
                            <p className="font-semibold text-espresso">{v.name}</p>
                            <span className="text-[10px] text-stone-grey font-mono">{v.sku}</span>
                          </div>
                          <span className="font-bold text-espresso font-mono">
                            {v.additionalPrice > 0 ? `+${formatCurrency(v.additionalPrice)}` : 'Included'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-blush flex items-center justify-between">
                <span className="text-xs text-stone-grey flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Active in Catalog
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Configuring ${prod.name}...`)}
                  className="text-xs"
                >
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
