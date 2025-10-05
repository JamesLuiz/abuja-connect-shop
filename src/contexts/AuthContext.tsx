import { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'vendor' | 'admin';
  isVerified: boolean;
  phone?: string;
  location?: string;
  address?: string;
  bio?: string;
  joinDate?: string;
  totalOrders?: number;
  totalSpent?: number;
  storeRevenue?: number;
  storeRating?: number;
  completedSales?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'customer' | 'vendor') => Promise<boolean>;
  logout: () => Promise<void>;
  registerCustomer: (payload: any) => Promise<any>;
  registerVendor: (payload: any) => Promise<any>;
  googleClientId?: string | null;
  isAuthenticated: boolean;
  applyAuthResponse: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers = [
  {
    name: 'James Luiz',
    email: 'james.luiz@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    role: 'customer' as const,
    isVerified: true,
    phone: '+234 803 456 7890',
    location: 'Wuse 2, Abuja FCT',
    joinDate: 'January 2024',
    totalOrders: 24,
    totalSpent: 450000,
    password: 'password123' // Add a mock password for authentication
  },
  {
    name: 'John Doe',
    email: 'john.doe@techhub.ng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    role: 'vendor' as const,
    isVerified: true,
    phone: '+234 803 123 4567',
    location: 'Garki 2, Abuja FCT',
    joinDate: 'March 2023',
    storeRevenue: 2500000,
    storeRating: 4.8,
    completedSales: 156,
    password: 'password123' // Add a mock password
  },
  // Add other mock users if needed
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [googleClientId, setGoogleClientId] = useState<string | null>(() => {
    return null;
  });

  useEffect(() => {
    const loadConfig = async () => {
      try {
  const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiUrl}/api/auth/config`);
        if (!res.ok) return;
        const json = await res.json();
        if (json?.googleClientId) setGoogleClientId(json.googleClientId);
      } catch (e) {
        // ignore
      }
    };
    loadConfig();

    // Fetch protected profile only when an access token exists
    const loadProfile = async () => {
      try {
        const api = await import('@/lib/api');
        const profile = await api.apiGet('/api/users/profile');
        if (profile) {
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        }
      } catch (e: any) {
        // not authenticated or failed - handle unauthorized by clearing tokens and redirecting once
        if (e?.message === 'Unauthorized') {
          localStorage.removeItem(accessTokenKey);
          localStorage.removeItem(refreshTokenKey);
          localStorage.removeItem('user');
          // avoid redirect loop if already on login page
          try {
            if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
          } catch(_) {}
        }
      }
    };
    try {
      const token = localStorage.getItem(accessTokenKey);
      if (token) loadProfile();
    } catch (_) {}
  }, []);

  // Try to read tokens
  const accessTokenKey = 'access_token';
  const refreshTokenKey = 'refresh_token';

  const setAuthFromResponse = async (data: any) => {
    if (data?.access_token) localStorage.setItem(accessTokenKey, data.access_token);
    if (data?.refresh_token) localStorage.setItem(refreshTokenKey, data.refresh_token);
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return;
    }
    try {
      const api = await import('@/lib/api');
      const profile = await api.apiGet('/api/users/profile');
      if (profile) {
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      }
    } catch (_) {}
  };

  const login = async (email: string, password: string, userType: 'customer' | 'vendor'): Promise<boolean> => {
    try {
  const res = await fetch(`${(typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!res.ok) return false;
      const data = await res.json();
      setAuthFromResponse(data);
      // fetch latest profile
      try {
        const api = await import('@/lib/api');
        const profile = await api.apiGet('/api/users/profile');
        if (profile) {
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        }
      } catch (e: any) {
        if (e?.message === 'Unauthorized') {
          localStorage.removeItem(accessTokenKey);
          localStorage.removeItem(refreshTokenKey);
          localStorage.removeItem('user');
          try { window.location.href = '/login'; } catch(_) {}
        }
      }
      return true;
    } catch (e) {
      console.error('Login error', e);
      return false;
    }
  };

  const refreshProfile = async () => {
    try {
      const api = await import('@/lib/api');
      const profile = await api.apiGet('/api/users/profile');
      if (profile) {
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      }
    } catch (e) {
      // ignore
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem(accessTokenKey);
  await fetch(`${(typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
    } catch (e) {
      // ignore network errors on logout
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  };

  const registerCustomer = async (payload: any) => {
  const res = await fetch(`${(typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/register/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  const registerVendor = async (payload: any) => {
  const res = await fetch(`${(typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/register/vendor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      registerCustomer,
      registerVendor,
  googleClientId,
      isAuthenticated,
      applyAuthResponse: setAuthFromResponse
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};