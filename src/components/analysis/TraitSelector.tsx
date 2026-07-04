import React from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  Brain,
  Heart,
  Apple,
  ShieldCheck,
  Check } from
'lucide-react';

interface TraitSelectorProps {
  selectedTraits: string[];
  onToggleTrait: (id: string) => void;
  onContinue: () => void;
}

/* FIX: traits now describe analysis categories (what the report will cover),
   not "enhancements". Descriptions softened to advisory framing. */

const traits = [
{
  id: 'FIT-01',
  icon: Dumbbell,
  title: 'Fitness response'
},
{
  id: 'COG-02',
  icon: Brain,
  title: 'Cognitive profile'
},
{
  id: 'HRT-03',
  icon: Heart,
  title: 'Cardio markers'
},
{
  id: 'NUT-04',
  icon: Apple,
  title: 'Nutrition fit'
},
{
  id: 'RSK-05',
  icon: ShieldCheck,
  title: 'Health-risk screening'
}];

export function TraitSelector({
  selectedTraits,
  onToggleTrait,
  onContinue
}: TraitSelectorProps) {
  const hasSelection = selectedTraits.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto">

      <div className="text-center mb-10 flex flex-col items-center">
        <div className="inline-block px-3 py-1 bg-[var(--accent-soft)] text-[var(--accent-strong)] text-[10px] font-mono uppercase tracking-widest rounded-full mb-3">
          Step 2 of 5
        </div>
        <h2 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">Choose what to analyze</h2>
        <p className="text-[var(--text-secondary)] mb-4 max-w-2xl">
          Pick the wellness categories you'd like covered in your report.
          You can change these later.
        </p>
        <div className="px-3 py-1 bg-white border border-[var(--border-color)] rounded-full text-xs font-mono text-[var(--accent-strong)]">
          {selectedTraits.length} / {traits.length} selected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {traits.map((trait) => {
          const isSelected = selectedTraits.includes(trait.id);
          const Icon = trait.icon;
          return (
            <button
              key={trait.id}
              onClick={() => onToggleTrait(trait.id)}
              role="switch"
              aria-checked={isSelected}
              className={`relative p-6 border-2 text-left transition-all duration-300 flex flex-col items-start rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${isSelected ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-md shadow-[var(--accent-glow)]' : 'border-[var(--border-color)] bg-white hover:border-[var(--accent)]'}`}>

              <div className="flex justify-between w-full mb-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${isSelected ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-[var(--accent-soft)] border-[var(--border-color)] text-[var(--accent)]'}`}>

                  <Icon className="w-5 h-5" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'border-[var(--border-color)] bg-white text-transparent'}`}>

                  <Check className="w-3 h-3" />
                </div>
              </div>
              <h3 className="font-bold mb-1 text-[var(--text-primary)]">{trait.title}</h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {trait.id}
              </span>
            </button>);

        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={!hasSelection}
          className={`px-8 py-4 font-mono text-sm font-semibold transition-all flex items-center gap-2 rounded-md ${hasSelection ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] cursor-pointer shadow-md shadow-[var(--accent-glow)]' : 'bg-white border border-[var(--border-color)] text-[var(--text-muted)] cursor-not-allowed opacity-60'}`}>

          Start Analysis
        </button>
      </div>
    </motion.div>);

}