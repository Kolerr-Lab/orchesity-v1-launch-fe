// Authentication hooks

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import type { AuthUser, LoginRequest, RegisterRequest } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await authService.getProfile();
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      
      setUser(response.data.user);
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      
      setUser(response.data.user);
      
      toast({
        title: "Account Created",
        description: "Welcome to Orchesity! Your account has been created successfully.",
      });
      
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      // Still clear local state even if server request fails
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuthStatus,
  };
};