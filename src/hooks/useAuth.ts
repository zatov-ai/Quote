import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { login as authLogin, signup as authSignup, logout as authLogout, getCurrentUser, LoginCredentials, SignupData } from '../utils/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const user = getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    });
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authLogin(credentials);
      console.log('Login successful:', user);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return user;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authSignup(data);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    authLogout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    signup,
    logout
  };
}