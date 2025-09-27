// Authentication related types

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'email' | 'github';
  verified: boolean;
  github_username?: string;
  created_at: string;
  updated_at: string;
  subscription?: UserSubscription;
}

export interface UserSubscription {
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  current_period_end: string;
  usage: {
    requests: number;
    tokens: number;
    limit_requests: number;
    limit_tokens: number;
  };
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface GitHubCallbackRequest {
  code: string;
  state?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ConfirmResetRequest {
  token: string;
  password: string;
}