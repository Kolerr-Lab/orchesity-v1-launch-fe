// Deployment and project management related types

export interface Deployment {
  id: string;
  generation_id: string;
  project_name: string;
  status: 'deploying' | 'active' | 'failed' | 'stopped';
  url?: string;
  framework: string;
  created_at: string;
  last_deployed: string;
}

export interface GitRepository {
  id: string;
  generation_id: string;
  name: string;
  url: string;
  branch: string;
  status: 'synced' | 'pending' | 'failed';
  last_sync: string;
}

export interface SDKIntegration {
  id: string;
  name: string;
  language: string;
  version: string;
  documentation_url: string;
  example_code: string;
}

export interface DeploymentConfig {
  environment?: 'development' | 'staging' | 'production';
  domain?: string;
  environment_variables?: Record<string, string>;
  auto_deploy?: boolean;
}

export interface CreateRepositoryRequest {
  generation_id: string;
  name: string;
}

export interface SystemMetrics {
  active_users: number;
  total_requests: number;
  avg_response_time: number;
  error_rate: number;
  uptime: number;
  queue_size: number;
  cache_hit_rate: number;
}

export interface SystemUser {
  id: string;
  email: string;
  name: string;
  subscription: string;
  last_active: string;
  total_requests: number;
  total_cost: number;
  created_at: string;
}

export interface ApiUsageStats {
  endpoint: string;
  method: string;
  requests: number;
  avg_response_time: number;
  error_rate: number;
  last_24h: number[];
}