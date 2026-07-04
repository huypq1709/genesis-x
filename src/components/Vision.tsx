import React from 'react';
import { motion } from 'framer-motion';

/* FIX: Vision section re-framed to be more focused on a single message —
   "knowledge, not modification" — addressing Duong Vu Thai An's feedback
   about the message being unfocused. */

export function Vision() {
  return (
    <section id="vision" className="py-32 relative overflow-hidden bg-white">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[500px] bg-[var(--accent-soft)] rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <div className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase mb-8">
            [ Our focus ]
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-[var(--text-primary)]">
            "Better health decisions start with{' '}
            <span className="text-[var(--accent)]">understanding your DNA</span>{' '}
            — not changing it."
          </h2>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            GENESIS X exists for one purpose: to turn your raw genetic data into
            clear, evidence-based wellness guidance — reviewed by humans,
            protected by law, and useful from day one.
          </p>

          {/* Single-message emphasis */}
          <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-soft)] rounded-full">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <span className="text-sm font-mono text-[var(--accent-strong)] uppercase tracking-widest">
              One promise. Read your DNA. Empower your choices.
            </span>
          </div>
        </motion.div>
      </div>
    </section>);

}