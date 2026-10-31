'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authApi, authSessionExpiredEvent, clearAccessToken, getAccessToken, setAccessToken } from '@/lib/api';
import { ApiError } from '@/lib/api';
import { User, UserRole } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  retrySession: () => Promise<void>;
  isAdmin: boolean;
  isStaff: boolean;
  isCustomer: boolean;
  canConfigureDiscountsAndTaxes: boolean;
  canCreateStaffAccounts: boolean;
  canManageQuotations: boolean;
  canTriggerBillingRun: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return 'An unexpected authentication error occurred.';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const restoreSession = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setCurrentUser(null);
      setAuthError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setAuthError(null);
    try {
      setCurrentUser(await authApi.currentUser());
    } catch (error) {
      setCurrentUser(null);
      if (error instanceof ApiError && error.status !== 401) {
        setAuthError(getErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleExpiredSession = () => {
      setCurrentUser(null);
      setAuthError('Your session expired. Please sign in again.');
    };
    window.addEventListener(authSessionExpiredEvent, handleExpiredSession);
    return () => window.removeEventListener(authSessionExpiredEvent, handleExpiredSession);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const session = await authApi.login(email, password);
    setAccessToken(session.token);
    setCurrentUser(session.user);
    setAuthError(null);
  }, []);

  const logout = useCallback(() => {
    clearAccessToken();
    setCurrentUser(null);
    setAuthError(null);
  }, []);

  const currentRole = currentUser?.role ?? null;
  const isAdmin = currentRole === 'ADMIN';
  const isStaff = currentRole === 'STAFF';
  const isCustomer = currentRole === 'CUSTOMER';

  const value = useMemo<AuthContextType>(
    () => ({
      currentUser,
      currentRole,
      isAuthenticated: currentUser !== null,
      isLoading,
      authError,
      login,
      logout,
      retrySession: restoreSession,
      isAdmin,
      isStaff,
      isCustomer,
      canConfigureDiscountsAndTaxes: isAdmin,
      canCreateStaffAccounts: isAdmin,
      canManageQuotations: isAdmin || isStaff,
      canTriggerBillingRun: isAdmin || isStaff,
    }),
    [
      authError,
      currentRole,
      currentUser,
      isAdmin,
      isCustomer,
      isLoading,
      isStaff,
      login,
      logout,
      restoreSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
