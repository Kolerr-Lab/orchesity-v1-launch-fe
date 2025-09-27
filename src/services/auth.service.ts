// Authentication API calls

import { BaseApiService } from './api';
import type { ApiResponse } from '@/types/common';
import type { 
  AuthUser, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  GitHubCallbackRequest,
  ResetPasswordRequest,
  ConfirmResetRequest
} from '@/types/auth';

class AuthService extends BaseApiService {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    const result = await this.request<ApiResponse<null>>('/auth/logout', { 
      method: 'POST' 
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return result;
  }

  async getProfile(): Promise<ApiResponse<AuthUser>> {
    return this.request('/auth/profile');
  }

  async refreshToken(): Promise<ApiResponse<{ access_token: string }>> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // GitHub OAuth
  initiateGitHubAuth(): void {
    window.location.href = `${this.baseURL}/api/auth/github`;
  }

  async handleGitHubCallback(data: GitHubCallbackRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/github/callback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<null>> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async confirmReset(data: ConfirmResetRequest): Promise<ApiResponse<null>> {
    return this.request('/auth/confirm-reset', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const authService = new AuthService();