// Agent processing hooks

import { useState } from 'react';
import { agentService } from '@/services/agent.service';
import type { 
  AgentPromptRequest, 
  AgentPromptResponse, 
  BatchAgentRequest,
  AgentHistory 
} from '@/types/agent';
import { useToast } from '@/hooks/use-toast';

export const useAgent = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<AgentHistory[]>([]);
  const { toast } = useToast();

  const sendPrompt = async (request: AgentPromptRequest): Promise<AgentPromptResponse | null> => {
    try {
      setLoading(true);
      const response = await agentService.sendPrompt(request);
      
      toast({
        title: "Response Generated",
        description: "Your prompt has been processed successfully.",
      });
      
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "Failed to process your prompt",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendBatchPrompts = async (request: BatchAgentRequest) => {
    try {
      setLoading(true);
      const response = await agentService.sendBatchPrompts(request);
      
      toast({
        title: "Batch Submitted",
        description: `Batch with ${request.requests.length} prompts has been submitted for processing.`,
      });
      
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Batch Failed",
        description: error instanceof Error ? error.message : "Failed to submit batch",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (page = 1, limit = 20) => {
    try {
      const response = await agentService.getAgentHistory(page, limit);
      setHistory(response.data.items);
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Load History",
        description: error instanceof Error ? error.message : "Could not load agent history",
      });
      return null;
    }
  };

  return {
    loading,
    history,
    sendPrompt,
    sendBatchPrompts,
    loadHistory,
  };
};