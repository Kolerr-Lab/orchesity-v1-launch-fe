// Generation hooks with polling

import { useState, useEffect } from 'react';
import { backendGeneratorService } from '@/services/backendGenerator.service';
import type { 
  BackendGeneratorRequest, 
  GenerationStatus, 
  BackendExample 
} from '@/types/backendGenerator';
import { useToast } from '@/hooks/use-toast';

export const useBackendGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [examples, setExamples] = useState<BackendExample[]>([]);
  const { toast } = useToast();

  const generateBackend = async (request: BackendGeneratorRequest) => {
    try {
      setLoading(true);
      const response = await backendGeneratorService.generateBackend(request);
      
      toast({
        title: "Generation Started",
        description: `Backend generation for "${request.project_name}" has been initiated.`,
      });
      
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to start backend generation",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadExamples = async () => {
    try {
      const response = await backendGeneratorService.getBackendExamples();
      setExamples(response.data);
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Load Examples",
        description: error instanceof Error ? error.message : "Could not load backend examples",
      });
      return [];
    }
  };

  const downloadProject = async (generationId: string) => {
    try {
      const response = await backendGeneratorService.downloadProject(generationId);
      
      // Create download link
      const link = document.createElement('a');
      link.href = response.data.download_url;
      link.download = `project-${generationId}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Your project download has been initiated.",
      });
      
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download project",
      });
      throw error;
    }
  };

  return {
    loading,
    examples,
    generateBackend,
    loadExamples,
    downloadProject,
  };
};

// Hook for polling generation status
export const useGenerationStatus = (generationId: string | null) => {
  const [status, setStatus] = useState<GenerationStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!generationId) return;

    setLoading(true);
    
    const pollStatus = () => {
      backendGeneratorService.pollGenerationStatus(
        generationId,
        (updatedStatus) => setStatus(updatedStatus),
        (finalStatus) => {
          setStatus(finalStatus);
          setLoading(false);
        },
        (error) => {
          console.error('Generation polling error:', error);
          setLoading(false);
        }
      );
    };

    pollStatus();
  }, [generationId]);

  return { status, loading };
};