// TypeScript interfaces for Orchesity META Agent Backend API

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  success: boolean;
}

// Authentication interfaces
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

// Agent interfaces
export interface AgentPromptRequest {
  prompt: string;
  provider?: 'openai' | 'anthropic' | 'google' | 'cohere';
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  context?: Record<string, any>;
}

export interface AgentPromptResponse {
  id: string;
  response: string;
  provider: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  cost: number;
  processing_time: number;
  created_at: string;
}

export interface BatchAgentRequest {
  requests: AgentPromptRequest[];
  batch_name?: string;
  priority?: 'low' | 'normal' | 'high';
}

export interface BatchAgentResponse {
  batch_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_requests: number;
  completed_requests: number;
  results: AgentPromptResponse[];
  created_at: string;
  updated_at: string;
}

export interface AgentHistory {
  id: string;
  prompt: string;
  response: string;
  provider: string;
  model: string;
  cost: number;
  processing_time: number;
  created_at: string;
}

// Backend Generator interfaces
export interface BackendGeneratorRequest {
  prompt: string;
  project_name: string;
  framework?: 'fastapi' | 'django' | 'flask' | 'express' | 'nestjs';
  database?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  features?: string[];
  requirements?: string;
}

export interface BackendGeneratorResponse {
  generation_id: string;
  status: 'pending' | 'generating' | 'reviewing' | 'completed' | 'failed';
  progress: number;
  stage: string;
  project_name: string;
  framework: string;
  database: string;
  created_at: string;
  updated_at: string;
}

export interface GenerationStatus extends BackendGeneratorResponse {
  logs: string[];
  estimated_completion: string;
  file_count?: number;
  total_lines?: number;
}

export interface ProjectPreview {
  generation_id: string;
  project_structure: FileStructure[];
  key_files: KeyFile[];
  api_endpoints: ApiEndpoint[];
  database_schema: DatabaseTable[];
  deployment_instructions: string;
}

export interface FileStructure {
  name: string;
  type: 'file' | 'directory';
  path: string;
  size?: number;
  children?: FileStructure[];
}

export interface KeyFile {
  name: string;
  path: string;
  content: string;
  language: string;
  description: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  request_body?: Record<string, any>;
  response_body?: Record<string, any>;
}

export interface DatabaseTable {
  name: string;
  columns: DatabaseColumn[];
  relationships?: string[];
}

export interface DatabaseColumn {
  name: string;
  type: string;
  nullable: boolean;
  primary_key: boolean;
  foreign_key?: string;
}

export interface DownloadInfo {
  generation_id: string;
  download_url: string;
  file_size: number;
  expires_at: string;
}

export interface BackendExample {
  id: string;
  title: string;
  description: string;
  framework: string;
  database: string;
  features: string[];
  prompt: string;
  preview_url?: string;
  thumbnail?: string;
  complexity: 'simple' | 'medium' | 'complex';
}

// Billing interfaces
export interface UsageStats {
  current_period: {
    start_date: string;
    end_date: string;
    requests: number;
    tokens: number;
    cost: number;
  };
  daily_usage: DailyUsage[];
  top_models: ModelUsage[];
}

export interface DailyUsage {
  date: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface ModelUsage {
  model: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    requests: number;
    tokens: number;
    team_members?: number;
  };
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string;
  invoice_url?: string;
  created_at: string;
}

// Project Management interfaces
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

// System interfaces
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