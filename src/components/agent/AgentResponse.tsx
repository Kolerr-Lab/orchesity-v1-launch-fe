// Agent response display component

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download, Clock } from 'lucide-react';
import type { AgentPromptResponse } from '@/types/agent';

interface AgentResponseProps {
  response: AgentPromptResponse;
  onCopy?: () => void;
  onDownload?: () => void;
}

export const AgentResponse = ({ response, onCopy, onDownload }: AgentResponseProps) => {
  const formatTime = (time: number) => {
    return time < 1000 ? `${time}ms` : `${(time / 1000).toFixed(1)}s`;
  };

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  return (
    <Card className="glass border-border/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Response</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(response.processing_time)}
            </Badge>
            <Badge variant="outline">{response.model}</Badge>
            <Badge variant="outline">{formatCost(response.cost)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
            {response.response}
          </pre>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/20">
          <div className="text-xs text-muted-foreground">
            Tokens: {response.usage.prompt_tokens + response.usage.completion_tokens} 
            ({response.usage.prompt_tokens} + {response.usage.completion_tokens})
          </div>
          <div className="flex items-center gap-2">
            {onCopy && (
              <Button variant="outline" size="sm" onClick={onCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            )}
            {onDownload && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="h-4 w-4 mr-2" />
                Save
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};