import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnalysisScanProps {
  onComplete: () => void;
}

/* FIX: brightened palette + softer copy (no "scoring compatibility", no
   "synthetic traits") — describes what a real analysis pipeline does. */

const statusMessages = [
  'Validating your file...',
  'Aligning reads to the reference genome...',
  'Calling variants...',
  'Annotating with ClinVar & gnomAD...',
  'Cross-checking peer-reviewed evidence...',
  'Preparing your report...'];

export function AnalysisScan({ onComplete }: AnalysisScanProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  useEffect(() => {
    const duration = 4500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, currentStep / steps * 100);
      setProgress(newProgress);
      const newStatusIndex = Math.min(
        statusMessages.length - 1,
        Math.floor(newProgress / 100 * statusMessages.length)
      );
      setStatusIndex(newStatusIndex);
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, intervalTime);
    return () => clearInterval(timer);
  }, [onComplete]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="w-full max-w-xl mx-auto flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-[var(--border-color)] shadow-sm p-10">

      <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 border-2 border-[var(--border-color)] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]" />
        </motion.div>

        <motion.div
          className="absolute inset-4 border border-[var(--accent)]/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent)] rounded-full" />
        </motion.div>

        <div className="text-4xl font-mono font-bold text-[var(--accent)] text-glow">
          {Math.floor(progress)}%
        </div>
      </div>

      <div className="h-6 overflow-hidden relative w-full text-center">
        <motion.div
          key={statusIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-mono text-sm text-[var(--text-secondary)] absolute inset-0">

          &gt; {statusMessages[statusIndex]}
        </motion.div>
      </div>

      <div className="w-full h-1 bg-[var(--border-color)] mt-8 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-[var(--accent)]"
          style={{ width: `${progress}%` }} />

      </div>

      <p className="mt-6 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
        Conceptual demo · No real analysis is running
      </p>
    </motion.div>);

}