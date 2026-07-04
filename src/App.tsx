import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { StartAnalysis } from './pages/StartAnalysis';
import { Database } from './pages/Database';
import { Simulation } from './pages/Simulation';
import { Laboratory } from './pages/Laboratory';
import { Biosecurity } from './pages/Biosecurity';
import { Bioethics } from './pages/Bioethics';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Pricing } from './pages/Pricing';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/start" element={<StartAnalysis />} />
          <Route path="/database" element={<Database />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/biosecurity" element={<Biosecurity />} />
          <Route path="/bioethics" element={<Bioethics />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>);

}