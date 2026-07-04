import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

/* FIX (Van Chuong): added a real sign-in / account mechanism that saves
   the user's analysis history to localStorage. The form now supports both
   "Continue as guest" (instant) and "Create account" (saves history). */

interface CTAProps {
  onAuthSuccess?: (user: { name: string; email: string; isGuest: boolean }) => void;
}

export function CTA({ onAuthSuccess }: CTAProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (mode === 'signup' && !name) {
      setError('Please enter your name.');
      return;
    }
    // Local-only auth — stores the account so history can be saved later.
    const users = JSON.parse(localStorage.getItem('gx_users') || '{}');
    if (mode === 'signup') {
      if (users[email]) {
        setError('An account with this email already exists. Try signing in.');
        return;
      }
      users[email] = { name, email, password, createdAt: Date.now() };
      localStorage.setItem('gx_users', JSON.stringify(users));
      localStorage.setItem('gx_current_user', JSON.stringify({ name, email, isGuest: false }));
      onAuthSuccess?.({ name, email, isGuest: false });
    } else {
      if (!users[email] || users[email].password !== password) {
        setError('Email or password is incorrect.');
        return;
      }
      const u = users[email];
      localStorage.setItem('gx_current_user', JSON.stringify({ name: u.name, email, isGuest: false }));
      onAuthSuccess?.({ name: u.name, email, isGuest: false });
    }
    navigate('/start');
  };

  const handleGuest = () => {
    const guest = { name: 'Guest', email: '', isGuest: true };
    localStorage.setItem('gx_current_user', JSON.stringify(guest));
    onAuthSuccess?.(guest);
    navigate('/start');
  };

  return (
    <section className="py-20 border-t border-[var(--border-color)] bg-gradient-to-br from-[var(--accent-soft)] via-white to-[#F4F8FB] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--border-color)] mb-4">
            <Lock className="w-3 h-3 text-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent-strong)] tracking-widest uppercase">
              Free · Secure · Counselor-reviewed
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
            Create your free account
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Save your analysis history, pick up where you left off, and consult a
            counselor anytime. Your data is encrypted and never sold.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl shadow-[var(--accent-glow)] border border-[var(--border-color)] p-8">
          {/* Mode toggle */}
          <div className="flex bg-[#F4F8FB] rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-mono uppercase tracking-widest rounded-md transition-colors ${mode === 'signup' ? 'bg-white text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)]'}`}>

              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 text-sm font-mono uppercase tracking-widest rounded-md transition-colors ${mode === 'signin' ? 'bg-white text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)]'}`}>

              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' &&
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F4F8FB] border border-[var(--border-color)] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] rounded-md" />

              </div>
            }
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F4F8FB] border border-[var(--border-color)] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] rounded-md" />

            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F4F8FB] border border-[var(--border-color)] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] rounded-md" />

            </div>

            {error &&
              <div className="text-xs text-[var(--danger)] bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            }

            <button
              type="submit"
              className="w-full py-3 bg-[var(--accent)] text-white font-mono text-sm font-semibold hover:bg-[var(--accent-strong)] transition-colors flex items-center justify-center gap-2 rounded-md shadow-md shadow-[var(--accent-glow)]">

              {mode === 'signup' ? 'Create Account' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[var(--border-color)]" />
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
              or
            </span>
            <div className="h-[1px] flex-1 bg-[var(--border-color)]" />
          </div>

          <button
            type="button"
            onClick={handleGuest}
            className="w-full py-3 bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors rounded-md">

            Continue as guest (no history saved)
          </button>

          <p className="mt-4 text-[10px] text-center text-[var(--text-muted)] font-mono uppercase tracking-widest">
            Conceptual demo · No real accounts are created on a server.
          </p>
        </div>
      </div>
    </section>);

}