import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { Loader2 } from 'lucide-react';

export const GlobalLoader: React.FC = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 bg-card/90 backdrop-blur-md rounded-lg p-6 shadow-lg border border-border/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-foreground/80">{loadingMessage}</p>
      </div>
    </div>
  );
};