import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Fingerprint, EyeOff, FileKey } from 'lucide-react';

export function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <Fingerprint className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Privacy
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
            DNA Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-sm font-mono mb-8 text-[var(--text-muted)]">
            Last updated: June 19, 2026
          </p>

          <p className="text-lg leading-relaxed mb-8 text-[var(--text-primary)]">
            Your genome is the most personal data you have. This policy
            explains exactly what we collect, how we use it, and how you
            stay in control.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <FileKey className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                What we store
              </h3>
              <p className="text-sm">
                Encrypted variant calls (the differences we find), your
                contact details, and your report history. Raw sequencing
                data is deleted after the report is delivered.
              </p>
            </div>
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <EyeOff className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                What we never do
              </h3>
              <p className="text-sm">
                We never sell, license, or share your data with insurers,
                employers, advertisers, or third-party researchers without
                your explicit, written consent.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Your rights
          </h2>
          <p className="mb-6">
            You can request a copy of your data, correct inaccuracies, or
            permanently delete everything we hold — at any time, free of
            charge. Deletion requests are processed within 30 days.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Contact our DPO
          </h2>
          <p>
            Questions about your data? Email{' '}
            <span className="text-[var(--accent)] font-mono">privacy@genesisx.demo</span>
            {' '}and a human will respond within two business days.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}