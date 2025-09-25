import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Send, 
  History, 
  Zap, 
  Clock, 
  DollarSign,
  Loader2,
  Settings,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { AgentPromptRequest, AgentPromptResponse, AgentHistory } from '@/types/orchesity';

const providers = [
  { value: 'openai', label: 'OpenAI', models: ['gpt-4', 'gpt-3.5-turbo'] },
  { value: 'anthropic', label: 'Anthropic', models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'] },
  { value: 'google', label: 'Google', models: ['gemini-pro', 'gemini-pro-vision'] },
  { value: 'cohere', label: 'Cohere', models: ['command', 'command-light'] },
];

export default function AgentDashboard() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<AgentPromptResponse | null>(null);
  const [history, setHistory] = useState<AgentHistory[]>([]);
  const [agentStatus, setAgentStatus] = useState<any>(null);

  useEffect(() => {
    loadHistory();
    loadAgentStatus();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await orchesityService.getAgentHistory(1, 10);
      setHistory(response.data.items);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const loadAgentStatus = async () => {
    try {
      const response = await orchesityService.getAgentStatus();
      setAgentStatus(response.data);
    } catch (error) {
      console.error('Failed to load agent status:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: 'Missing Prompt',
        description: 'Please enter a prompt to send to the agent.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setCurrentResponse(null);

    const request: AgentPromptRequest = {
      prompt: prompt.trim(),
      provider: selectedProvider as any,
      model: selectedModel,
      temperature,
      max_tokens: maxTokens,
    };

    try {
      const response = await orchesityService.sendPrompt(request);
      setCurrentResponse(response.data);
      setPrompt('');
      
      // Reload history to include the new interaction
      loadHistory();
      
      toast({
        title: 'Response Received',
        description: `Processed in ${response.data.processing_time}ms`,
      });
    } catch (error) {
      toast({
        title: 'Request Failed',
        description: error instanceof Error ? error.message : 'Failed to process prompt',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableModels = () => {
    const provider = providers.find(p => p.value === selectedProvider);
    return provider ? provider.models : [];
  };

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  const formatTime = (ms: number) => {
    return `${ms}ms`;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Bot className="mr-3 h-8 w-8 text-primary" />
          Agent Dashboard
        </h1>
        <p className="text-muted-foreground">
          Interact with AI agents using different providers and models
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="batch">Batch Processing</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        {/* Chat Interface */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Provider</label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableModels().map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Temperature: {temperature}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Max Tokens: {maxTokens}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="4000"
                    step="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Send Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                      placeholder="Enter your prompt here..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-32"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !prompt.trim()}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Prompt
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Current Response */}
              {currentResponse && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Response</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{currentResponse.provider}</Badge>
                        <Badge variant="outline">{currentResponse.model}</Badge>
                      </div>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatTime(currentResponse.processing_time)}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {formatCost(currentResponse.cost)}
                      </span>
                      <span className="flex items-center">
                        <Zap className="mr-1 h-4 w-4" />
                        {currentResponse.usage.total_tokens} tokens
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">
                        {currentResponse.response}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Batch Processing */}
        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <CardTitle>Batch Processing</CardTitle>
              <CardDescription>
                Process multiple prompts simultaneously for better efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Batch processing interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2 h-5 w-5" />
                Recent Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{item.provider}</Badge>
                          <Badge variant="outline">{item.model}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatTime(item.processing_time)}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {formatCost(item.cost)}
                          </span>
                          <span>{new Date(item.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Prompt:</h4>
                          <p className="text-sm">{item.prompt}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Response:</h4>
                          <div className="bg-muted rounded p-2">
                            <pre className="text-sm whitespace-pre-wrap">
                              {item.response}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No interactions yet. Send your first prompt to get started!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status */}
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Agent Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {agentStatus ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      {agentStatus.status}
                    </div>
                    <div className="text-sm text-muted-foreground">System Status</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-1">
                      {agentStatus.queue_size}
                    </div>
                    <div className="text-sm text-muted-foreground">Queue Size</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-1">
                      {agentStatus.avg_response_time}ms
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Loading agent status...
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}