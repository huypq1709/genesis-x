import React from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  Brain,
  Heart,
  Apple,
  ShieldCheck,
  RefreshCw,
  Download,
  Calendar,
  type LucideIcon } from
'lucide-react';

interface AnalysisResultsProps {
  selectedTraits: string[];
  onReset: () => void;
  onProceed: () => void;
}

interface TraitDatum {
  icon: LucideIcon;
  title: string;
  code: string;
  score: number;
  outcome: string;
  evidence: 'Strong' | 'Moderate';
}

/* FIX: trait IDs now match the new TraitSelector IDs (FIT/COG/HRT/NUT/RSK).
   Copy reframed as a wellness report — no "compatibility score", no
   "implantation slot". Added a Download + Counselor CTA so the next step
   makes sense. */

const traitData: Record<string, TraitDatum> = {
  'FIT-01': {
    icon: Dumbbell,
    title: 'Fitness response',
    code: 'ACTN3 · ACE',
    score: 82,
    outcome: 'Likely responds better to endurance + power mixed training than pure strength.',
    evidence: 'Moderate'
  },
  'COG-02': {
    icon: Brain,
    title: 'Cognitive profile',
    code: 'BDNF · COMT',
    score: 76,
    outcome: 'Markers associated with average working memory and stress recovery.',
    evidence: 'Moderate'
  },
  'HRT-03': {
    icon: Heart,
    title: 'Cardio markers',
    code: 'APOE · 9p21',
    score: 88,
    outcome: 'No elevated hereditary risk flags identified from this panel.',
    evidence: 'Strong'
  },
  'NUT-04': {
    icon: Apple,
    title: 'Nutrition fit',
    code: 'LCT · MCM6',
    score: 71,
    outcome: 'Likely lactose sensitive — consider calcium from non-dairy sources.',
    evidence: 'Strong'
  },
  'RSK-05': {
    icon: ShieldCheck,
    title: 'Health-risk screening',
    code: 'BRCA1/2 · Lynch',
    score: 91,
    outcome: 'No pathogenic variants detected across the 25-marker screening panel.',
    evidence: 'Strong'
  }
};

export function AnalysisResults({
  selectedTraits,
  onReset,
  onProceed
}: AnalysisResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto">

      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent-strong)] font-mono text-xs uppercase tracking-widest rounded-full mb-4">
          ✓ Sample Report Ready
        </div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">
          Your personalized wellness report
        </h2>
        <p className="text-[var(--text-secondary)]">
          {selectedTraits.length} categor{selectedTraits.length === 1 ? 'y' : 'ies'} analyzed. A certified counselor would review this with you before any action.
        </p>
      </div>

      <div className="space-y-4 mb-12">
        {selectedTraits.map((id, index) => {
          const data = traitData[id];
          if (!data) return null;
          const Icon = data.icon;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 border border-[var(--border-color)] bg-white flex flex-col md:flex-row gap-6 items-start md:items-center rounded-xl shadow-sm">

              <div className="w-12 h-12 rounded-lg border border-[var(--border-color)] bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{data.title}</h3>
                  <span className="px-2 py-0.5 bg-[#F4F8FB] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)] rounded">
                    {data.code}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded ${data.evidence === 'Strong' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {data.evidence} evidence
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {data.outcome}
                </p>
              </div>

              <div className="w-full md:w-48 shrink-0">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[var(--text-muted)]">Confidence</span>
                  <span className="text-[var(--accent)]">{data.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#F4F8FB] border border-[var(--border-color)] overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-[var(--accent)]" />

                </div>
              </div>
            </motion.div>);

        })}
      </div>

      {/* Next-step CTAs — Download PDF + Counselor + Pricing */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors rounded-md">
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors rounded-md">
          <Calendar className="w-4 h-4" /> Book counselor
        </button>
        <button
          onClick={onProceed}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent)] text-white font-mono text-xs font-semibold hover:bg-[var(--accent-strong)] transition-colors rounded-md shadow-sm shadow-[var(--accent-glow)]">

          See Pricing
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-transparent border border-[var(--border-color)] text-[var(--text-secondary)] font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-2 rounded-md">

          <RefreshCw className="w-4 h-4" />
          Start a new analysis
        </button>
      </div>
    </motion.div>);

}