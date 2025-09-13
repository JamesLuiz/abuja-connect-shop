import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'vendor' | 'admin';
  isVerified: boolean;
  phone?: string;
  location?: string;
  joinDate?: string;
  totalOrders?: number;
  totalSpent?: number;
  storeRevenue?: number;
  storeRating?: number;
  completedSales?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'customer' | 'vendor') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers = {
  customer: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=400&h=400&fit=crop',
    role: 'customer' as const,
    isVerified: true,
    phone: '+234 803 456 7890',
    location: 'Wuse 2, Abuja FCT',
    joinDate: 'January 2024',
    totalOrders: 24,
    totalSpent: 450000
  },
  vendor: {
    name: 'Ahmed Musa',
    email: 'ahmed.musa@techhub.ng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    role: 'vendor' as const,
    isVerified: true,
    phone: '+234 803 123 4567',
    location: 'Garki 2, Abuja FCT',
    joinDate: 'March 2023',
    storeRevenue: 2500000,
    storeRating: 4.8,
    completedSales: 156
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, userType: 'customer' | 'vendor'): boolean => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      setUser(mockUsers[userType]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated
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