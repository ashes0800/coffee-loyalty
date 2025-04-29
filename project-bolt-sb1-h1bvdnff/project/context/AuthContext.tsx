import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    points: 230,
    level: 'Gold',
    memberSince: '2022-05-15',
    transactions: [
      { id: 't1', date: '2023-10-15', store: 'Central Mall', amount: 35, points: 35 },
      { id: 't2', date: '2023-10-10', store: 'Bay Street', amount: 42, points: 42 },
      { id: 't3', date: '2023-10-05', store: 'Harbor View', amount: 28, points: 28 },
    ],
    rewards: [
      { id: 'r1', date: '2023-09-30', name: 'Free Drink', points: 120, status: 'redeemed' },
      { id: 'r2', date: '2023-09-15', name: 'Cake Slice', points: 150, status: 'available' },
    ]
  }
];

// Define auth context types
type User = {
  id: string;
  name: string;
  email: string;
  points: number;
  level: string;
  memberSince: string;
  transactions: Transaction[];
  rewards: Reward[];
};

type Transaction = {
  id: string;
  date: string;
  store: string;
  amount: number;
  points: number;
};

type Reward = {
  id: string;
  date: string;
  name: string;
  points: number;
  status: 'available' | 'redeemed' | 'expired';
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    // Check local storage or secure store for saved credentials
    // For demo, we'll just use a timeout to simulate checking storage
    const checkLoginStatus = setTimeout(() => {
      // For demo purposes, user is not logged in initially
      setIsLoggedIn(false);
    }, 500);

    return () => clearTimeout(checkLoginStatus);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          // Remove password from user object before storing
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword as User);
          setIsLoggedIn(true);
          router.replace('/(tabs)');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/(auth)/login');
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);

        if (existingUser) {
          resolve(false);
        } else {
          // In a real app, you would add this user to your database
          // For this demo, we'll just simulate a successful registration
          resolve(true);
        }
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};