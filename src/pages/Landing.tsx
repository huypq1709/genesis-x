import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EvolutionShift } from '../components/EvolutionShift';
import { Capabilities } from '../components/Capabilities';
import { HowItWorks } from '../components/HowItWorks';
import { Vision } from '../components/Vision';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { OnboardingTour } from '../components/OnboardingTour';

/* FIX: Landing uses bright palette, includes first-visit guided tour. */

export function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <EvolutionShift />
        <Capabilities />
        <HowItWorks />
        <Vision />
        <section id="cta-section">
          <CTA />
        </section>
      </main>
      <Footer />
      <OnboardingTour />
    </div>);

}