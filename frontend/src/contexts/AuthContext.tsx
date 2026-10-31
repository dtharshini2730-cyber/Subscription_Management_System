'use client';

import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  isAdmin: boolean;
  isStaff: boolean;
  isCustomer: boolean;
  canConfigureDiscountsAndTaxes: boolean;
  canCreateStaffAccounts: boolean;
  canManageQuotations: boolean;
  canTriggerBillingRun: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Defaults to Admin Sarah Jenkins

  const switchRole = (role: UserRole) => {
    const matched = mockUsers.find((u) => u.role === role) || mockUsers[0];
    setCurrentUser(matched);
  };

  const isAdmin = currentUser.role === 'ADMIN';
  const isStaff = currentUser.role === 'STAFF';
  const isCustomer = currentUser.role === 'CUSTOMER';

  const canConfigureDiscountsAndTaxes = isAdmin;
  const canCreateStaffAccounts = isAdmin;
  const canManageQuotations = isAdmin || isStaff;
  const canTriggerBillingRun = isAdmin || isStaff;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        switchRole,
        isAdmin,
        isStaff,
        isCustomer,
        canConfigureDiscountsAndTaxes,
        canCreateStaffAccounts,
        canManageQuotations,
        canTriggerBillingRun,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
