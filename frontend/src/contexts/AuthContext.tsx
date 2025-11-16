import React, { createContext, useContext, useEffect, useState } from 'react';
import { setAuthToken } from '../services/api';
import { authApi } from '../services/api';

const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'user';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper functions for localStorage
const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  async function signup(email: string, password: string) {
    try {
      const response = await authApi.register(email, password);
      const { accessToken, user } = response.data;
      
      saveToken(accessToken);
      saveUser(user);
      setToken(accessToken);
      setCurrentUser(user);
      setAuthToken(accessToken);
      console.log('✅ User signed up, token saved');
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await authApi.login(email, password);
      const { accessToken, user } = response.data;
      
      saveToken(accessToken);
      saveUser(user);
      setToken(accessToken);
      setCurrentUser(user);
      setAuthToken(accessToken);
      console.log('✅ User logged in, token saved');
    } catch (error: any) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  async function logout() {
    removeToken();
    setToken(null);
    setCurrentUser(null);
    setAuthToken(null);
    console.log('✅ User logged out, token removed');
  }

  useEffect(() => {
    // Try to load token and user from localStorage on mount
    const savedToken = getToken();
    const savedUser = getUser();
    
    if (savedToken && savedUser) {
      console.log('📦 Found saved token and user in localStorage');
      setToken(savedToken);
      setCurrentUser(savedUser);
      setAuthToken(savedToken);
      
      // Verify token is still valid
      authApi.verify()
        .then(() => {
          console.log('✅ Token is valid');
        })
        .catch(() => {
          console.log('❌ Token invalid, clearing auth');
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
