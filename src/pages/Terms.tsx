import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FileText } from 'lucide-react';

export function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <FileText className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Legal
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">Terms of Use</h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-sm font-mono mb-8 text-[var(--text-muted)]">Last Updated: June 19, 2026</p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-8">
            1. Acceptance of Terms
          </h2>
          <p className="mb-6">
            By accessing the GENESIS X platform or generating a sample report,
            you agree to be bound by these Terms of Use.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-8">
            2. Fictional Nature of Project
          </h2>
          <p className="mb-6">
            <strong>DISCLAIMER:</strong> GENESIS X is a conceptual, fictional
            project. The services described (genetic wellness reports,
            counselor review, etc.) do not exist. This site is provided for
            educational and design demonstration only.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-8">
            3. Not Medical Advice
          </h2>
          <p className="mb-6">
            Any sample report is illustrative only. It is not a medical
            diagnosis, a treatment recommendation, or a substitute for advice
            from a qualified healthcare provider. Always consult a licensed
            clinician before making health decisions.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-8">
            4. No Genetic Modification
          </h2>
          <p className="mb-6">
            GENESIS X does not design, manufacture, or deliver any product
            that alters a person's DNA. All features described are read-only
            analysis of pre-existing genetic data.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-8">
            5. Limitation of Liability
          </h2>
          <p>
            Because GENESIS X is a conceptual demonstration, there is no
            liability arising from its use beyond what is required by
            applicable consumer-protection law.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}