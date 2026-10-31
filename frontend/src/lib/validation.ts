import { PasswordPolicyCheck, UserRole } from '@/types';

/**
 * Validates password complexity per SUBSENSE security standards:
 * - More than 8 characters (> 8, i.e., at least 9 characters)
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one special character
 */
export function validatePasswordPolicy(password: string): PasswordPolicyCheck {
  const minLength = password.length > 8; // Strictly MORE THAN 8 characters
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);

  return {
    minLength,
    hasUppercase,
    hasLowercase,
    hasSpecialChar,
    isValid: minLength && hasUppercase && hasLowercase && hasSpecialChar,
  };
}

/**
 * Validates standard email address format
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validates role-based permission authority:
 * - Admin can perform all actions including creating staff accounts, setting discounts & taxes.
 * - Staff can perform operational actions (quotes, customers, subscriptions, invoices).
 * - Customer can only view/pay their own subscriptions and invoices.
 */
export function canConfigureTaxesAndDiscounts(role: UserRole): boolean {
  return role === 'ADMIN';
}

export function canCreateStaffAccounts(role: UserRole): boolean {
  return role === 'ADMIN';
}

export function canManageQuotations(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'STAFF';
}

export function canTriggerBillingRun(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'STAFF';
}
