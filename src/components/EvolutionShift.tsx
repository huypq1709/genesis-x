import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';

/* FIX: Reframed the comparison — earlier copy ("natural evolution vs.
   directed evolution", "rewrite the source code of life") was too
   aggressive and conflicted with the safety/ethics concerns raised by
   Sang Truong Phuoc & Thu Thao. Now reads as "What you can learn vs.
   what we actually do" — focused and grounded. */

export function EvolutionShift() {
  return (
    <section className="py-24 relative border-y border-[var(--border-color)] bg-[#F4F8FB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--border-color)] mb-4">
            <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
              What we deliver
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
            Insights, not interventions.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            We analyze your existing DNA — we never modify it. Here's how that
            differs from speculative "enhancement" services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Connector line — visible only on md+ */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-[var(--border-strong)] z-0" />
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[var(--border-color)] rounded-full items-center justify-center z-10 shadow-sm">
            <span className="text-[10px] font-mono text-[var(--text-secondary)] font-bold">
              VS
            </span>
          </div>

          {/* Speculative enhancement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-[var(--border-color)] bg-white relative overflow-hidden rounded-xl">

            <div className="absolute top-0 right-0 p-4 opacity-10 text-[var(--text-muted)]">
              <Eye size={120} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[var(--text-muted)]">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-secondary)]">
                Speculative “enhancement” services
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-muted)] font-mono mt-1">01</span>
                <span>Promise “upgrades” or rewrites to your DNA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-muted)] font-mono mt-1">02</span>
                <span>Based on hype, not peer-reviewed evidence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-muted)] font-mono mt-1">03</span>
                <span>Carry irreversible ethical and medical risks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-muted)] font-mono mt-1">04</span>
                <span>Often operate outside regulated frameworks</span>
              </li>
            </ul>
          </motion.div>

          {/* GENESIS X */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 border-2 border-[var(--accent)] bg-white relative overflow-hidden rounded-xl shadow-lg shadow-[var(--accent-glow)]">

            <div className="absolute top-0 right-0 p-4 opacity-10 text-[var(--accent)]">
              <Sparkles size={120} />
            </div>
            <div className="absolute top-0 left-0 px-3 py-1 bg-[var(--accent)] text-white text-[10px] font-mono uppercase tracking-widest rounded-br-md">
              GENESIS X
            </div>
            <div className="flex items-center gap-3 mb-6 mt-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Read-only genetic analysis
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-[var(--text-primary)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] font-mono mt-1 font-bold">01</span>
                <span>Reads and interprets the DNA you already have</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] font-mono mt-1 font-bold">02</span>
                <span>Grounded in peer-reviewed, replicated science</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] font-mono mt-1 font-bold">03</span>
                <span>Non-invasive — nothing about you is changed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] font-mono mt-1 font-bold">04</span>
                <span>CLIA-certified labs, HIPAA-grade data handling</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>);

}