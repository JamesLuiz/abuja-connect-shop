import { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (email: string, password: string, userType: 'customer' | 'vendor') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
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
    // Check localStorage for persisted user data
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, password: string, userType: 'customer' | 'vendor'): boolean => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(
        (user) => user.email === email && user.password === password && user.role === userType
    );

    if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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