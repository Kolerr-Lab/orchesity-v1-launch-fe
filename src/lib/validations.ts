// Form validations using zod

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const confirmResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const agentPromptSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').max(10000, 'Prompt must be less than 10,000 characters'),
  provider: z.enum(['openai', 'anthropic', 'google', 'cohere']).optional(),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().min(1).max(8000).optional(),
});

export const backendGeneratorSchema = z.object({
  prompt: z.string().min(20, 'Project description must be at least 20 characters').max(5000, 'Description must be less than 5,000 characters'),
  project_name: z.string()
    .min(3, 'Project name must be at least 3 characters')
    .max(50, 'Project name must be less than 50 characters')
    .regex(/^[a-z0-9-_]+$/, 'Project name can only contain lowercase letters, numbers, hyphens, and underscores'),
  framework: z.enum(['fastapi', 'django', 'flask', 'express', 'nestjs']).optional(),
  database: z.enum(['postgresql', 'mysql', 'sqlite', 'mongodb']).optional(),
  features: z.array(z.string()).optional(),
  requirements: z.string().max(2000, 'Requirements must be less than 2,000 characters').optional(),
});

export const batchAgentSchema = z.object({
  requests: z.array(agentPromptSchema).min(1, 'At least one request is required').max(10, 'Maximum 10 requests per batch'),
  batch_name: z.string().max(100, 'Batch name must be less than 100 characters').optional(),
  priority: z.enum(['low', 'normal', 'high']).optional(),
});

export const deploymentConfigSchema = z.object({
  environment: z.enum(['development', 'staging', 'production']).optional(),
  domain: z.string().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, 'Invalid domain format').optional(),
  environment_variables: z.record(z.string()).optional(),
  auto_deploy: z.boolean().optional(),
});

export const createRepositorySchema = z.object({
  generation_id: z.string().uuid('Invalid generation ID'),
  name: z.string()
    .min(3, 'Repository name must be at least 3 characters')
    .max(50, 'Repository name must be less than 50 characters')
    .regex(/^[a-z0-9-_]+$/, 'Repository name can only contain lowercase letters, numbers, hyphens, and underscores'),
});

// Type exports for form validation
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ConfirmResetFormData = z.infer<typeof confirmResetSchema>;
export type AgentPromptFormData = z.infer<typeof agentPromptSchema>;
export type BackendGeneratorFormData = z.infer<typeof backendGeneratorSchema>;
export type BatchAgentFormData = z.infer<typeof batchAgentSchema>;
export type DeploymentConfigFormData = z.infer<typeof deploymentConfigSchema>;
export type CreateRepositoryFormData = z.infer<typeof createRepositorySchema>;