import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await api.getProfile();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('auth_token');
          console.error('Failed to fetch user profile:', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.login(email, password);
      localStorage.setItem('auth_token', response.data.token);
      setUser(response.data.user);
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const response = await api.signup(email, password, name);
      localStorage.setItem('auth_token', response.data.token);
      setUser(response.data.user);
      toast({
        title: "Account created!",
        description: "Welcome to Orchesity AI Platform.",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      // Redirect to home page after logout
      navigate('/');
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await api.updateProfile(data);
      setUser(response.data);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};