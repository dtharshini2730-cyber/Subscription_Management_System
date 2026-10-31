'use client';

import React, { FormEvent, useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { validatePasswordPolicy } from '@/lib/validation';
import { Lock, Users, CheckCircle2, XCircle, Building2 } from 'lucide-react';
import { ApiError, authApi } from '@/lib/api';

export default function SettingsPage() {
  const { canCreateStaffAccounts } = useAuth();
  const [passwordInput, setPasswordInput] = useState('Brightloop@2026');
  const [staffFormOpen, setStaffFormOpen] = useState(false);
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [isCreatingStaff, setIsCreatingStaff] = useState(false);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [staffSuccess, setStaffSuccess] = useState<string | null>(null);
  const policyCheck = validatePasswordPolicy(passwordInput);

  async function handleCreateStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStaffError(null);
    setStaffSuccess(null);
    setIsCreatingStaff(true);

    try {
      await authApi.registerStaff(staffName, staffEmail, staffPassword);
      setStaffSuccess(`Staff account created for ${staffEmail}.`);
      setStaffName('');
      setStaffEmail('');
      setStaffPassword('');
      setStaffFormOpen(false);
    } catch (error) {
      setStaffError(
        error instanceof ApiError ? error.message : 'Unable to create the staff account.',
      );
    } finally {
      setIsCreatingStaff(false);
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
        <div className="pb-6 border-b border-blush">
          <h1 className="text-2xl font-extrabold text-espresso tracking-tight">
            Platform Settings &amp; Security Governance
          </h1>
          <p className="text-xs text-stone-grey mt-1">
            Configure organization details, staff access controls, and enterprise security policies.
          </p>
        </div>

        {/* Company Profile Card */}
        <div className="editorial-card rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-blush">
            <Building2 className="w-4 h-4 text-crimson" />
            <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
              Company Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-grey font-semibold mb-1">Company Legal Name</label>
              <input
                type="text"
                defaultValue="Brightloop Software Ltd"
                className="w-full px-3 py-1.5 rounded-lg border border-blush bg-ivory text-espresso font-medium focus:outline-none focus:border-crimson"
              />
            </div>
            <div>
              <label className="block text-stone-grey font-semibold mb-1">Default Base Currency</label>
              <input
                type="text"
                defaultValue="USD ($)"
                disabled
                className="w-full px-3 py-1.5 rounded-lg border border-blush bg-ivory-dark text-espresso font-mono"
              />
            </div>
            <div>
              <label className="block text-stone-grey font-semibold mb-1">Billing Support Email</label>
              <input
                type="email"
                defaultValue="billing@brightloop.io"
                className="w-full px-3 py-1.5 rounded-lg border border-blush bg-ivory text-espresso focus:outline-none focus:border-crimson"
              />
            </div>
            <div>
              <label className="block text-stone-grey font-semibold mb-1">Tax Registration Identifier</label>
              <input
                type="text"
                defaultValue="US-EIN-984210442"
                className="w-full px-3 py-1.5 rounded-lg border border-blush bg-ivory text-espresso font-mono focus:outline-none focus:border-crimson"
              />
            </div>
          </div>
        </div>

        {/* Password Policy Governance Card */}
        <div className="editorial-card rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-blush">
            <Lock className="w-4 h-4 text-crimson" />
            <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
              Security: Mandatory Password Policy
            </h3>
          </div>

          <p className="text-xs text-stone-grey">
            Enforced policy rule: More than 8 characters (&gt;8 chars, i.e. 9+), uppercase, lowercase, and special character.
          </p>

          <div className="p-4 rounded-xl bg-ivory border border-blush space-y-3">
            <label className="block text-xs font-bold text-espresso">
              Test Password Compliance Engine:
            </label>
            <input
              type="text"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-blush font-mono text-espresso focus:outline-none focus:border-crimson"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-white border border-blush">
                <span>&gt; 8 Characters:</span>
                {policyCheck.minLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-crimson" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white border border-blush">
                <span>Uppercase (A-Z):</span>
                {policyCheck.hasUppercase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-crimson" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white border border-blush">
                <span>Lowercase (a-z):</span>
                {policyCheck.hasLowercase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-crimson" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white border border-blush">
                <span>Special Char:</span>
                {policyCheck.hasSpecialChar ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-crimson" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-blush">
              <span className="text-xs font-bold text-espresso">Compliance Status:</span>
              <StatusBadge status={policyCheck.isValid ? 'ACTIVE' : 'OVERDUE'} size="sm" />
            </div>
          </div>
        </div>

        {/* Staff Administration Card (Admin Only) */}
        <div className="editorial-card rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blush">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-burgundy" />
              <h3 className="text-sm font-bold text-espresso uppercase tracking-wider">
                Staff Account Administration
              </h3>
            </div>
            <StatusBadge status={canCreateStaffAccounts ? 'ACTIVE' : 'DRAFT'} size="sm" />
          </div>

          <p className="text-xs text-stone-grey">
            Only administrators can add internal staff members and assign permission sets.
          </p>

          {staffSuccess && (
            <p className="text-sm text-emerald-700" role="status">{staffSuccess}</p>
          )}
          {staffError && (
            <p className="text-sm text-crimson" role="alert">{staffError}</p>
          )}
          <Button
            variant="outline"
            size="sm"
            disabled={!canCreateStaffAccounts}
            onClick={() => {
              setStaffError(null);
              setStaffSuccess(null);
              setStaffFormOpen(!staffFormOpen);
            }}
            className="text-xs"
          >
            {staffFormOpen ? 'Cancel' : 'Create Staff Account'}
          </Button>
          {staffFormOpen && canCreateStaffAccounts && (
            <form onSubmit={handleCreateStaff} className="max-w-lg space-y-3 rounded-lg border border-blush bg-ivory p-4">
              <label className="block text-xs font-semibold text-espresso">
                Staff name
                <input
                  required
                  autoComplete="name"
                  value={staffName}
                  onChange={(event) => setStaffName(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-blush bg-white px-3 py-2 font-normal"
                />
              </label>
              <label className="block text-xs font-semibold text-espresso">
                Staff email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={staffEmail}
                  onChange={(event) => setStaffEmail(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-blush bg-white px-3 py-2 font-normal"
                />
              </label>
              <label className="block text-xs font-semibold text-espresso">
                Temporary password
                <input
                  required
                  type="password"
                  autoComplete="new-password"
                  value={staffPassword}
                  onChange={(event) => setStaffPassword(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-blush bg-white px-3 py-2 font-normal"
                />
              </label>
              <p className="text-xs text-stone-grey">
                The backend enforces password complexity and administrator permissions.
              </p>
              <Button type="submit" size="sm" isLoading={isCreatingStaff} className="text-xs">
                Create account
              </Button>
            </form>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
