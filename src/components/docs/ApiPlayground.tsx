import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Play, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ApiPlayground = () => {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('/api/agents');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const { toast } = useToast();

  const endpoints = [
    { value: '/api/agents', label: 'List Agents', method: 'GET' },
    { value: '/api/agents', label: 'Create Agent', method: 'POST' },
    { value: '/api/agents/{id}/chat', label: 'Chat with Agent', method: 'POST' },
    { value: '/api/agent/universal-prompt', label: 'Universal Prompt', method: 'POST' },
    { value: '/api/metrics', label: 'Get Metrics', method: 'GET' },
    { value: '/api/logs', label: 'Get Logs', method: 'GET' },
  ];

  const sampleBodies = {
    '/api/agents': {
      POST: `{
  "name": "Customer Support Bot",
  "model": "gpt-4",
  "systemPrompt": "You are a helpful customer support agent for an e-commerce platform.",
  "plugins": ["knowledge-base", "order-tracking"]
}`
    },
    '/api/agents/{id}/chat': {
      POST: `{
  "message": "What's the status of order #12345?",
  "context": {
    "userId": "user_123",
    "sessionId": "session_456"
  }
}`
    },
    '/api/agent/universal-prompt': {
      POST: `{
  "prompt": "Analyze the sales performance for Q4 2024",
  "model": "claude-3-sonnet",
  "useRAG": true,
  "context": ["sales-reports", "quarterly-data"],
  "temperature": 0.7
}`
    }
  };

  const executeRequest = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to test the endpoint.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const baseUrl = 'https://api.orchesity.com';
      const url = `${baseUrl}${endpoint}`;
      
      const options: RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      };

      if (method === 'POST' && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(url, options);
      const data = await res.json();
      
      setResponse(JSON.stringify(data, null, 2));
      
      if (!res.ok) {
        toast({
          title: "Request Failed",
          description: `HTTP ${res.status}: ${data.message || 'Unknown error'}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse(`Error: ${errorMessage}`);
      toast({
        title: "Request Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
      toast({
        title: "Copied!",
        description: "Response copied to clipboard.",
      });
    }
  };

  const handleEndpointChange = (value: string) => {
    const selectedEndpoint = endpoints.find(ep => ep.value === value);
    if (selectedEndpoint) {
      setEndpoint(value);
      setMethod(selectedEndpoint.method);
      
      // Set sample body if available
      const sampleKey = value as keyof typeof sampleBodies;
      if (sampleBodies[sampleKey] && sampleBodies[sampleKey][selectedEndpoint.method as 'POST']) {
        setRequestBody(sampleBodies[sampleKey][selectedEndpoint.method as 'POST']);
      } else {
        setRequestBody('');
      }
    }
  };

  return (
    <Card className="glass border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          API Playground
        </CardTitle>
        <CardDescription>
          Test Orchesity API endpoints directly from your browser
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key (orch_...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from the <a href="/dashboard" className="text-primary hover:underline">dashboard</a>
            </p>
          </div>

          {/* Request Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint</Label>
              <Select value={endpoint} onValueChange={handleEndpointChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {endpoints.map((ep) => (
                    <SelectItem key={`${ep.value}-${ep.method}`} value={ep.value}>
                      <div className="flex items-center gap-2">
                        <Badge variant={ep.method === 'GET' ? 'default' : 'secondary'}>
                          {ep.method}
                        </Badge>
                        {ep.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Method</Label>
              <div className="flex items-center h-10">
                <Badge variant={method === 'GET' ? 'default' : 'secondary'}>
                  {method}
                </Badge>
              </div>
            </div>
          </div>

          {/* Request Body */}
          {method === 'POST' && (
            <div className="space-y-2">
              <Label htmlFor="requestBody">Request Body</Label>
              <Textarea
                id="requestBody"
                placeholder="Enter JSON request body..."
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="font-mono min-h-[200px]"
              />
            </div>
          )}

          {/* Execute Button */}
          <Button 
            onClick={executeRequest} 
            disabled={loading || !apiKey}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Executing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Execute Request
              </>
            )}
          </Button>

          {/* Response */}
          {(response || loading) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Response</Label>
                {response && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyResponse}
                    className="gap-2"
                  >
                    {copiedResponse ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy
                  </Button>
                )}
              </div>
              <div className="bg-secondary/50 border border-border/20 rounded-lg p-4 min-h-[200px] overflow-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {response}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Usage Examples */}
          <div className="mt-8">
            <h4 className="font-semibold mb-4">Quick Examples</h4>
            <Tabs defaultValue="list-agents">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list-agents">List Agents</TabsTrigger>
                <TabsTrigger value="create-agent">Create Agent</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list-agents" className="mt-4">
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Get all your created agents
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEndpoint('/api/agents');
                      setMethod('GET');
                      setRequestBody('');
                    }}
                  >
                    Load Example
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="create-agent" className="mt-4">
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Create a new AI agent with custom configuration
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEndpoint('/api/agents');
                      setMethod('POST');
                      setRequestBody(sampleBodies['/api/agents'].POST);
                    }}
                  >
                    Load Example
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="mt-4">
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Send a message to an existing agent
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEndpoint('/api/agents/{id}/chat');
                      setMethod('POST');
                      setRequestBody(sampleBodies['/api/agents/{id}/chat'].POST);
                    }}
                  >
                    Load Example
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};