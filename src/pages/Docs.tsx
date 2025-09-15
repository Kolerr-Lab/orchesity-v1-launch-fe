import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { GoBackButton } from '@/components/ui/go-back-button';
import { ApiPlayground } from '@/components/docs/ApiPlayground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  Settings, 
  HelpCircle, 
  Rocket,
  Copy,
  Check,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Docs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative">
      <pre className="bg-secondary/50 border border-border/20 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );

  const quickStartSteps = [
    {
      title: "1. Sign Up & Get API Key",
      description: "Create your account and obtain your API credentials",
      code: `# Your API endpoint
BASE_URL = "https://api.orchesityai.com"

# Get your API key from dashboard
API_KEY = "orch_xxx..."`
    },
    {
      title: "2. Install SDK (Optional)",
      description: "Use our official SDKs or make direct HTTP requests",
      code: `# Python
pip install orchesity-sdk

# JavaScript/Node.js
npm install @orchesity/sdk

# Direct HTTP (any language)
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.orchesityai.com/api/agents`
    },
    {
      title: "3. Create Your First Agent",
      description: "Deploy an AI agent in seconds",
      code: `import { OrchesityClient } from '@orchesity/sdk';

const client = new OrchesityClient('your-api-key');

const agent = await client.agents.create({
  name: 'My First Agent',
  model: 'gpt-4',
  systemPrompt: 'You are a helpful assistant',
  plugins: ['web-search', 'calculator']
});`
    },
    {
      title: "4. Chat with Your Agent",
      description: "Start interacting with your deployed agent",
      code: `const response = await client.agents.chat(agent.id, {
  message: 'What is the weather like today?',
  context: { location: 'San Francisco' }
});

console.log(response.message);`
    }
  ];

  const apiEndpoints = [
    {
      method: 'POST',
      path: '/api/agents',
      description: 'Create a new AI agent',
      example: `{
  "name": "Customer Support Bot",
  "model": "gpt-4",
  "systemPrompt": "You are a helpful customer support agent",
  "plugins": ["knowledge-base", "ticket-system"]
}`
    },
    {
      method: 'GET',
      path: '/api/agents',
      description: 'List all your agents',
      example: 'No body required'
    },
    {
      method: 'POST',
      path: '/api/agents/{id}/chat',
      description: 'Chat with an agent',
      example: `{
  "message": "How can I track my order?",
  "context": {
    "userId": "user123",
    "sessionId": "session456"
  }
}`
    },
    {
      method: 'POST',
      path: '/api/agent/universal-prompt',
      description: 'Universal prompt endpoint with RAG',
      example: `{
  "prompt": "Analyze the latest sales data",
  "model": "claude-3-sonnet",
  "useRAG": true,
  "context": ["sales-reports", "quarterly-data"]
}`
    },
    {
      method: 'GET',
      path: '/api/metrics',
      description: 'Get usage metrics and analytics',
      example: 'Query params: ?timeframe=7d&agentId=optional'
    },
    {
      method: 'GET',
      path: '/api/logs',
      description: 'Access agent interaction logs',
      example: 'Query params: ?agentId=xxx&limit=100&offset=0'
    }
  ];

  const integrationExamples = [
    {
      name: 'React',
      code: `import { useState } from 'react';
import { OrchesityClient } from '@orchesity/sdk';

const client = new OrchesityClient(process.env.REACT_APP_ORCHESITY_KEY);

function ChatComponent() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const result = await client.agents.chat('agent-id', {
      message,
      context: { timestamp: Date.now() }
    });
    setResponse(result.message);
  };

  return (
    <div>
      <input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your agent..."
      />
      <button onClick={handleChat}>Send</button>
      <p>{response}</p>
    </div>
  );
}`
    },
    {
      name: 'Python',
      code: `from orchesity import OrchesityClient
import asyncio

client = OrchesityClient(api_key="your-key")

async def chat_with_agent():
    response = await client.agents.chat(
        agent_id="agent-123",
        message="Analyze this data for insights",
        context={"dataSource": "quarterly-report.csv"}
    )
    return response.message

# Run async
result = asyncio.run(chat_with_agent())
print(result)`
    },
    {
      name: 'cURL',
      code: `# Create an agent
curl -X POST "https://api.orchesityai.com/api/agents" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Data Analyst",
    "model": "claude-3-sonnet",
    "systemPrompt": "You are an expert data analyst"
  }'

# Chat with agent
curl -X POST "https://api.orchesityai.com/api/agents/AGENT_ID/chat" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "What trends do you see in the data?",
    "context": {"dataset": "sales-q4-2024"}
  }'`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <GoBackButton />
          </div>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-primary">Orchesity</span> Documentation
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Everything you need to integrate AI agents into your applications.
              From quick start to advanced orchestration.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Button variant="hero" className="gap-2" onClick={() => document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' })}>
                <Rocket className="h-4 w-4" />
                Get Started
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => document.getElementById('api-playground')?.scrollIntoView({ behavior: 'smooth' })}>
                <ExternalLink className="h-4 w-4" />
                API Playground
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="glass border-border/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {[
                      { icon: Zap, label: 'Quick Start', id: 'quick-start' },
                      { icon: Code, label: 'API Reference', id: 'api-reference' },
                      { icon: BookOpen, label: 'Integration Examples', id: 'integrations' },
                      { icon: Shield, label: 'Authentication', id: 'auth' },
                      { icon: Settings, label: 'Best Practices', id: 'best-practices' },
                      { icon: HelpCircle, label: 'Troubleshooting', id: 'troubleshooting' },
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{item.label}</span>
                        <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Quick Start */}
              <section id="quick-start">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Quick Start Guide
                    </CardTitle>
                    <CardDescription>
                      Get your first AI agent running in under 5 minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {quickStartSteps.map((step, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                          <CodeBlock 
                            code={step.code} 
                            language="javascript" 
                            id={`quick-start-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* API Reference */}
              <section id="api-reference">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      API Reference
                    </CardTitle>
                    <CardDescription>
                      Complete reference for all Orchesity API endpoints
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-secondary/20 rounded-lg border border-border/10">
                        <h4 className="font-semibold mb-2">Base URL</h4>
                        <code className="text-primary">https://api.orchesityai.com</code>
                      </div>

                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="space-y-3 border-b border-border/20 pb-6 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                              {endpoint.method}
                            </Badge>
                            <code className="font-mono text-sm">{endpoint.path}</code>
                          </div>
                          <p className="text-muted-foreground">{endpoint.description}</p>
                          <CodeBlock 
                            code={endpoint.example} 
                            language="json" 
                            id={`api-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Integration Examples */}
              <section id="integrations">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Integration Examples
                    </CardTitle>
                    <CardDescription>
                      Sample code for popular frameworks and languages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="React">
                      <TabsList className="grid w-full grid-cols-3">
                        {integrationExamples.map((example) => (
                          <TabsTrigger key={example.name} value={example.name}>
                            {example.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {integrationExamples.map((example) => (
                        <TabsContent key={example.name} value={example.name} className="mt-6">
                          <CodeBlock 
                            code={example.code} 
                            language="javascript" 
                            id={`integration-${example.name}`}
                          />
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </section>

              {/* Authentication & Billing */}
              <section id="auth">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Authentication & Billing
                    </CardTitle>
                    <CardDescription>
                      Secure your API calls and manage subscriptions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">API Authentication</h4>
                      <CodeBlock 
                        code={`# Include your API key in all requests
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.orchesityai.com/api/agents

# JavaScript SDK
const client = new OrchesityClient('your-api-key');

# Python SDK
from orchesity import OrchesityClient
client = OrchesityClient(api_key='your-api-key')`}
                        language="bash"
                        id="auth-example"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Billing Integration</h4>
                      <p className="text-muted-foreground mb-3">
                        All billing is handled automatically through Stripe. Usage is tracked per API call.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <h5 className="font-medium">Starter</h5>
                          <p className="text-2xl font-bold">$9<span className="text-sm font-normal">/mo</span></p>
                          <p className="text-sm text-muted-foreground">1,000 API calls</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <h5 className="font-medium">Pro</h5>
                          <p className="text-2xl font-bold">$29<span className="text-sm font-normal">/mo</span></p>
                          <p className="text-sm text-muted-foreground">10,000 API calls</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <h5 className="font-medium">Enterprise</h5>
                          <p className="text-2xl font-bold">$99<span className="text-sm font-normal">/mo</span></p>
                          <p className="text-sm text-muted-foreground">Unlimited</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Best Practices */}
              <section id="best-practices">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Best Practices
                    </CardTitle>
                    <CardDescription>
                      Optimize performance and reduce costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Performance Optimization</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Cache agent responses when possible</li>
                          <li>• Use batch endpoints for multiple requests</li>
                          <li>• Implement request timeouts</li>
                          <li>• Choose the right model for your use case</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Cost Management</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Monitor usage through the dashboard</li>
                          <li>• Set up billing alerts</li>
                          <li>• Use smaller models for simple tasks</li>
                          <li>• Implement rate limiting in your app</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Troubleshooting */}
              <section id="troubleshooting">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Troubleshooting
                    </CardTitle>
                    <CardDescription>
                      Common issues and solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          issue: "401 Unauthorized Error",
                          solution: "Check that your API key is correct and included in the Authorization header."
                        },
                        {
                          issue: "Rate Limit Exceeded",
                          solution: "You've exceeded your plan's rate limits. Upgrade your plan or implement exponential backoff."
                        },
                        {
                          issue: "Agent Not Responding",
                          solution: "Check agent status in dashboard. Some models may take longer to respond."
                        },
                        {
                          issue: "CORS Issues",
                          solution: "Use the API from your backend, or contact support to whitelist your domain."
                        }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-secondary/20 rounded-lg border border-border/10">
                          <h4 className="font-semibold mb-2">{item.issue}</h4>
                          <p className="text-muted-foreground">{item.solution}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-2">Need More Help?</h4>
                      <p className="text-muted-foreground mb-4">
                        Can't find what you're looking for? Our support team is here to help.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                        <Button variant="outline" size="sm">
                          Join Discord
                        </Button>
                        <Button variant="outline" size="sm">
                          GitHub Issues
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* API Playground */}
              <section id="api-playground">
                <ApiPlayground />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}