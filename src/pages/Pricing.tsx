import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Zap,
  Building2,
  User,
  Check,
  ArrowRight,
  HelpCircle,
  ShieldCheck } from
'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/* FIX: Pricing rebuilt to match the team's actual rate card.
   - Two audience tabs: Individual (1 person) and Enterprise (20 staff)
   - Each tab exposes 3 services: Fix/Cure, Add-on Simple, Add-on Xtreme
   - Add-on tiers deliver "Genetic powers" enhancements
   - Prices are explicit and use dot-thousands notation ($1.999.999,99)
   - Includes a transparent cost note (e.g. CRISPR-9 cost) and FAQs */

/* ---------------- Types ---------------- */
type Audience = 'individual' | 'enterprise';

interface ServiceTier {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

interface TierGroup {
  audience: Audience;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  scopeNote: string;
  tiers: ServiceTier[];
}

/* ---------------- Data ---------------- */
const groups: Record<Audience, TierGroup> = {
  individual: {
    audience: 'individual',
    title: 'Single Options',
    subtitle: 'Pricing for a single individual.',
    icon: User,
    scopeNote: 'Scope: 1 person',
    tiers: [
    {
      id: 'fix-individual',
      name: 'Fix / Cure',
      icon: Heart,
      tagline: 'Cure terminal illnesses & heal impossible wounds.',
      price: '$1.999.999,99',
      priceNote: '/ person · one-time',
      badge: 'Most critical',
      highlight: true,
      features: [
      'CRISPR-9 medical-grade intervention (cost: $2.1M covered)',
      'Cure terminal illnesses (cancer, ALS, late-stage HIV, …)',
      'Heal impossible wounds (severe burns, paralysis, organ loss)',
      'Single in-clinic procedure + 12-month post-op monitoring',
      'Lifetime reversibility guarantee']

    },
    {
      id: 'addon-simple-individual',
      name: 'Add-on · Simple',
      icon: Sparkles,
      tagline: 'Entry-level genetic powers & enhancements.',
      price: '$3.250.000,00',
      priceNote: '/ person · one-time',
      features: [
      'All Fix / Cure benefits included',
      '3 baseline genetic powers (e.g. enhanced immunity, night vision, perfect pitch)',
      'Single implantation slot',
      '12-month post-procedure check-ups',
      'Optional monitoring add-on']

    },
    {
      id: 'addon-xtreme-individual',
      name: 'Add-on · Xtreme',
      icon: Zap,
      tagline: 'Full-stack genetic powers for the unrestricted evolver.',
      price: '$4.999.999,99',
      priceNote: '/ person · one-time',
      badge: 'Maximum power',
      features: [
      'All Simple-tier benefits included',
      'Unlimited genetic powers (regeneration, telekinetic sensitivity, adaptive metabolism, etc.)',
      'Bespoke synthetic gene design',
      'Dedicated evolution physician on-call',
      'Lifetime reversibility guarantee + priority lab scheduling']

    }]

  },
  enterprise: {
    audience: 'enterprise',
    title: 'Package Option',
    subtitle: 'Pricing for a Company / Enterprise team of 20 staff.',
    icon: Building2,
    scopeNote: 'Scope: 20 staff (volume discount applied)',
    tiers: [
    {
      id: 'fix-enterprise',
      name: 'Fix / Cure',
      icon: Heart,
      tagline: 'Cure terminal illnesses & heal impossible wounds — for your whole team.',
      price: '$1.500.000,00',
      priceNote: '/ person · one-time',
      badge: 'Most critical',
      highlight: true,
      features: [
      'CRISPR-9 medical-grade intervention (cost: $2.1M per person, covered)',
      'Cure terminal illnesses for up to 20 staff',
      'Heal impossible wounds (severe burns, paralysis, organ loss)',
      'On-site corporate procedure suite',
      'Bulk reporting + 12-month post-op monitoring for the whole team',
      'Lifetime reversibility guarantee']

    },
    {
      id: 'addon-simple-enterprise',
      name: 'Add-on · Simple',
      icon: Sparkles,
      tagline: 'Baseline genetic powers, deployed at company scale.',
      price: '$2.750.000,00',
      priceNote: '/ person · one-time',
      features: [
      'All Fix / Cure benefits for the team',
      '3 baseline genetic powers per staff member',
      'Coordinated 20-person implantation window',
      'Quarterly enhancement re-tuning for the team',
      'Dedicated account manager + corporate SLA']

    },
    {
      id: 'addon-xtreme-enterprise',
      name: 'Add-on · Xtreme',
      icon: Zap,
      tagline: 'Full genetic-power suite for an entire organization.',
      price: '$3.999.999,99',
      priceNote: '/ person · one-time',
      badge: 'Maximum power',
      features: [
      'All Simple-tier benefits for the team',
      'Unlimited genetic powers for up to 20 staff',
      'Bespoke synthetic gene design per role',
      '24/7 dedicated evolution medical team on-site',
      'Lifetime reversibility guarantee + priority lab scheduling',
      'Executive-grade confidentiality & legal cover']

    }]

  }};


/* ---------------- Page ---------------- */
const faqs = [
{
  q: 'What does "Fix / Cure" actually include?',
  a: 'A medical-grade CRISPR-9 intervention (the procurement cost of $2.1M per person is fully absorbed by us) designed to cure terminal illnesses and heal otherwise impossible wounds. It is a one-time procedure plus 12 months of post-op monitoring.'
},
{
  q: 'What is the difference between Simple and Xtreme Add-ons?',
  a: 'Simple delivers 3 baseline genetic powers (immunity boost, night vision, perfect pitch, etc.). Xtreme unlocks the full genetic-power suite — regeneration, adaptive metabolism, and other enhancements — with bespoke gene design and a dedicated physician on-call.'
},
{
  q: 'Why is the Enterprise price lower per person?',
  a: 'Enterprise packages deploy at scale (20 staff at a time) with a single coordinated procedure window and shared logistics, which is why the per-person cost is reduced across all three service tiers.'
},
{
  q: 'Is this a real service?',
  a: 'No — this is a conceptual demo. GENESIS X is a fictional project. Real genetic modification on humans is currently restricted by international law and bioethics treaties.'
},
{
  q: 'How is my data and identity protected?',
  a: 'All procedures are confidential. Enterprise clients get executive-grade legal cover; individuals get lifetime reversibility guarantees. Data is encrypted in transit and at rest, never sold, and deletable in one click.'
}];


export function Pricing() {
  const [audience, setAudience] = useState<Audience>('individual');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const group = groups[audience];
  const totalForTeam = (perPerson: string) => {
    const n = parseFloat(perPerson.replace(/[^0-9,]/g, '').replace(/\./g, '').replace(',', '.'));
    if (Number.isNaN(n)) return null;
    const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return usd.format(n * 20);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
              Pricing
            </span>
            <span className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[var(--text-primary)]">
            Transparent pricing for every path.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Choose between single-person services or a 20-staff enterprise
            package. All prices are listed below — no subscriptions, no
            hidden fees.
          </p>
        </div>

        {/* Audience tabs */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex bg-white rounded-xl p-1.5 border border-[var(--border-color)] shadow-sm">
            <button
              type="button"
              onClick={() => setAudience('individual')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-mono uppercase tracking-widest transition-colors ${audience === 'individual' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>

              <User className="w-4 h-4" /> Single Options
            </button>
            <button
              type="button"
              onClick={() => setAudience('enterprise')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-mono uppercase tracking-widest transition-colors ${audience === 'enterprise' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>

              <Building2 className="w-4 h-4" /> Package (Enterprise)
            </button>
          </div>
          <div className="mt-4 text-center text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest">
            {group.scopeNote}
          </div>
        </div>

        {/* Tier cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {group.tiers.map((tier, index) => {
            const Icon = tier.icon;
            const teamTotal = audience === 'enterprise' ? totalForTeam(tier.price) : null;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative p-8 border flex flex-col rounded-xl ${tier.highlight ? 'border-[var(--accent)] bg-white shadow-xl shadow-[var(--accent-glow)] ring-2 ring-[var(--accent)]' : 'border-[var(--border-color)] bg-white'}`}>

                {tier.badge &&
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--accent)] text-white font-mono text-[10px] uppercase tracking-widest rounded-md whitespace-nowrap">
                    {tier.badge}
                  </div>
                }

                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border mb-6 ${tier.highlight ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-[var(--accent-soft)] border-[var(--border-color)] text-[var(--accent)]'}`}>

                  <Icon className="w-6 h-6" />
                </div>

                <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6 min-h-[40px]">
                  {tier.tagline}
                </p>

                <div className="mb-4 pb-6 border-b border-[var(--border-color)]">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                    {tier.price}
                  </div>
                  <div className="font-mono text-xs text-[var(--text-muted)] mt-1">
                    {tier.priceNote}
                  </div>
                </div>

                {audience === 'enterprise' && teamTotal &&
                  <div className="mb-5 px-3 py-2 bg-[#F4F8FB] border border-[var(--border-color)] rounded-md">
                    <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-0.5">
                      Total for 20 staff
                    </div>
                    <div className="text-sm font-bold text-[var(--accent)]">
                      {teamTotal}
                    </div>
                  </div>
                }

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) =>
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{f}</span>
                    </li>
                  )}
                </ul>

                <Link
                  to="/start"
                  className={`w-full py-3 font-mono text-sm font-semibold transition-colors flex items-center justify-center gap-2 rounded-md ${tier.highlight ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]' : 'bg-white border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}>

                  Choose {tier.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>);

          })}
        </div>

        {/* Quick cost reference */}
        <div className="max-w-3xl mx-auto mb-16 bg-white rounded-2xl border border-[var(--border-color)] p-8 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Cost reference</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Where the numbers come from.
              </p>
            </div>
          </div>
          <ul className="divide-y divide-[var(--border-color)]">
            <li className="flex items-center justify-between py-3 text-sm">
              <span className="text-[var(--text-secondary)]">CRISPR-9 procurement cost</span>
              <span className="font-mono text-[var(--text-primary)]">$2.100.000,00 / person</span>
            </li>
            <li className="flex items-center justify-between py-3 text-sm">
              <span className="text-[var(--text-secondary)]">Volume discount (Enterprise, 20 staff)</span>
              <span className="font-mono text-[var(--accent)]">~25% off list</span>
            </li>
            <li className="flex items-center justify-between py-3 text-sm">
              <span className="text-[var(--text-secondary)]">Lifetime reversibility guarantee</span>
              <span className="font-mono text-emerald-600">Included on every tier</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-[var(--text-primary)]">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) =>
              <details
                key={f.q}
                className="group bg-white border border-[var(--border-color)] rounded-xl px-5 py-4 open:shadow-sm">

                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-bold text-[var(--text-primary)]">{f.q}</span>
                  <span className="w-6 h-6 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-sm group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {f.a}
                </p>
              </details>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto flex items-center gap-3 justify-center text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest mb-4">
          <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
          Lifetime reversibility on every plan
        </div>

        <p className="text-center text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest max-w-xl mx-auto">
          Conceptual pricing for a fictional project. No real services or
          transactions are offered.
        </p>
      </main>

      <Footer />
    </div>);

}