import { createContext, useContext } from 'react';

export interface CurrentUser {
  name: string;
  email: string;
  isGuest: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  step: number;
  selectedTraits: string[];
  summary: string;
}

export interface AuthContextValue {
  user: CurrentUser | null;
  history: HistoryEntry[];
  signOut: () => void;
  saveHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const USER_KEY = 'gx_current_user';
export const HISTORY_KEY_PREFIX = 'gx_history_';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}