// Backend generation API calls

import { BaseApiService } from './api';
import type { ApiResponse } from '@/types/common';
import type {
  BackendGeneratorRequest,
  BackendGeneratorResponse,
  GenerationStatus,
  ProjectPreview,
  DownloadInfo,
  BackendExample,
  GenerationReview
} from '@/types/backendGenerator';

class BackendGeneratorService extends BaseApiService {
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

  async reviewGeneration(generationId: string): Promise<ApiResponse<GenerationReview>> {
    return this.request(`/backend-generator/review/${generationId}`);
  }

  // WebSocket for real-time generation updates
  createGenerationWebSocket(generationId: string): WebSocket {
    return this.createWebSocketConnection(`/generation/${generationId}`);
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

export const backendGeneratorService = new BackendGeneratorService();