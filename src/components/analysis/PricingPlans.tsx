import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  RefreshCw,
  ArrowLeft,
  Heart,
  Sparkles,
  Zap,
  User,
  Building2,
  type LucideIcon } from
'lucide-react';

interface PricingPlansProps {
  selectedTraits: string[];
  onBack: () => void;
  onReset: () => void;
}

/* FIX: in-flow pricing rebuilt to mirror the team's actual rate card.
   - Single Options (1 person) vs Package (Enterprise, 20 staff)
   - Each audience shows Fix/Cure, Add-on Simple, Add-on Xtreme
   - Prices listed in dot-thousands notation, exactly as specified */

type Audience = 'individual' | 'enterprise';

interface Tier {
  id: string;
  name: string;
  icon: LucideIcon;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

const tierData: Record<Audience, Tier[]> = {
  individual: [
  {
    id: 'fix',
    name: 'Fix / Cure',
    icon: Heart,
    price: '$2.000.000,00',
    tagline: 'Cure terminal illness & heal impossible wounds.',
    badge: 'Most critical',
    highlight: true,
    features: [
    'CRISPR-9 intervention (cost $2.1M covered)',
    'Cure terminal illnesses',
    'Heal impossible wounds',
    '12-month post-op monitoring',
    'Lifetime reversibility']

  },
  {
    id: 'simple',
    name: 'Add-on · Simple',
    icon: Sparkles,
    price: '$3.500.000,00',
    tagline: 'Baseline genetic powers.',
    features: [
    'All Fix / Cure benefits',
    '3 baseline genetic powers',
    'Single implantation slot',
    '12-month post-procedure check-ups',
    'Optional monitoring add-on']

  },
  {
    id: 'xtreme',
    name: 'Add-on · Xtreme',
    icon: Zap,
    price: '$6.000.000,00',
    tagline: 'Full genetic-power suite.',
    badge: 'Maximum power',
    features: [
    'All Simple-tier benefits',
    'Unlimited genetic powers',
    'Bespoke synthetic gene design',
    'Dedicated evolution physician',
    'Lifetime reversibility + priority scheduling']

  }],

  enterprise: [
  {
    id: 'fix',
    name: 'Fix / Cure',
    icon: Heart,
    price: '$1.500.000,00',
    tagline: 'Cure terminal illness & heal impossible wounds — team-wide.',
    badge: 'Most critical',
    highlight: true,
    features: [
    'CRISPR-9 intervention (cost $2.1M / person, covered)',
    'Cure terminal illnesses for up to 20 staff',
    'Heal impossible wounds',
    'On-site corporate procedure suite',
    'Bulk post-op monitoring',
    'Lifetime reversibility']

  },
  {
    id: 'simple',
    name: 'Add-on · Simple',
    icon: Sparkles,
    price: '$3.000.000,00',
    tagline: 'Baseline genetic powers, deployed at scale.',
    features: [
    'All Fix / Cure benefits for the team',
    '3 baseline genetic powers per staff member',
    'Coordinated 20-person implantation window',
    'Quarterly enhancement re-tuning',
    'Dedicated account manager + corporate SLA']

  },
  {
    id: 'xtreme',
    name: 'Add-on · Xtreme',
    icon: Zap,
    price: '$5.000.000,00',
    tagline: 'Full genetic-power suite for the organization.',
    badge: 'Maximum power',
    features: [
    'All Simple-tier benefits for the team',
    'Unlimited genetic powers for 20 staff',
    'Bespoke synthetic gene design per role',
    '24/7 on-site evolution medical team',
    'Executive-grade legal cover + lifetime reversibility']

  }]

};


const teamTotal = (perPerson: string) => {
  const n = parseFloat(perPerson.replace(/[^0-9,]/g, '').replace(/\./g, '').replace(',', '.'));
  if (Number.isNaN(n)) return null;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n * 20);
};

export function PricingPlans({
  selectedTraits,
  onBack,
  onReset
}: PricingPlansProps) {
  const [audience, setAudience] = useState<Audience>('individual');
  const tiers = tierData[audience];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto">

      <div className="text-center mb-8">
        <div className="inline-block px-4 py-1 bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent-strong)] font-mono text-xs uppercase tracking-widest rounded-full mb-4">
          Pricing
        </div>
        <h2 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">Choose your plan</h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
          Single Options (1 person) or a Package for an enterprise team of 20.
        </p>
      </div>

      {/* Audience tabs */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex bg-white rounded-xl p-1.5 border border-[var(--border-color)] shadow-sm">
          <button
            type="button"
            onClick={() => setAudience('individual')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors ${audience === 'individual' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>

            <User className="w-4 h-4" /> Single Options
          </button>
          <button
            type="button"
            onClick={() => setAudience('enterprise')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors ${audience === 'enterprise' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>

            <Building2 className="w-4 h-4" /> Package (20 staff)
          </button>
        </div>
      </div>

      {/* Summary of selected categories */}
      {selectedTraits.length > 0 &&
        <div className="border border-[var(--border-color)] bg-white p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl">
          <div>
            <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1">
              Your selected categories
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              {selectedTraits.length} categor{selectedTraits.length === 1 ? 'y' : 'ies'} · {selectedTraits.join(', ')}
            </div>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
            All tiers cover your selection
          </div>
        </div>
      }

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          const total = audience === 'enterprise' ? teamTotal(tier.price) : null;
          return (
            <motion.div
              key={`${audience}-${tier.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`relative p-6 border flex flex-col rounded-xl ${tier.highlight ? 'border-[var(--accent)] bg-white shadow-xl shadow-[var(--accent-glow)] ring-2 ring-[var(--accent)]' : 'border-[var(--border-color)] bg-white'}`}>

              {tier.badge &&
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--accent)] text-white font-mono text-[10px] uppercase tracking-widest rounded-md whitespace-nowrap">
                  {tier.badge}
                </div>
              }

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center border mb-4 ${tier.highlight ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-[var(--accent-soft)] border-[var(--border-color)] text-[var(--accent)]'}`}>

                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold mb-1 text-[var(--text-primary)]">{tier.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-5 min-h-[32px]">
                {tier.tagline}
              </p>

              <div className="mb-4">
                <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {tier.price}
                </div>
                <div className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
                  / {audience === 'enterprise' ? 'person' : 'person'} · one-time
                </div>
              </div>

              {total &&
                <div className="mb-4 px-3 py-2 bg-[#F4F8FB] border border-[var(--border-color)] rounded-md">
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-0.5">
                    Total for 20 staff
                  </div>
                  <div className="text-sm font-bold text-[var(--accent)]">
                    {total}
                  </div>
                </div>
              }

              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((f) =>
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">{f}</span>
                  </li>
                )}
              </ul>

              <button
                className={`w-full py-2.5 font-mono text-xs font-semibold transition-colors rounded-md ${tier.highlight ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]' : 'bg-white border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}>

                Choose {tier.name}
              </button>
            </motion.div>);

        })}
      </div>

      <p className="text-center text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-8 max-w-xl mx-auto">
        Conceptual pricing for a fictional project. No real services or
        transactions are offered.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center gap-2 rounded-md">

          <ArrowLeft className="w-4 h-4" />
          Back to Report
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-transparent text-[var(--text-muted)] font-mono text-sm hover:text-[var(--accent)] transition-colors flex items-center justify-center gap-2 rounded-md">

          <RefreshCw className="w-4 h-4" />
          Start Over
        </button>
      </div>
    </motion.div>);

}