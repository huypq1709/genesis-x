import React from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  Brain,
  Hourglass,
  ThermometerSun,
  ShieldAlert } from
'lucide-react';

/* FIX: Product scope is now a wellness report, not human gene editing —
   descriptions rewritten to match the advisory framing called out by
   reviewers (Thu Thao, Sang Truong Phuoc). Visual cards brightened. */

const capabilities = [
{
  icon: <Dumbbell className="w-6 h-6" />,
  title: 'Fitness response',
  desc: 'See how your body likely responds to endurance vs. strength training based on ACTN3 and related markers.',
  id: 'FIT-01'
},
{
  icon: <Brain className="w-6 h-6" />,
  title: 'Cognitive profile',
  desc: 'A research-grade snapshot of memory, focus, and sleep-related markers — explained in plain language.',
  id: 'COG-02'
},
{
  icon: <Hourglass className="w-6 h-6" />,
  title: 'Longevity insights',
  desc: 'Understand your inherited telomere-related tendencies and which lifestyle levers matter most for you.',
  id: 'LON-03'
},
{
  icon: <ThermometerSun className="w-6 h-6" />,
  title: 'Nutrition fit',
  desc: 'Personalized guidance on caffeine, lactose, gluten, and macro sensitivities — backed by peer-reviewed studies.',
  id: 'NUT-04'
},
{
  icon: <ShieldAlert className="w-6 h-6" />,
  title: 'Risk screening',
  desc: 'Optional screening for hereditary conditions (BRCA, cardiac, etc.) reviewed by a certified counselor.',
  id: 'RSK-05'
}];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
              Your report covers
            </span>
            <span className="h-[1px] flex-1 bg-[var(--border-color)] max-w-[200px]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight text-[var(--text-primary)]">
            Five categories that actually
            <br />
            <span className="text-[var(--accent)]">change daily decisions.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mt-4">
            Every GENESIS X report covers five evidence-backed wellness categories —
            no hype, no “upgrade” promises, just actionable science.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {capabilities.map((cap, index) =>
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-8 border border-[var(--border-color)] bg-white hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)] transition-all group relative rounded-xl">

              <div className="absolute top-4 right-4 font-mono text-xs text-[var(--text-muted)] opacity-70">
                {cap.id}
              </div>
              <div className="w-12 h-12 bg-[var(--accent-soft)] border border-[var(--border-color)] rounded-lg flex items-center justify-center mb-6 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                {cap.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{cap.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}