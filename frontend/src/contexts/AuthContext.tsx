import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, AuthTokens } from '../services/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  tokens: AuthTokens | null;
  logout: () => void;
  setTokens: (tokens: AuthTokens) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<AuthTokens | null>(AuthService.getStoredTokens());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!tokens);

  useEffect(() => {
    setIsAuthenticated(!!tokens);
  }, [tokens]);

  const logout = () => {
    AuthService.logout();
    setTokens(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, tokens, logout, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};