import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ShieldCheck, Mail } from 'lucide-react';

/* FIX: Brightened footer, added email newsletter signup for trust signal. */

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border-color)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Logo
              to="/"
              size={28}
              wordmarkClassName="text-lg"
              className="mb-6" />


            <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">
              Read-only genetic analysis turned into a clear, evidence-based
              wellness report. Reviewed by certified counselors, protected by
              HIPAA-grade encryption.
            </p>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest mb-4">
              <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
              CLIA-certified · HIPAA-compliant
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 max-w-sm">

              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-[#F4F8FB] border border-[var(--border-color)] pl-9 pr-3 py-2.5 text-sm rounded-md focus:outline-none focus:border-[var(--accent)]" />

              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[var(--accent)] text-white font-mono text-xs font-semibold rounded-md hover:bg-[var(--accent-strong)] transition-colors">

                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[var(--text-primary)] uppercase tracking-widest mb-6">
              Report
            </h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link to="/database" className="hover:text-[var(--accent)] transition-colors">Gene Database</Link></li>
              <li><Link to="/simulation" className="hover:text-[var(--accent)] transition-colors">AI Simulation</Link></li>
              <li><Link to="/laboratory" className="hover:text-[var(--accent)] transition-colors">Laboratory</Link></li>
              <li><Link to="/biosecurity" className="hover:text-[var(--accent)] transition-colors">Biosecurity</Link></li>
              <li><Link to="/pricing" className="hover:text-[var(--accent)] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[var(--text-primary)] uppercase tracking-widest mb-6">
              Trust & Legal
            </h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link to="/bioethics" className="hover:text-[var(--accent)] transition-colors">Bioethics</Link></li>
              <li><Link to="/privacy" className="hover:text-[var(--accent)] transition-colors">DNA Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            © 2026 GENESIS X. All rights reserved.
          </p>
          <p className="text-[10px] text-[var(--text-muted)] font-mono text-center md:text-right max-w-md uppercase tracking-widest">
            Disclaimer: Conceptual demo. No real DNA modification or medical
            services are offered. Reports are educational and not a substitute
            for medical advice.
          </p>
        </div>
      </div>
    </footer>);

}