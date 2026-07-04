import React, { useEffect, useState, type ReactNode } from 'react';
import {
  AuthContext,
  USER_KEY,
  HISTORY_KEY_PREFIX,
  type CurrentUser,
  type HistoryEntry,
  type AuthContextValue } from
'./authContextValue';

/* FIX (Van Chuong): Added real (local-only) auth + per-user analysis
   history persistence via localStorage. Split context value into its own
   file so the hook and provider can be in separate modules. */

export function AuthProvider({ children }: {children: ReactNode;}) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const refreshUser = () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      const u = raw ? JSON.parse(raw) as CurrentUser : null;
      setUser(u);
      if (u && !u.isGuest) {
        const h = localStorage.getItem(HISTORY_KEY_PREFIX + u.email);
        setHistory(h ? JSON.parse(h) : []);
      } else {
        setHistory([]);
      }
    } catch {
      setUser(null);
      setHistory([]);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const signOut = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setHistory([]);
  };

  const saveHistory = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    if (!user || user.isGuest) return;
    const fullEntry: HistoryEntry = {
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      ...entry
    };
    const next = [fullEntry, ...history].slice(0, 20);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY_PREFIX + user.email, JSON.stringify(next));
  };

  const clearHistory = () => {
    if (!user) return;
    setHistory([]);
    if (!user.isGuest) {
      localStorage.removeItem(HISTORY_KEY_PREFIX + user.email);
    }
  };

  const value: AuthContextValue = {
    user,
    history,
    signOut,
    saveHistory,
    clearHistory,
    refreshUser };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>);

}