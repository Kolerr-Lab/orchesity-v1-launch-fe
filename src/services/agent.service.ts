// Agent processing API calls

import { BaseApiService } from './api';
import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type {
  AgentPromptRequest,
  AgentPromptResponse,
  BatchAgentRequest,
  BatchAgentResponse,
  AgentHistory,
  AgentStatus
} from '@/types/agent';

class AgentService extends BaseApiService {
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

  async getAgentHistory(page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<AgentHistory>>> {
    return this.request(`/agent/history?page=${page}&limit=${limit}`);
  }

  async getAgentStatus(): Promise<ApiResponse<AgentStatus>> {
    return this.request('/agent/status');
  }

  // WebSocket for real-time agent communication
  createAgentWebSocket(): WebSocket {
    return this.createWebSocketConnection('/agent');
  }
}

export const agentService = new AgentService();