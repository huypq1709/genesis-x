import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Microscope, TestTube, Layers } from 'lucide-react';

export function Laboratory() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <Microscope className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Facilities
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
          Laboratory Standards
        </h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed mb-8 text-[var(--text-primary)]">
            Every sample is processed in CLIA-certified, CAP-accredited partner
            laboratories that follow the same quality standards used in
            clinical diagnostics.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <TestTube className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Sample handling
              </h3>
              <p className="text-sm">
                Bar-coded chain-of-custody from kit shipment to report
                delivery, with a documented audit trail at every step.
              </p>
            </div>
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Layers className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Quality control
              </h3>
              <p className="text-sm">
                Each batch is validated against control samples; any failing
                run is re-sequenced before a report is generated.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Privacy by design
          </h2>
          <p className="mb-6">
            Samples are processed in secured facilities with strict access
            controls. Raw genomic data is encrypted, never sold, and is
            permanently destroyed at your request.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Turnaround time
          </h2>
          <p>
            Most reports are delivered within 48 hours of the lab receiving
            your sample. If your sample needs to be re-collected for any
            reason, we notify you immediately and ship a free replacement kit.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}