export type UserRole = 'ADMIN' | 'STAFF' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  companyName?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
}

export interface PasswordPolicyCheck {
  minLength: boolean;      // > 8 characters (i.e. length >= 9)
  hasUppercase: boolean;   // [A-Z]
  hasLowercase: boolean;   // [a-z]
  hasSpecialChar: boolean; // special character
  isValid: boolean;
}
