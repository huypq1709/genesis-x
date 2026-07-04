import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Database as DatabaseIcon, Dna, Search } from 'lucide-react';

export function Database() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
            <DatabaseIcon className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
            Platform Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
          Cross-Species Gene Database
        </h1>

        <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed mb-8 text-[var(--text-primary)]">
            The foundation of GENESIS X is a comprehensive genetic repository
            containing over 120,000 reference sequences drawn from curated
            public databases (ClinVar, gnomAD, dbSNP) plus selected
            cross-species markers used to contextualize human variants.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Dna className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Variant Catalog
              </h3>
              <p className="text-sm">
                Cataloging well-characterized variants tied to nutrition,
                fitness, longevity, and screening-relevant traits.
              </p>
            </div>
            <div className="p-6 border border-[var(--border-color)] bg-white rounded-xl">
              <Search className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Cognitive Mapping
              </h3>
              <p className="text-sm">
                Curated reference markers related to memory, focus, and
                sleep, mapped against peer-reviewed studies.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            How we source our data
          </h2>
          <p className="mb-6">
            Every variant in our report is backed by a citation to a
            peer-reviewed publication. We do not invent associations, and we
            clearly mark every insight with the strength of its evidence
            (strong, moderate, or preliminary).
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 mt-12">
            Continuous curation
          </h2>
          <p>
            Our science team reviews the latest literature every quarter and
            updates the report whenever a new, replicated finding changes the
            guidance for one of our customers.
          </p>
        </div>
      </main>
      <Footer />
    </div>);

}