// Orchesity META Agent Backend API Service
import {
  ApiResponse,
  AuthUser,
  AuthResponse,
  AgentPromptRequest,
  AgentPromptResponse,
  BatchAgentRequest,
  BatchAgentResponse,
  AgentHistory,
  BackendGeneratorRequest,
  BackendGeneratorResponse,
  GenerationStatus,
  ProjectPreview,
  DownloadInfo,
  BackendExample,
  UsageStats,
  SubscriptionPlan,
  PaymentHistory,
  Deployment,
  GitRepository,
  SDKIntegration,
  SystemMetrics,
  SystemUser,
  ApiUsageStats
} from '@/types/orchesity';

class OrchesityService {
  private baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    const result = await this.request<null>('/auth/logout', { method: 'POST' });
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

  async handleGitHubCallback(code: string, state?: string): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/github/callback', {
      method: 'POST',
      body: JSON.stringify({ code, state }),
    });
  }

  // Agent endpoints
  async sendPrompt(request: AgentPromptRequest): Promise<ApiResponse<AgentPromptResponse>> {
    return this.request('/agent/prompt', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async sendBatchPrompts(request: BatchAgentRequest): Promise<ApiResponse<BatchAgentResponse>> {
    return this.request('/agent/batch', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getBatchStatus(batchId: string): Promise<ApiResponse<BatchAgentResponse>> {
    return this.request(`/agent/batch/${batchId}`);
  }

  async getAgentHistory(page = 1, limit = 20): Promise<ApiResponse<{ items: AgentHistory[]; total: number }>> {
    return this.request(`/agent/history?page=${page}&limit=${limit}`);
  }

  async getAgentStatus(): Promise<ApiResponse<{ status: string; queue_size: number; avg_response_time: number }>> {
    return this.request('/agent/status');
  }

  // Backend Generator endpoints
  async generateBackend(request: BackendGeneratorRequest): Promise<ApiResponse<BackendGeneratorResponse>> {
    return this.request('/backend-generator/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getGenerationStatus(generationId: string): Promise<ApiResponse<GenerationStatus>> {
    return this.request(`/backend-generator/status/${generationId}`);
  }

  async getProjectPreview(generationId: string): Promise<ApiResponse<ProjectPreview>> {
    return this.request(`/backend-generator/preview/${generationId}`);
  }

  async downloadProject(generationId: string): Promise<ApiResponse<DownloadInfo>> {
    return this.request(`/backend-generator/download/${generationId}`);
  }

  async getBackendExamples(): Promise<ApiResponse<BackendExample[]>> {
    return this.request('/backend-generator/examples');
  }

  async reviewGeneration(generationId: string): Promise<ApiResponse<{ review: string; suggestions: string[] }>> {
    return this.request(`/backend-generator/review/${generationId}`);
  }

  // Billing endpoints
  async getUsageStats(): Promise<ApiResponse<UsageStats>> {
    return this.request('/billing/usage');
  }

  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    return this.request('/billing/plans');
  }

  async createCheckoutSession(planId: string): Promise<ApiResponse<{ checkout_url: string }>> {
    return this.request('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
  }

  async createPortalSession(): Promise<ApiResponse<{ portal_url: string }>> {
    return this.request('/billing/portal', { method: 'POST' });
  }

  async getPaymentHistory(): Promise<ApiResponse<PaymentHistory[]>> {
    return this.request('/billing/history');
  }

  // Project Management endpoints
  async getDeployments(): Promise<ApiResponse<Deployment[]>> {
    return this.request('/deployments');
  }

  async createDeployment(generationId: string, config: any): Promise<ApiResponse<Deployment>> {
    return this.request('/deployments', {
      method: 'POST',
      body: JSON.stringify({ generation_id: generationId, ...config }),
    });
  }

  async getGitRepositories(): Promise<ApiResponse<GitRepository[]>> {
    return this.request('/repositories');
  }

  async createGitRepository(generationId: string, name: string): Promise<ApiResponse<GitRepository>> {
    return this.request('/repositories', {
      method: 'POST',
      body: JSON.stringify({ generation_id: generationId, name }),
    });
  }

  async getSDKIntegrations(): Promise<ApiResponse<SDKIntegration[]>> {
    return this.request('/integrations');
  }

  // Admin endpoints
  async getSystemMetrics(): Promise<ApiResponse<SystemMetrics>> {
    return this.request('/admin/metrics');
  }

  async getSystemUsers(page = 1, limit = 20): Promise<ApiResponse<{ items: SystemUser[]; total: number }>> {
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

  // WebSocket connection for real-time updates
  createWebSocketConnection(generationId?: string): WebSocket {
    const wsUrl = this.baseURL.replace('http', 'ws');
    const token = localStorage.getItem('access_token');
    const url = generationId 
      ? `${wsUrl}/ws/generation/${generationId}?token=${token}`
      : `${wsUrl}/ws/status?token=${token}`;
    
    return new WebSocket(url);
  }

  // Utility method to poll generation status
  async pollGenerationStatus(
    generationId: string,
    onUpdate: (status: GenerationStatus) => void,
    onComplete: (status: GenerationStatus) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const poll = async () => {
      try {
        const response = await this.getGenerationStatus(generationId);
        const status = response.data;
        onUpdate(status);

        if (status.status === 'completed') {
          onComplete(status);
        } else if (status.status === 'failed') {
          onError(new Error('Generation failed'));
        } else {
          setTimeout(poll, 2000); // Poll every 2 seconds
        }
      } catch (error) {
        onError(error as Error);
      }
    };

    poll();
  }
}

export const orchesityService = new OrchesityService();