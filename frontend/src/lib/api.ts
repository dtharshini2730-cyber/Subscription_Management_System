import type { User } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') ||
  'http://localhost:8000/api/v1';
const ACCESS_TOKEN_KEY = 'subsense.accessToken';
const SESSION_EXPIRED_EVENT = 'subsense:session-expired';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface LoginResponse {
  access_token?: string;
  token?: string;
  user?: ApiUser;
}

interface ProfileResponse {
  data?: {
    user?: ApiUser;
  };
}

export function getAccessToken(): string | null {
  return typeof window === 'undefined'
    ? null
    : window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

function getErrorMessage(body: unknown, fallback: string): string {
  if (typeof body !== 'object' || body === null || !('detail' in body)) {
    return fallback;
  }

  const detail = body.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === 'object' && item !== null && 'msg' in item) {
          return String(item.msg);
        }
        return String(item);
      })
      .join(' ');
  }
  return fallback;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  authenticated = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = authenticated ? getAccessToken() : null;
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      cache: 'no-store',
    });
  } catch {
    throw new ApiError(
      `Could not connect to the SUBSENSE API at ${API_BASE_URL}. Check the backend server and NEXT_PUBLIC_API_BASE_URL.`,
      0,
    );
  }

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && authenticated && token) {
      clearAccessToken();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    throw new ApiError(
      getErrorMessage(body, `Request failed with status ${response.status}.`),
      response.status,
    );
  }

  return body as T;
}

function toUser(user: ApiUser): User {
  const role = user.role.toUpperCase();
  if (role !== 'ADMIN' && role !== 'STAFF' && role !== 'CUSTOMER') {
    throw new ApiError('The API returned an unsupported user role.', 502);
  }
  if (!user.is_active) {
    throw new ApiError('This user account is inactive.', 403);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role,
    createdAt: user.created_at,
  };
}

export const authApi = {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await request<LoginResponse>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      false,
    );
    const token = response.access_token ?? response.token;
    if (!token || !response.user) {
      throw new ApiError('The API returned an incomplete login response.', 502);
    }
    return { token, user: toUser(response.user) };
  },

  async register(name: string, email: string, password: string): Promise<void> {
    await request(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      },
      false,
    );
  },

  async registerStaff(name: string, email: string, password: string): Promise<void> {
    await request('/auth/register-staff', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  async currentUser(): Promise<User> {
    const response = await request<ProfileResponse>('/auth/me');
    const user = response.data?.user;
    if (!user) {
      throw new ApiError('The API returned an incomplete profile response.', 502);
    }
    return toUser(user);
  },
};

export const authSessionExpiredEvent = SESSION_EXPIRED_EVENT;
