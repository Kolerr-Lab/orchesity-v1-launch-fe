// API URLs, enums, and application constants

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    GITHUB: '/auth/github',
    GITHUB_CALLBACK: '/auth/github/callback',
    RESET_PASSWORD: '/auth/reset-password',
    CONFIRM_RESET: '/auth/confirm-reset',
  },
  AGENT: {
    PROMPT: '/agent/prompt',
    BATCH: '/agent/batch',
    HISTORY: '/agent/history',
    STATUS: '/agent/status',
  },
  BACKEND_GENERATOR: {
    GENERATE: '/backend-generator/generate',
    STATUS: '/backend-generator/status',
    PREVIEW: '/backend-generator/preview',
    DOWNLOAD: '/backend-generator/download',
    EXAMPLES: '/backend-generator/examples',
    REVIEW: '/backend-generator/review',
  },
  BILLING: {
    USAGE: '/billing/usage',
    PLANS: '/billing/plans',
    CHECKOUT: '/billing/checkout',
    PORTAL: '/billing/portal',
    HISTORY: '/billing/history',
  },
  DEPLOYMENT: {
    LIST: '/deployments',
    CREATE: '/deployments',
    REPOSITORIES: '/repositories',
    INTEGRATIONS: '/integrations',
  },
  ADMIN: {
    METRICS: '/admin/metrics',
    USERS: '/admin/users',
    USAGE: '/admin/usage',
  },
};

export const WEBSOCKET_PATHS = {
  AGENT: '/ws/agent',
  GENERATION: '/ws/generation',
  STATUS: '/ws/status',
};

export const FRAMEWORKS = [
  { value: 'fastapi', label: 'FastAPI (Python)', description: 'Modern, fast Python web framework' },
  { value: 'django', label: 'Django (Python)', description: 'High-level Python web framework' },
  { value: 'flask', label: 'Flask (Python)', description: 'Lightweight Python web framework' },
  { value: 'express', label: 'Express.js (Node.js)', description: 'Fast, unopinionated Node.js framework' },
  { value: 'nestjs', label: 'NestJS (Node.js)', description: 'Progressive Node.js framework' },
] as const;

export const DATABASES = [
  { value: 'postgresql', label: 'PostgreSQL', description: 'Advanced open-source relational database' },
  { value: 'mysql', label: 'MySQL', description: 'Popular open-source relational database' },
  { value: 'sqlite', label: 'SQLite', description: 'Lightweight embedded database' },
  { value: 'mongodb', label: 'MongoDB', description: 'Document-oriented NoSQL database' },
] as const;

export const AI_PROVIDERS = [
  { value: 'openai', label: 'OpenAI', models: ['gpt-4', 'gpt-3.5-turbo'] },
  { value: 'anthropic', label: 'Anthropic', models: ['claude-3-opus', 'claude-3-sonnet'] },
  { value: 'google', label: 'Google', models: ['gemini-pro', 'gemini-pro-vision'] },
  { value: 'cohere', label: 'Cohere', models: ['command', 'command-light'] },
] as const;

export const GENERATION_PHASES = [
  'Analysis',
  'Architecture', 
  'Database',
  'API',
  'Security',
  'Testing',
  'Documentation',
] as const;

export const SUBSCRIPTION_PLANS = [
  'free',
  'starter', 
  'pro',
  'enterprise',
] as const;

export const GENERATION_STATUS = [
  'pending',
  'generating', 
  'reviewing',
  'completed',
  'failed',
] as const;

export const DEPLOYMENT_STATUS = [
  'deploying',
  'active',
  'failed', 
  'stopped',
] as const;

export const DEFAULT_LIMITS = {
  FREE_PLAN: {
    REQUESTS_PER_MONTH: 100,
    TOKENS_PER_MONTH: 10000,
  },
  STARTER_PLAN: {
    REQUESTS_PER_MONTH: 1000,
    TOKENS_PER_MONTH: 100000,
  },
  PRO_PLAN: {
    REQUESTS_PER_MONTH: 10000,
    TOKENS_PER_MONTH: 1000000,
  },
} as const;

export const POLLING_INTERVALS = {
  GENERATION_STATUS: 2000, // 2 seconds
  AGENT_STATUS: 5000, // 5 seconds
  BATCH_STATUS: 3000, // 3 seconds
} as const;