// Deployment API calls

import { BaseApiService } from './api';
import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type {
  Deployment,
  GitRepository,
  SDKIntegration,
  DeploymentConfig,
  CreateRepositoryRequest,
  SystemMetrics,
  SystemUser,
  ApiUsageStats
} from '@/types/deployment';

class DeploymentService extends BaseApiService {
  // Deployment endpoints
  async getDeployments(): Promise<ApiResponse<Deployment[]>> {
    return this.request('/deployments');
  }

  async createDeployment(generationId: string, config: DeploymentConfig): Promise<ApiResponse<Deployment>> {
    return this.request('/deployments', {
      method: 'POST',
      body: JSON.stringify({ generation_id: generationId, ...config }),
    });
  }

  // Git repository endpoints
  async getGitRepositories(): Promise<ApiResponse<GitRepository[]>> {
    return this.request('/repositories');
  }

  async createGitRepository(data: CreateRepositoryRequest): Promise<ApiResponse<GitRepository>> {
    return this.request('/repositories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // SDK integrations
  async getSDKIntegrations(): Promise<ApiResponse<SDKIntegration[]>> {
    return this.request('/integrations');
  }

  // Admin endpoints
  async getSystemMetrics(): Promise<ApiResponse<SystemMetrics>> {
    return this.request('/admin/metrics');
  }

  async getSystemUsers(page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<SystemUser>>> {
    return this.request(`/admin/users?page=${page}&limit=${limit}`);
  }

  async getApiUsageStats(): Promise<ApiResponse<ApiUsageStats[]>> {
    return this.request('/admin/usage');
  }

  async updateUserSubscription(userId: string, planId: string): Promise<ApiResponse<SystemUser>> {
    return this.request(`/admin/users/${userId}/subscription`, {
      method: 'PUT',
      body: JSON.stringify({ plan_id: planId }),
    });
  }
}

export const deploymentService = new DeploymentService();