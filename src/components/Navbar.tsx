import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, History } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../contexts/authContextValue';

/* FIX: Brightened palette + added account menu so users see they are
   signed in / can sign out (Van Chuong's login + history request). */

export function Navbar() {
  const navigate = useNavigate();
  const { user, signOut, history } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
  { name: 'Vision', href: '/#vision' },
  { name: 'Report', href: '/#capabilities' },
  { name: 'How It Works', href: '/#how-it-works' }];


  const headerBg = isScrolled ?
  'bg-white/85 backdrop-blur-md border-[var(--border-color)] shadow-sm' :
  'bg-transparent border-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${headerBg}`}>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo to="/" size={34} wordmarkClassName="text-xl" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">

              {link.name}
            </a>
          )}
          <Link
            to="/pricing"
            className="text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">

            Pricing
          </Link>

          {user ?
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--accent-soft)] border border-[var(--border-color)] text-sm hover:border-[var(--accent)] transition-colors">

                <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold">
                  {(user.name || user.email || 'G')[0].toUpperCase()}
                </div>
                <span className="text-[var(--text-primary)] max-w-[120px] truncate">
                  {user.isGuest ? 'Guest' : user.name || user.email.split('@')[0]}
                </span>
              </button>

              {accountMenuOpen &&
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 w-64 bg-white border border-[var(--border-color)] rounded-lg shadow-xl p-2">

                  <div className="px-3 py-2 border-b border-[var(--border-color)]">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                      Signed in as
                    </div>
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">
                      {user.isGuest ? 'Guest (no history)' : user.email}
                    </div>
                    {!user.isGuest &&
                      <div className="text-[10px] text-[var(--text-muted)] mt-1">
                        {history.length} saved report{history.length === 1 ? '' : 's'}
                      </div>
                    }
                  </div>

                  {!user.isGuest &&
                    <div className="py-1">
                      <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1">
                        <History className="w-3 h-3" /> Recent history
                      </div>
                      {history.length === 0 ?
                        <div className="px-3 py-2 text-xs text-[var(--text-muted)]">
                          No analyses yet
                        </div> :

                        <div className="max-h-40 overflow-y-auto">
                          {history.slice(0, 5).map((h) =>
                            <div key={h.id} className="px-3 py-2 hover:bg-[#F4F8FB] rounded text-xs text-[var(--text-secondary)]">
                              <div className="truncate">{h.summary}</div>
                              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                                {new Date(h.timestamp).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <button
                    onClick={() => {
                      signOut();
                      setAccountMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded text-sm text-[var(--text-secondary)] hover:bg-red-50 hover:text-[var(--danger)] transition-colors">

                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </motion.div>
              }
            </div> :

            <button
              onClick={() => {
                const el = document.getElementById('vision');
                if (el) {
                  document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-5 py-2.5 bg-white border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 rounded-md">

              Sign In
            </button>
          }

          <button
            onClick={() => navigate('/start')}
            className="px-5 py-2.5 bg-[var(--accent)] text-white font-mono text-sm font-semibold hover:bg-[var(--accent-strong)] transition-all duration-300 rounded-md shadow-sm shadow-[var(--accent-glow)]">

            Start Analysis
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-[var(--border-color)] shadow-lg p-6 flex flex-col gap-4">

          {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] py-2"
              onClick={() => setMobileMenuOpen(false)}>

              {link.name}
            </a>
          )}
          <Link
            to="/pricing"
            className="text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] py-2"
            onClick={() => setMobileMenuOpen(false)}>

            Pricing
          </Link>

          {user ?
            <div className="border-t border-[var(--border-color)] pt-4">
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] mb-3">
                <User className="w-4 h-4 text-[var(--accent)]" />
                {user.isGuest ? 'Guest' : user.email}
              </div>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-[var(--border-color)] text-[var(--text-secondary)] font-mono text-sm rounded-md hover:border-[var(--danger)] hover:text-[var(--danger)]">

                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div> :

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full px-5 py-3 border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)]">

              Sign In
            </button>
          }

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/start');
            }}
            className="mt-2 w-full px-5 py-3 bg-[var(--accent)] text-white font-mono text-sm font-semibold rounded-md shadow-sm">

            Start Analysis
          </button>
        </motion.div>
      }
    </header>);

}