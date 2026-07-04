import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Microscope, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* FIX (Nguyen Duc Khai): "nen co HDSD khi moi vao".
   A first-visit guided tour that explains what the site does in 3 short
   steps. Persists dismissal via localStorage so it only shows once. */

const TOUR_KEY = 'gx_onboarding_seen';

const slides = [
{
  icon: Microscope,
  title: 'Welcome to GENESIS X',
  body: 'We turn your DNA into a clear, evidence-based wellness report — covering nutrition, fitness, longevity, and screening recommendations.',
  color: 'from-cyan-50 to-blue-50'
},
{
  icon: FileText,
  title: 'What you get',
  body: 'A personalized PDF + interactive dashboard, reviewed by a certified genetic counselor. We never modify your DNA — only read and interpret it.',
  color: 'from-blue-50 to-violet-50'
},
{
  icon: Sparkles,
  title: 'Ready to begin?',
  body: 'Sign up free to save your history, or continue as a guest. Your data stays private and encrypted end-to-end.',
  color: 'from-violet-50 to-cyan-50'
}];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem(TOUR_KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const close = (markSeen = true) => {
    if (markSeen) localStorage.setItem(TOUR_KEY, '1');
    setOpen(false);
  };

  const restart = () => {
    setStep(0);
    setOpen(true);
  };

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else {
      close();
      navigate('/start');
    }
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  if (!open) {
    // Floating "?" button to re-open the tour any time
    return (
      <button
        onClick={restart}
        aria-label="Show product tour"
        title="Show product tour"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)] hover:bg-[var(--accent-strong)] transition-colors flex items-center justify-center font-bold">

        ?
      </button>);

  }

  const slide = slides[step];
  const Icon = slide.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-color)]">

          <button
            onClick={() => close(true)}
            aria-label="Close tour"
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center z-10">

            <X className="w-4 h-4 text-[var(--text-muted)]" />
          </button>

          <div className={`bg-gradient-to-br ${slide.color} p-8 pt-10`}>
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto text-[var(--accent)]">
              <Icon className="w-8 h-8" />
            </div>
          </div>

          <div className="p-8">
            <div className="font-mono text-[10px] text-[var(--accent-strong)] uppercase tracking-widest mb-2">
              Step {step + 1} of {slides.length}
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              {slide.title}
            </h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              {slide.body}
            </p>

            {/* Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {slides.map((_, i) =>
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-[var(--accent)]' : 'w-1.5 bg-[var(--border-color)]'}`} />

              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => close(true)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">

                Skip
              </button>
              <div className="flex gap-2">
                {step > 0 &&
                  <button
                    onClick={prev}
                    className="flex items-center gap-1 px-4 py-2 rounded-md border border-[var(--border-color)] text-sm font-mono hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">

                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                }
                <button
                  onClick={next}
                  className="flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-mono font-semibold hover:bg-[var(--accent-strong)] transition-colors shadow-md shadow-[var(--accent-glow)]">

                  {step === slides.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}