import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Microscope,
  Dna,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check } from
'lucide-react';

/* FIX (Vy Pham): tab "How it work nên trực quan cho dễ nhìn".
   Rewritten as an interactive step-through with visual cards for each
   stage — full-width image / icon, expanded description, prev/next nav,
   progress bar — instead of four static numbered circles. */

const steps = [
{
  num: '01',
  title: 'Provide your sample',
  short: 'Saliva or a 23andMe-style raw file.',
  icon: Microscope,
  illustration: 'sample',
  details: [
  'Order our at-home saliva kit, or upload an existing raw DNA file from services like 23andMe or AncestryDNA.',
  'Supported formats: .fasta, .vcf, .bam, .txt (raw).',
  'Your sample is shipped in tamper-evident packaging and barcoded for chain-of-custody.'],

  time: '~5 minutes to collect',
  color: 'from-cyan-50 to-blue-50'
},
{
  num: '02',
  title: 'Lab sequencing',
  short: 'Whole-genome sequencing at 30x coverage.',
  icon: Dna,
  illustration: 'lab',
  details: [
  'CLIA-certified labs extract and sequence your DNA at clinical-grade depth.',
  'Every variant is cross-referenced against curated databases (ClinVar, dbSNP, gnomAD).',
  'A second-pass QC review catches low-confidence calls before reporting.'],

  time: '~48 hours turnaround',
  color: 'from-blue-50 to-indigo-50'
},
{
  num: '03',
  title: 'Trait simulation',
  short: 'AI simulates how your variants interact.',
  icon: Sparkles,
  illustration: 'sim',
  details: [
  'Our models simulate how your specific variants affect metabolism, fitness response, sleep, and disease risk.',
  'We surface only well-replicated, peer-reviewed findings — no speculative “optimization” advice.',
  'You see the strength of evidence behind every insight (strong / moderate / preliminary).'],

  time: '~10 minutes compute',
  color: 'from-violet-50 to-cyan-50'
},
{
  num: '04',
  title: 'Personal report',
  short: 'A clear PDF + interactive dashboard.',
  icon: FileText,
  illustration: 'report',
  details: [
  'Receive a plain-language wellness report covering nutrition, fitness, sleep, and screening recommendations.',
  'A certified genetic counselor reviews every report before it reaches you.',
  'Your data is encrypted at rest, never sold, and deletable in one click.'],

  time: 'Delivered to your inbox',
  color: 'from-emerald-50 to-cyan-50'
}];

/* Mini SVG illustrations for each step — addresses "thieu hinh anh minh hoa"
   (Phu Minh / Van Chuong). Kept self-contained so no extra deps needed. */
