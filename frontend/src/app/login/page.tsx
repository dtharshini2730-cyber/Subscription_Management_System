'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockKeyhole, Mail, UserRound } from 'lucide-react';
import { SubsenseLogo } from '@/components/ui/SubsenseLogo';
import { ApiError, authApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isRegistering) {
        await authApi.register(name, email, password);
      }
      await login(email, password);
      router.replace('/');
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'Unable to sign in. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="text-sm text-stone-grey" role="status">Checking your session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex" aria-label="SUBSENSE home">
            <SubsenseLogo size="lg" variant="light" />
          </Link>
          <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-espresso">
            {isRegistering ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-stone-grey">
            {isRegistering
              ? 'Register to access the SUBSENSE customer portal.'
              : 'Sign in to continue to your SUBSENSE workspace.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="editorial-card rounded-2xl p-6 sm:p-8 space-y-5">
          {isRegistering && (
            <label className="block">
              <span className="block text-xs font-semibold text-espresso mb-2">Name</span>
              <span className="relative block">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-grey" />
                <input
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-blush bg-white pl-10 pr-3 py-2.5 text-sm text-espresso focus:outline-none focus:border-crimson"
                />
              </span>
            </label>
          )}

          <label className="block">
            <span className="block text-xs font-semibold text-espresso mb-2">Email address</span>
            <span className="relative block">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-grey" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-blush bg-white pl-10 pr-3 py-2.5 text-sm text-espresso focus:outline-none focus:border-crimson"
              />
            </span>
          </label>

          <label className="block">
            <span className="block text-xs font-semibold text-espresso mb-2">Password</span>
            <span className="relative block">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-grey" />
              <input
                type="password"
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-blush bg-white pl-10 pr-3 py-2.5 text-sm text-espresso focus:outline-none focus:border-crimson"
              />
            </span>
          </label>

          {isRegistering && (
            <p className="text-xs text-stone-grey">
              Use at least 8 characters with uppercase, lowercase, and a special character.
              Public registration creates a Customer account.
            </p>
          )}

          {error && (
            <p className="rounded-lg border border-crimson/30 bg-crimson/5 px-3 py-2 text-sm text-crimson" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-burgundy px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-crimson disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? (isRegistering ? 'Creating account...' : 'Signing in...')
              : (isRegistering ? 'Create account' : 'Sign in')}
          </button>

          <p className="text-center text-sm text-stone-grey">
            {isRegistering ? 'Already have an account?' : 'New to SUBSENSE?'}{' '}
            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsRegistering(!isRegistering);
              }}
              className="font-semibold text-burgundy hover:text-crimson"
            >
              {isRegistering ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-stone-grey">
          Sign-in access is verified by the SUBSENSE API.
        </p>
      </section>
    </main>
  );
}
