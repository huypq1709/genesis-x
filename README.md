# GENESIS X — Personalized DNA Wellness Reports

A modern, bright-themed React + Vite demo of a fictional genetic wellness
analysis platform. This is a **conceptual project** for educational and
design purposes only — no real DNA modification, sequencing, or medical
services are offered.

## Getting Started

1. `npm install`
2. `npm run dev` — local dev server
3. `npm run build` — production build

## What changed in this revision

The team gave feedback after the first review. Every comment was addressed:

- **Brighter UI** — full light palette (cyan accent on `#F4F8FB` / white).
- **Clearer product framing** — the site is now a *personalized wellness
  report*, not "human gene editing". All marketing copy reflects this.
- **Sign-in / account** — local-only auth via `localStorage` with guest
  mode, account menu, and a per-user history of analyses.
- **Onboarding tour** — a 3-step guided walkthrough that opens on the
  visitor's first visit (and can be reopened from the floating `?` button).
- **More illustrations** — `How It Works` is now an interactive
  step-through with bespoke SVG illustrations for each step.
- **Transparent pricing** — itemized value breakdown + FAQ on the pricing
  page; speculative "$120k instant edit" tier removed.
- **Ethics & safety** — `Bioethics`, `Privacy`, and `Biosecurity` pages
  rewritten around the read-only promise; new disclaimer in the footer.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Three.js (animated 3D DNA helix in the hero)
- Lucide React (icons)
- React Router DOM

## File map

```
src/
  App.tsx                  Routes + AuthProvider
  contexts/AuthContext.tsx local auth + history (localStorage)
  components/
    Navbar.tsx             Sticky nav with account menu
    Hero.tsx               Light hero with product framing + 3D helix
    EvolutionShift.tsx     "Insights, not interventions" comparison
    Capabilities.tsx       Report categories (fitness, nutrition, etc.)
    HowItWorks.tsx         Interactive 4-step viewer + SVG illustrations
    Vision.tsx             Focused single-message vision
    CTA.tsx                Sign-up / sign-in / guest mode
    OnboardingTour.tsx     First-visit guided tour
    Footer.tsx             Footer + newsletter signup
    DnaHelix3D.tsx         Three.js DNA helix
  pages/
    Landing.tsx
    StartAnalysis.tsx      5-step analysis flow
    Database.tsx
    Simulation.tsx
    Laboratory.tsx
    Biosecurity.tsx
    Bioethics.tsx
    Privacy.tsx
    Terms.tsx
    Pricing.tsx
```