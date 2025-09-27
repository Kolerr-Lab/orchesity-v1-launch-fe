// Agent prompt input component

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export const PromptInput = ({ 
  onSend, 
  loading = false, 
  placeholder = "Describe your backend requirements..." 
}: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSend(prompt);
    setPrompt('');
  };

  return (
    <Card className="glass border-border/20">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="min-h-[120px] glass border-border/20 resize-none"
            disabled={loading}
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              variant="hero" 
              disabled={!prompt.trim() || loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {loading ? 'Processing...' : 'Send'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};