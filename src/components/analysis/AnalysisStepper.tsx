import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisStepperProps {
  currentStep: number;
}

const steps = [
  'Provide Sample',
  'Select Traits',
  'Analyzing',
  'Report',
  'Pricing'];

export function AnalysisStepper({ currentStep }: AnalysisStepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[var(--border-color)] z-0" />

        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[var(--accent)] z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${currentStep / (steps.length - 1) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }} />

        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono transition-colors duration-300 ${isActive ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-md shadow-[var(--accent-glow)]' : isPast ? 'border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--border-color)] bg-white text-[var(--text-secondary)]'}`}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}>

                0{index + 1}
              </motion.div>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest absolute -bottom-6 whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[var(--accent)]' : isPast ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>

                {step}
              </span>
            </div>);

        })}
      </div>
    </div>);

}