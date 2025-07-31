import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
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
  businessName?: string;
  businessType?: string;
  isVendor?: boolean;
  isCustomer?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userType: 'customer' | 'vendor';
  businessName?: string;
  businessType?: string;
  businessCategory?: string;
  location: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('abuja-mall-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('abuja-mall-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('abuja-mall-user');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data based on email
    const mockUser: User = {
      id: '1',
      name: email.includes('vendor') ? 'Adebayo Johnson' : 'Sarah Williams',
      email,
      avatar: email.includes('vendor') 
        ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
        : 'https://images.unsplash.com/photo-1494790108755-2616b612c6f3?w=100&h=100&fit=crop&crop=face',
      role: email.includes('vendor') ? 'vendor' : 'customer',
      isVerified: true,
      phone: '+234 809 123 4567',
      location: 'Abuja, FCT',
      joinDate: 'March 2023',
      totalOrders: email.includes('vendor') ? undefined : 156,
      totalSpent: email.includes('vendor') ? undefined : 850000,
      storeRevenue: email.includes('vendor') ? 2450000 : undefined,
      storeRating: email.includes('vendor') ? 4.8 : undefined,
      completedSales: email.includes('vendor') ? 342 : undefined,
      businessName: email.includes('vendor') ? "Adebayo's Electronics Hub" : undefined,
      businessType: email.includes('vendor') ? 'Electronics & Gadgets' : undefined,
      isVendor: email.includes('vendor') || email.includes('business'),
      isCustomer: true,
    };

    setUser(mockUser);
    setIsLoading(false);
    
    toast({
      title: "Welcome back!",
      description: `Signed in as ${mockUser.name}`,
    });
  };

  const signUp = async (userData: SignUpData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.userType,
      isVerified: false,
      phone: userData.phone,
      location: userData.location,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      totalOrders: 0,
      totalSpent: 0,
      storeRevenue: userData.userType === 'vendor' ? 0 : undefined,
      storeRating: userData.userType === 'vendor' ? 0 : undefined,
      completedSales: userData.userType === 'vendor' ? 0 : undefined,
      businessName: userData.businessName,
      businessType: userData.businessType,
      isVendor: userData.userType === 'vendor',
      isCustomer: true,
    };

    setUser(newUser);
    setIsLoading(false);
    
    toast({
      title: "Account created successfully!",
      description: `Welcome to Abuja E-Mall, ${newUser.name}`,
    });
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const googleUser: User = {
      id: 'google-' + Date.now(),
      name: 'John Google User',
      email: 'john@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'customer',
      isVerified: true,
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      totalOrders: 0,
      totalSpent: 0,
      isVendor: false,
      isCustomer: true,
    };

    setUser(googleUser);
    setIsLoading(false);
    
    toast({
      title: "Signed in with Google",
      description: `Welcome, ${googleUser.name}!`,
    });
  };

  const signOut = () => {
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};