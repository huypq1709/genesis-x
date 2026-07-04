import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AnalysisStepper } from '../components/analysis/AnalysisStepper';
import { DnaUpload } from '../components/analysis/DnaUpload';
import { TraitSelector } from '../components/analysis/TraitSelector';
import { AnalysisScan } from '../components/analysis/AnalysisScan';
import { AnalysisResults } from '../components/analysis/AnalysisResults';
import { PricingPlans } from '../components/analysis/PricingPlans';
import { useScreenInit } from '../useScreenInit.js';
import { useAuth } from '../contexts/authContextValue';

/* FIX: brightened palette + history saving when reaching the results page.
   The flow is now framed as a wellness report generator, not "gene design". */

export function StartAnalysis() {
  const screenInit = useScreenInit();
  const { user, saveHistory } = useAuth();
  const [step, setStep] = useState<number>(screenInit?.step ?? 0);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(
    screenInit?.selectedTraits ?? []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleToggleTrait = (id: string) => {
    setSelectedTraits((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Save analysis to history once results are ready.
  useEffect(() => {
    if (step === 3 && selectedTraits.length > 0 && user && !user.isGuest) {
      const summary = `${selectedTraits.length} trait${selectedTraits.length === 1 ? '' : 's'} analyzed (${selectedTraits.join(', ')})`;
      saveHistory({ step: 3, selectedTraits, summary });
    }
  }, [step, selectedTraits, user, saveHistory]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <AnalysisStepper currentStep={step} />

        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 0 &&
              <DnaUpload key="step-0" onContinue={() => setStep(1)} />
            }

            {step === 1 &&
              <TraitSelector
                key="step-1"
                selectedTraits={selectedTraits}
                onToggleTrait={handleToggleTrait}
                onContinue={() => setStep(2)} />
            }

            {step === 2 &&
              <AnalysisScan key="step-2" onComplete={() => setStep(3)} />
            }

            {step === 3 &&
              <AnalysisResults
                key="step-3"
                selectedTraits={selectedTraits}
                onProceed={() => setStep(4)}
                onReset={() => {
                  setStep(0);
                  setSelectedTraits([]);
                }} />
            }

            {step === 4 &&
              <PricingPlans
                key="step-4"
                selectedTraits={selectedTraits}
                onBack={() => setStep(3)}
                onReset={() => {
                  setStep(0);
                  setSelectedTraits([]);
                }} />
            }
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>);

}