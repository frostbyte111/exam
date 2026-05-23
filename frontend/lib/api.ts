const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  // This fires at build time if the variable is missing — you see it in
  // Railway build logs immediately rather than getting a silent localhost error.
  throw new Error(
    'NEXT_PUBLIC_API_URL is not set. ' +
    'Add it to the frontend service Variables tab in Railway before deploying.'
  );
}

const BASE = BASE_URL.replace(/\/$/, '');

export async function api<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, ...rest } = options;
  const headers: Record<string, string> = {
    ...(rest.headers as Record<string, string>),
  };
  if (rest.body) headers['Content-Type'] = 'application/json';
  if (token)     headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { 
    credentials: 'include', 
    cache: 'no-store', // Fix: Force Next.js and browser to NEVER cache API responses
    ...rest, 
    headers: {
      ...headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });

  if (res.status === 204) return null as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
  return data as T;
}

// Stores the JWT in sessionStorage as a Bearer token fallback.
// The httpOnly cookie handles auth for same-origin requests automatically.
// The Bearer header covers cross-domain (different Railway subdomains in prod).
export const tokenStore = {
  get: (): string | undefined =>
    typeof window !== 'undefined' ? sessionStorage.getItem('jwt') ?? undefined : undefined,
  set: (t: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', t);
      // Sync to cookie so Next.js middleware can read it on the frontend domain
      document.cookie = `auth_token=${t}; path=/; max-age=604800; samesite=lax; secure`;
    }
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },
};
