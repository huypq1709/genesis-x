import React from 'react';
import { motion } from 'framer-motion';
import { DnaHelix3D } from './DnaHelix3D';
import { ChevronRight, ShieldCheck, Microscope, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * FIX: Rewritten to (1) clarify what the product actually sells — a
 * personalized genetic analysis & wellness report, NOT human gene editing,
 * addressing "khong hieu product dang selling la gi"; (2) brighten the
 * palette via updated classes; (3) add product illustrations (icons + 3D
 * helix); (4) emphasize the safe, advisory framing called out by reviewers.
 */
export function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#F4F8FB] via-white to-[#EAF2F7]">
      {/* Soft grid backdrop */}
      <div className="absolute inset-0 bg-grid-soft opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-[var(--accent-soft)] rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-[var(--accent-soft)] rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start">

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-[var(--border-color)] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--text-secondary)] tracking-widest uppercase">
              Personalized Genetic Wellness Analysis
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 text-[var(--text-primary)]">
            Know your genes.<br />
            <span className="text-[var(--accent)]">Shape your health.</span>
          </h1>

          {/* FIX: Clear product description — addresses "khong hieu product la gi" */}
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed">
            <strong className="text-[var(--text-primary)]">GENESIS X</strong> reads
            your DNA and turns it into a clear, personalized{' '}
            <strong className="text-[var(--text-primary)]">wellness report</strong>{' '}
            — covering disease-risk screening, nutrition, fitness, and longevity
            — reviewed by certified genetic counselors.{' '}
            <span className="inline-block px-2 py-0.5 mt-1 bg-[var(--accent-soft)] text-[var(--accent-strong)] text-xs font-mono uppercase tracking-widest rounded">
              Read-only · Non-invasive · Advisory only
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={() => navigate('/start')}
              className="px-8 py-4 bg-[var(--accent)] text-white font-mono text-sm font-semibold hover:bg-[var(--accent-strong)] transition-colors flex items-center justify-center gap-2 group rounded-md shadow-md shadow-[var(--accent-glow)]">

              Start Your DNA Analysis
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center rounded-md shadow-sm">

              How It Works
            </a>
          </div>

          {/* Trust badges — make the offering feel concrete */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-xl mb-10">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Microscope className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>Lab-validated sequencing</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>HIPAA-grade privacy</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>Counselor-reviewed</span>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t border-[var(--border-color)] pt-8 w-full">
            <div>
              <div className="font-mono text-2xl text-[var(--accent)] mb-1">120+</div>
              <div className="text-xs text-[var(--text-secondary)] font-mono uppercase">
                Wellness traits analyzed
              </div>
            </div>
            <div className="w-[1px] h-10 bg-[var(--border-color)]" />
            <div>
              <div className="font-mono text-2xl text-[var(--text-primary)] mb-1">
                99.9%
              </div>
              <div className="text-xs text-[var(--text-secondary)] font-mono uppercase">
                Sequencing accuracy
              </div>
            </div>
            <div className="w-[1px] h-10 bg-[var(--border-color)]" />
            <div>
              <div className="font-mono text-2xl text-[var(--text-primary)] mb-1">
                48h
              </div>
              <div className="text-xs text-[var(--text-secondary)] font-mono uppercase">
                Average turnaround
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:flex lg:col-span-5 justify-center relative self-stretch items-center">

          {/* FIX: Added a soft glass frame around the 3D helix so it reads as an
              illustration/product image on the light background (Phu Minh feedback).
              Container is sized to match the visual weight of the left text column. */}
          <div className="relative w-full max-w-[360px] aspect-[3/4] max-h-[520px]">
            {/* Helix container with NO frame, NO shadow, NO background — the
                canvas itself is transparent so the section gradient + grid
                backdrop show through completely. */}
            <div className="relative w-full h-full bg-transparent">
              <DnaHelix3D />
            </div>
            {/* Floating stat card — adds product illustration.
                Anchored to bottom-right so it never gets clipped on narrow viewports. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white border border-[var(--border-color)] rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-3 max-w-[240px]"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-widest">
                  Sample insight
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  Lactose sensitivity detected
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>);

}