function StepIllustration({ kind }: {kind: string;}) {
  if (kind === 'sample') {
    return (
      <svg viewBox="0 0 240 200" className="w-full h-full">
        <rect x="40" y="40" width="160" height="120" rx="14" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
        <rect x="60" y="60" width="120" height="50" rx="6" fill="#E0F4FA" />
        <circle cx="120" cy="85" r="14" fill="var(--accent)" opacity="0.9" />
        <path d="M114 85 q6 -10 12 0" stroke="#fff" strokeWidth="2" fill="none" />
        <rect x="60" y="120" width="80" height="8" rx="4" fill="#E2E8F0" />
        <rect x="60" y="134" width="60" height="6" rx="3" fill="#E2E8F0" />
        <circle cx="200" cy="60" r="14" fill="var(--accent-soft)" />
        <path d="M194 60 l4 4 l8 -8" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="190" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="JetBrains Mono">
          Saliva collection kit
        </text>
      </svg>);

  }
  if (kind === 'lab') {
    return (
      <svg viewBox="0 0 240 200" className="w-full h-full">
        <rect x="30" y="40" width="180" height="130" rx="12" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
        <rect x="50" y="60" width="140" height="20" rx="4" fill="#E0F4FA" />
        <rect x="50" y="90" width="140" height="6" rx="3" fill="#E2E8F0" />
        <rect x="50" y="102" width="100" height="6" rx="3" fill="#E2E8F0" />
        <rect x="50" y="114" width="120" height="6" rx="3" fill="#E2E8F0" />
        <circle cx="120" cy="145" r="14" fill="var(--accent)" />
        <text x="120" y="150" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">
          99.9%
        </text>
        <text x="120" y="190" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="JetBrains Mono">
          Sequencing pipeline
        </text>
      </svg>);

  }
  if (kind === 'sim') {
    return (
      <svg viewBox="0 0 240 200" className="w-full h-full">
        <circle cx="60" cy="100" r="22" fill="var(--accent-soft)" />
        <circle cx="120" cy="60" r="14" fill="var(--accent)" opacity="0.4" />
        <circle cx="180" cy="100" r="22" fill="var(--accent)" />
        <circle cx="120" cy="150" r="14" fill="var(--accent)" opacity="0.6" />
        <line x1="78" y1="92" x2="110" y2="68" stroke="var(--accent)" strokeWidth="2" />
        <line x1="162" y1="92" x2="130" y2="68" stroke="var(--accent)" strokeWidth="2" />
        <line x1="78" y1="108" x2="110" y2="142" stroke="var(--accent)" strokeWidth="2" />
        <line x1="162" y1="108" x2="130" y2="142" stroke="var(--accent)" strokeWidth="2" />
        <text x="120" y="105" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontFamily="Space Grotesk" fontWeight="600">
          AI
        </text>
        <text x="120" y="190" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="JetBrains Mono">
          Trait simulation graph
        </text>
      </svg>);

  }
  // report
  return (
    <svg viewBox="0 0 240 200" className="w-full h-full">
      <rect x="60" y="30" width="120" height="150" rx="8" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
      <rect x="74" y="46" width="60" height="8" rx="3" fill="var(--accent)" />
      <rect x="74" y="62" width="92" height="5" rx="2" fill="#E2E8F0" />
      <rect x="74" y="72" width="80" height="5" rx="2" fill="#E2E8F0" />
      <rect x="74" y="92" width="92" height="40" rx="4" fill="#E0F4FA" />
      <circle cx="86" cy="112" r="6" fill="var(--accent)" />
      <rect x="98" y="106" width="50" height="5" rx="2" fill="#0F172A" />
      <rect x="98" y="115" width="40" height="4" rx="2" fill="#94A3B8" />
      <rect x="74" y="140" width="92" height="5" rx="2" fill="#E2E8F0" />
      <rect x="74" y="150" width="60" height="5" rx="2" fill="#E2E8F0" />
      <text x="120" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="JetBrains Mono">
        Counselor-reviewed PDF
      </text>
    </svg>);

}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step.icon;
  const goPrev = () => setActive((i) => (i - 1 + steps.length) % steps.length);
  const goNext = () => setActive((i) => (i + 1) % steps.length);
  return (
    <section
      id="how-it-works"
      className="py-24 relative bg-white border-y border-[var(--border-color)]">

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] mb-4">
            <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
              How it works
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
            From saliva to insights in four steps
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A transparent, fully-illustrated view of what happens to your DNA —
            from the moment your sample arrives to the report you receive.
          </p>
        </div>

        {/* Interactive step viewer — addresses "truc quan cho de nhin" */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch bg-[#F8FBFD] rounded-3xl border border-[var(--border-color)] p-6 md:p-10 shadow-sm">
          {/* Visual side */}
          <div className={`rounded-2xl bg-gradient-to-br ${step.color} p-8 flex flex-col items-center justify-center min-h-[320px] border border-[var(--border-color)]`}>
            <div className="w-full max-w-sm aspect-[6/5] mb-6">
              <StepIllustration kind={step.illustration} />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                Step {step.num}
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-[var(--accent-soft)] text-[var(--accent-strong)] text-[10px] font-mono uppercase tracking-widest rounded-full mb-4">
                {step.time}
              </div>
              <h3 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">{step.short}</p>

              <ul className="space-y-3">
                {step.details.map((d) =>
                  <li key={d} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Step nav */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between gap-4 mb-4">
                <button
                  onClick={goPrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-[var(--border-color)] text-sm font-mono hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">

                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
                  {active + 1} / {steps.length}
                </div>
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-mono hover:bg-[var(--accent-strong)] transition-colors">

                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={false}
                  animate={{ width: `${(active + 1) / steps.length * 100}%` }}
                  transition={{ duration: 0.4 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Step pills — quick navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {steps.map((s, i) => {
            const activeCls = i === active
              ? 'bg-[var(--accent)] text-white shadow-md'
              : 'bg-white border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]';
            return (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors ${activeCls}`}>

                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i === active ? 'bg-white/20' : 'bg-[var(--accent-soft)] text-[var(--accent-strong)]'}`}>

                  {s.num}
                </span>
                {s.title}
              </button>);

          })}
        </div>
      </div>
    </section>);

}