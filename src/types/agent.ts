// Agent processing related types

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

export interface AgentStatus {
  status: string;
  queue_size: number;
  avg_response_time: number;
}