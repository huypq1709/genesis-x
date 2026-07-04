import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Cpu, Activity, Zap } from 'lucide-react';

export function Simulation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <Cpu className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Platform Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
          Analysis Engine
        </h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed mb-8 text-[var(--text-primary)]">
            Our analysis engine combines variant annotation, evidence
            weighting, and personalized rule sets to produce a wellness report
            tailored to your specific DNA — not a generic list of risks.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Activity className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Evidence weighting
              </h3>
              <p className="text-sm">
                Each insight is scored by the strength and replication of the
                underlying science — never presented as absolute.
              </p>
            </div>
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Zap className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Personalized rules
              </h3>
              <p className="text-sm">
                Combinations of variants are interpreted together, so the
                report reflects how your specific profile interacts.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            What we don't do
          </h2>
          <p className="mb-6">
            We do not predict the future, recommend unproven supplements, or
            promise any form of genetic "optimization". The report is a
            starting point for conversations with your doctor — never a
            replacement for one.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Continuous improvement
          </h2>
          <p>
            We re-run the analysis whenever the underlying science changes, so
            your dashboard always reflects the latest peer-reviewed evidence
            that applies to your DNA.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}