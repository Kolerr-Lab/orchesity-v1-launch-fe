// API configuration and service layer
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription?: Subscription;
  createdAt: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  plan: string;
  priceId: string;
  currentPeriodEnd: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  model: string;
  plugins: string[];
  createdAt: string;
  lastUsed?: string;
  config?: AgentConfig;
}

export interface AgentConfig {
  temperature?: number;
  maxTokens?: number;
  ragEnabled?: boolean;
  srtEnabled?: boolean;
  rcpdEnabled?: boolean;
  provider?: string;
  batchSize?: number;
  semanticCache?: boolean;
  subAgents?: string[];
}

export interface OrchestrationRequest {
  prompt: string;
  agentId?: string;
  config?: {
    temperature?: number;
    maxTokens?: number;
    provider?: string;
    enableRag?: boolean;
    enableSrt?: boolean;
    enableRcpd?: boolean;
    context?: any;
  };
}

export interface BatchRequest {
  requests: OrchestrationRequest[];
  batchId?: string;
}

export interface PluginInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive';
  capabilities: string[];
}

export interface Metrics {
  totalRequests: number;
  activeAgents: number;
  avgResponseTime: number;
  uptime: number;
  requestsPerHour: number;
  errorRate: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  agentId?: string;
  userId?: string;
  metadata?: any;
}

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Mock API responses for testing
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    
    const mockResponses: Record<string, any> = {
      '/health': {
        data: {
          status: 'healthy',
          services: [
            { name: 'API Gateway', status: 'healthy', responseTime: 45, uptime: 99.9 },
            { name: 'Database', status: 'healthy', responseTime: 23, uptime: 99.8 },
            { name: 'Cache', status: 'healthy', responseTime: 12, uptime: 99.9 },
            { name: 'Auth Service', status: 'healthy', responseTime: 67, uptime: 99.7 },
          ],
          metrics: {
            cpuUsage: 45,
            memoryUsage: 67,
            diskUsage: 23,
            activeConnections: 234,
            requestRate: 1450,
            errorRate: 0.2,
          },
          lastChecked: new Date().toISOString(),
        }
      },
      '/quota/status': {
        data: {
          requests: { current: 8500, limit: 10000, resetDate: '2024-02-01' },
          tokens: { current: 450000, limit: 500000, resetDate: '2024-02-01' },
          cost: { current: 847.50, limit: 1000, resetDate: '2024-02-01' },
          rateLimit: { requestsPerMinute: 100, currentUsage: 23 },
        }
      },
      '/auth/login': {
        data: {
          token: 'mock-jwt-token-12345',
          user: {
            id: '1',
            email: 'user@orchesity.dev',
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            subscription: { 
              id: 'sub_1',
              plan: 'Pro', 
              status: 'active',
              priceId: 'price_pro',
              currentPeriodEnd: '2024-03-15'
            },
            createdAt: '2024-01-01T00:00:00Z'
          }
        }
      },
      '/auth/signup': {
        data: {
          token: 'mock-jwt-token-12345',
          user: {
            id: '1',
            email: 'user@orchesity.dev',
            name: 'John Doe',
            subscription: { 
              id: 'sub_1',
              plan: 'Starter', 
              status: 'active',
              priceId: 'price_starter',
              currentPeriodEnd: '2024-03-15'
            },
            createdAt: '2024-01-01T00:00:00Z'
          }
        }
      },
      '/auth/profile': {
        data: {
          id: '1',
          email: 'user@orchesity.dev',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          subscription: { 
            id: 'sub_1',
            plan: 'Pro', 
            status: 'active',
            priceId: 'price_pro',
            currentPeriodEnd: '2024-03-15'
          },
          createdAt: '2024-01-01T00:00:00Z'
        }
      },
      '/list': {
        data: [
          { 
            id: '1', 
            name: 'Customer Support Bot', 
            description: 'Handles customer inquiries with RAG-enabled knowledge base',
            status: 'active',
            model: 'gpt-4',
            plugins: ['zendesk', 'slack', 'rag'],
            createdAt: '2024-01-01T00:00:00Z',
            lastUsed: '2024-01-15T10:30:00Z',
            config: {
              temperature: 0.7,
              maxTokens: 2048,
              ragEnabled: true,
              srtEnabled: false,
              rcpdEnabled: true,
              provider: 'openai',
              batchSize: 10,
              semanticCache: true
            }
          },
          { 
            id: '2', 
            name: 'RAG Research Assistant', 
            description: 'Advanced research with retrieval-augmented generation',
            status: 'active',
            model: 'claude-3',
            plugins: ['rag', 'websearch', 'pdf'],
            createdAt: '2024-01-05T00:00:00Z',
            lastUsed: '2024-01-14T14:20:00Z',
            config: {
              temperature: 0.3,
              maxTokens: 4096,
              ragEnabled: true,
              srtEnabled: true,
              rcpdEnabled: true,
              provider: 'anthropic',
              batchSize: 5,
              semanticCache: true
            }
          }
        ]
      },
      '/plugins': {
        data: [
          {
            id: 'rag',
            name: 'RAG Plugin',
            description: 'Retrieval-Augmented Generation for enhanced responses',
            version: '1.2.0',
            status: 'active',
            capabilities: ['retrieval', 'embedding', 'vector_search']
          },
          {
            id: 'srt',
            name: 'Self-Reflected Thinking',
            description: 'Advanced reasoning with self-reflection capabilities',
            version: '1.0.0',
            status: 'active',
            capabilities: ['reflection', 'reasoning', 'meta_cognition']
          },
          {
            id: 'rcpd',
            name: 'Rapid Catching Prompt Detection',
            description: 'Fast prompt analysis and optimization',
            version: '1.1.0',
            status: 'active',
            capabilities: ['prompt_analysis', 'optimization', 'detection']
          }
        ]
      },
      '/stripe/subscription': {
        data: { 
          id: 'sub_1',
          plan: 'Pro', 
          status: 'active',
          priceId: 'price_pro',
          currentPeriodEnd: '2024-03-15'
        }
      },
      '/stripe/checkout': {
        data: { url: 'https://checkout.stripe.com/pay/mock-session-id' }
      },
      '/stripe/portal': {
        data: { url: 'https://billing.stripe.com/mock-portal' }
      },
      '/quota/limits': {
        data: { success: true }
      },
      '/metrics': {
        data: {
          totalRequests: 12540,
          activeAgents: 5,
          avgResponseTime: 145,
          uptime: 99.9,
          requestsPerHour: 2100,
          errorRate: 0.1
        }
      },
      '/api/agent/universal-prompt': {
        data: {
          response: "Universal agent orchestration response with advanced AI capabilities. This demonstrates RAG, SRT, and RCPD integration.",
          context: { provider: 'openai', features: ['rag', 'srt', 'rcpd'], timestamp: new Date().toISOString() }
        }
      },
      '/prompt': {
        data: {
          response: "Standard prompt orchestration response. This is a basic agent interaction.",
          metadata: { processingTime: 150, model: 'gpt-4' }
        }
      },
      '/rag-prompt': {
        data: {
          response: "RAG-enhanced response with retrieval-augmented generation. Knowledge retrieved from vector database.",
          sources: [
            { title: "AI Safety Guidelines", url: "/docs/safety", relevance: 0.95 },
            { title: "Best Practices", url: "/docs/best-practices", relevance: 0.87 }
          ]
        }
      },
      '/srt': {
        data: {
          response: "Self-Reflected Thinking response. I've analyzed my reasoning process and refined the answer.",
          reflection: "Upon reflection, I considered multiple perspectives and validated my reasoning against known facts."
        }
      },
      '/rcpd': {
        data: {
          response: "RCPD-optimized response. Rapid Catching Prompt Detection enhanced this interaction.",
          detection: { promptType: 'analytical', optimizations: ['clarity', 'specificity'], confidence: 0.92 }
        }
      },
      '/orchestrate': {
        data: {
          results: [
            { agentId: 'agent-1', response: 'Research completed successfully', status: 'completed' },
            { agentId: 'agent-2', response: 'Analysis finished with insights', status: 'completed' }
          ]
        }
      },
      '/batch-run': {
        data: {
          batchId: 'batch-' + Date.now(),
          results: [
            { id: 1, response: 'Task 1 completed', status: 'success' },
            { id: 2, response: 'Task 2 completed', status: 'success' },
            { id: 3, response: 'Task 3 completed', status: 'success' }
          ]
        }
      },
      '/run': {
        data: {
          response: "Agent execution completed successfully with provided input.",
          metadata: { executionTime: 200, status: 'success' }
        }
      },
      '/users': {
        data: [
          { id: '1', email: 'admin@orchesity.dev', name: 'Admin User', role: 'admin', createdAt: '2024-01-01T00:00:00Z' },
          { id: '2', email: 'user@orchesity.dev', name: 'John Doe', role: 'user', createdAt: '2024-01-01T00:00:00Z' }
        ]
      },
      '/logs': {
        data: [
          { id: '1', timestamp: '2024-01-15T10:30:00Z', level: 'info', message: 'Agent deployed successfully', agentId: '1' },
          { id: '2', timestamp: '2024-01-15T10:25:00Z', level: 'warn', message: 'Rate limit approaching', agentId: '2' }
        ]
      }
    };

    // Handle dynamic endpoints
    if (endpoint.startsWith('/config/')) {
      const agentId = endpoint.split('/')[2];
      if (options.method === 'PUT') {
        return {
          data: JSON.parse(options.body as string)
        } as ApiResponse<T>;
      }
      return {
        data: {
          temperature: 0.7,
          maxTokens: 2048,
          ragEnabled: true,
          srtEnabled: false,
          rcpdEnabled: true,
          provider: 'openai',
          batchSize: 10,
          semanticCache: true
        }
      } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/logs/')) {
      return {
        data: [
          { id: '1', timestamp: '2024-01-15T10:30:00Z', level: 'info', message: 'Agent executed successfully', agentId: endpoint.split('/')[2] },
          { id: '2', timestamp: '2024-01-15T10:25:00Z', level: 'debug', message: 'Processing user request', agentId: endpoint.split('/')[2] }
        ]
      } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/status/')) {
      return {
        data: {
          status: 'healthy',
          health: { cpu: 34, memory: 67, uptime: '99.9%', lastCheck: new Date().toISOString() }
        }
      } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/history/')) {
      return {
        data: [
          { id: '1', timestamp: '2024-01-15T10:30:00Z', input: 'User query', output: 'Agent response', duration: 150 },
          { id: '2', timestamp: '2024-01-15T10:25:00Z', input: 'Another query', output: 'Another response', duration: 200 }
        ]
      } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/update/') && options.method === 'PUT') {
      return {
        data: {
          id: endpoint.split('/')[2],
          name: 'Updated Agent',
          description: 'Updated description',
          status: 'active' as const,
          model: 'gpt-4',
          plugins: [],
          createdAt: '2024-01-01T00:00:00Z'
        }
      } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/delete/') && options.method === 'DELETE') {
      return { data: null } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/plugin/') && endpoint.includes('/activate')) {
      return { data: { success: true } } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/plugin/') && endpoint.includes('/deactivate')) {
      return { data: { success: true } } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/users/') && endpoint.includes('/role')) {
      return { data: { success: true } } as ApiResponse<T>;
    }

    if (options.method === 'POST' && endpoint === '/create') {
      return {
        data: {
          id: 'new-agent-id',
          name: 'New Agent',
          description: 'New agent description',
          status: 'active' as const,
          model: 'gpt-4',
          plugins: [],
          createdAt: new Date().toISOString()
        }
      } as ApiResponse<T>;
    }

    if (options.method === 'POST' && endpoint === '/users/create') {
      return {
        data: {
          id: 'new-user-id',
          email: JSON.parse(options.body as string).email,
          name: JSON.parse(options.body as string).name,
          role: JSON.parse(options.body as string).role || 'user',
          createdAt: new Date().toISOString()
        }
      } as ApiResponse<T>;
    }

    const mockResponse = mockResponses[endpoint];
    if (!mockResponse) {
      throw new Error(`Mock endpoint not found: ${endpoint}`);
    }

    return mockResponse;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email: string, password: string, name: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request('/auth/profile');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Stripe endpoints
  async createCheckoutSession(priceId: string): Promise<ApiResponse<{ url: string }>> {
    return this.request('/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    });
  }

  async createPortalSession(): Promise<ApiResponse<{ url: string }>> {
    return this.request('/stripe/portal', { method: 'POST' });
  }

  async getSubscription(): Promise<ApiResponse<Subscription>> {
    return this.request('/stripe/subscription');
  }

  // Agent Orchestration endpoints
  async universalPrompt(request: OrchestrationRequest): Promise<ApiResponse<{ response: string; context?: any }>> {
    return this.request('/api/agent/universal-prompt', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async promptOrchestration(prompt: string, config?: any): Promise<ApiResponse<{ response: string }>> {
    return this.request('/prompt', {
      method: 'POST',
      body: JSON.stringify({ prompt, config }),
    });
  }

  async ragPrompt(prompt: string, agentId?: string): Promise<ApiResponse<{ response: string; sources?: any[] }>> {
    return this.request('/rag-prompt', {
      method: 'POST',
      body: JSON.stringify({ prompt, agentId }),
    });
  }

  async srtPrompt(prompt: string, agentId?: string): Promise<ApiResponse<{ response: string; reflection?: string }>> {
    return this.request('/srt', {
      method: 'POST',
      body: JSON.stringify({ prompt, agentId }),
    });
  }

  async rcpdPrompt(prompt: string, agentId?: string): Promise<ApiResponse<{ response: string; detection?: any }>> {
    return this.request('/rcpd', {
      method: 'POST',
      body: JSON.stringify({ prompt, agentId }),
    });
  }

  async orchestrateAgents(requests: OrchestrationRequest[]): Promise<ApiResponse<{ results: any[] }>> {
    return this.request('/orchestrate', {
      method: 'POST',
      body: JSON.stringify({ requests }),
    });
  }

  async batchRun(batchRequest: BatchRequest): Promise<ApiResponse<{ batchId: string; results?: any[] }>> {
    return this.request('/batch-run', {
      method: 'POST',
      body: JSON.stringify(batchRequest),
    });
  }

  // Agent CRUD endpoints
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    return this.request('/list');
  }

  async createAgent(agent: Omit<Agent, 'id' | 'createdAt'>): Promise<ApiResponse<Agent>> {
    return this.request('/create', {
      method: 'POST',
      body: JSON.stringify(agent),
    });
  }

  async updateAgent(id: string, agent: Partial<Agent>): Promise<ApiResponse<Agent>> {
    return this.request(`/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(agent),
    });
  }

  async deleteAgent(id: string): Promise<ApiResponse<null>> {
    return this.request(`/delete/${id}`, { method: 'DELETE' });
  }

  async getAgentConfig(id: string): Promise<ApiResponse<AgentConfig>> {
    return this.request(`/config/${id}`);
  }

  async updateAgentConfig(id: string, config: AgentConfig): Promise<ApiResponse<AgentConfig>> {
    return this.request(`/config/${id}`, {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }

  async getAgentLogs(id: string): Promise<ApiResponse<LogEntry[]>> {
    return this.request(`/logs/${id}`);
  }

  async getAgentStatus(id: string): Promise<ApiResponse<{ status: string; health: any }>> {
    return this.request(`/status/${id}`);
  }

  async getAgentHistory(id: string): Promise<ApiResponse<any[]>> {
    return this.request(`/history/${id}`);
  }

  async runAgent(agentId: string, input: any): Promise<ApiResponse<{ response: string; metadata?: any }>> {
    return this.request('/run', {
      method: 'POST',
      body: JSON.stringify({ agentId, input }),
    });
  }

  // Plugin endpoints
  async getPlugins(): Promise<ApiResponse<PluginInfo[]>> {
    return this.request('/plugins');
  }

  async activatePlugin(pluginId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(`/plugin/${pluginId}/activate`, {
      method: 'POST',
    });
  }

  async deactivatePlugin(pluginId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(`/plugin/${pluginId}/deactivate`, {
      method: 'POST',
    });
  }

  // User Management endpoints
  async createUser(userData: { email: string; password: string; name: string; role?: string }): Promise<ApiResponse<User>> {
    return this.request('/users/create', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUserRole(userId: string, role: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request('/users');
  }

  // Metrics and logs
  async getMetrics(): Promise<ApiResponse<Metrics>> {
    return this.request('/metrics');
  }

  async getLogs(agentId?: string): Promise<ApiResponse<LogEntry[]>> {
    const endpoint = agentId ? `/logs?agent_id=${agentId}` : '/logs';
    return this.request(endpoint);
  }

  // Quota Management
  async getQuotaStatus(): Promise<ApiResponse<any>> {
    return this.request('/quota/status');
  }

  async updateQuotaLimits(limits: any): Promise<ApiResponse<any>> {
    return this.request('/quota/limits', {
      method: 'PUT',
      body: JSON.stringify(limits),
    });
  }

  // System Health
  async getSystemHealth(): Promise<ApiResponse<any>> {
    return this.request('/health');
  }
}

export const api = new ApiService();