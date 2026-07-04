import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Scale, HeartHandshake, Globe } from 'lucide-react';

export function Bioethics() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <Scale className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Ethics
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
            Ethics & Responsibility
        </h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed mb-8 text-[var(--text-primary)]">
            We are read-only by design. We never modify your DNA, and we will
            never promise to "upgrade" you. Here's how we keep that promise.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <HeartHandshake className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Informed consent
              </h3>
              <p className="text-sm">
                Before any report is generated, you confirm in writing that
                you understand the report is educational — not a medical
                diagnosis.
              </p>
            </div>
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Globe className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Honest communication
              </h3>
              <p className="text-sm">
                We mark the strength of evidence behind every insight. We
                never inflate weak science into strong claims.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            No genetic modification
          </h2>
          <p className="mb-6">
            GENESIS X does not design, manufacture, or deliver any therapy
            that alters your DNA. We analyze the DNA you already have and
            return a wellness report. Period.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Oversight
          </h2>
          <p>
            An independent ethics advisory board reviews our marketing,
            report wording, and product roadmap every quarter to ensure we
            stay true to our read-only, advisory promise.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}