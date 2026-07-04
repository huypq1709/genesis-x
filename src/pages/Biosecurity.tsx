import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';

export function Biosecurity() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Security
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
          Data Security
        </h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed mb-8 text-[var(--text-primary)]">
            Your genome is the most personal data you have. We treat it with
            the highest standards of encryption, access control, and audit.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Lock className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                End-to-end encryption
              </h3>
              <p className="text-sm">
                Data is encrypted in transit (TLS 1.3) and at rest (AES-256).
                Only you and your assigned counselor can decrypt it.
              </p>
            </div>
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <AlertTriangle className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                One-click deletion
              </h3>
              <p className="text-sm">
                You can permanently delete your data from our systems at any
                time. We confirm the deletion in writing within 30 days.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Access controls
          </h2>
          <p className="mb-6">
            Access to raw genomic data requires multi-factor authentication
            and is logged. Our staff is trained on HIPAA-grade data handling
            and bound by confidentiality agreements.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            We never sell your data
          </h2>
          <p>
            Your genetic data is yours. We do not sell, license, or share it
            with insurers, employers, advertisers, or third-party researchers
            without your explicit consent.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}