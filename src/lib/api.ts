let refreshingPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
  if (refreshingPromise) return refreshingPromise;
  refreshingPromise = (async () => {
    try {
  const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token');
      const res = await fetch(`${apiUrl}/api/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!res.ok) throw new Error('Refresh failed');
      const data = await res.json();
      if (data?.access_token) localStorage.setItem('access_token', data.access_token);
    } finally {
      refreshingPromise = null;
    }
  })();
  return refreshingPromise;
}

export async function apiFetch(path: string, opts: RequestInit = {}): Promise<any> {
  const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const makeRequest = async (): Promise<Response> => {
    const token = localStorage.getItem('access_token');
    const headers = new Headers(opts.headers as any || {});
    if (!headers.get('Content-Type')) headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(`${apiUrl}${path}`, { ...opts, headers });
  };

  let res = await makeRequest();
  if (res.status === 401) {
    try {
      await refreshAccessToken();
      // retry once
      res = await makeRequest();
    } catch (e) {
      // refresh failed: clear tokens and let caller handle redirect/UX
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      throw new Error('Unauthorized');
    }
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export const apiGet = (path: string) => apiFetch(path, { method: 'GET' });
export const apiPost = (path: string, body?: any) => apiFetch(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
export const apiPut = (path: string, body?: any) => apiFetch(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined });
export const apiDelete = (path: string) => apiFetch(path, { method: 'DELETE' });
