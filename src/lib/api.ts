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
      '/agents': {
        data: [
          { 
            id: '1', 
            name: 'Customer Support Bot', 
            description: 'Handles customer inquiries with advanced NLP',
            status: 'active',
            model: 'gpt-4',
            plugins: ['zendesk', 'slack'],
            createdAt: '2024-01-01T00:00:00Z',
            lastUsed: '2024-01-15T10:30:00Z'
          },
          { 
            id: '2', 
            name: 'Sales Assistant', 
            description: 'Helps with lead qualification and follow-ups',
            status: 'inactive',
            model: 'claude-3',
            plugins: ['salesforce', 'hubspot'],
            createdAt: '2024-01-05T00:00:00Z',
            lastUsed: '2024-01-14T14:20:00Z'
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
      '/metrics': {
        data: {
          totalRequests: 12540,
          activeAgents: 5,
          avgResponseTime: 145,
          uptime: 99.9
        }
      },
      '/logs': {
        data: [
          { id: '1', timestamp: '2024-01-15T10:30:00Z', level: 'info', message: 'Agent deployed successfully', agentId: '1' },
          { id: '2', timestamp: '2024-01-15T10:25:00Z', level: 'warn', message: 'Rate limit approaching', agentId: '2' }
        ]
      }
    };

    // Handle dynamic endpoints
    if (endpoint.startsWith('/agents/') && endpoint.includes('/chat')) {
      return {
        data: {
          response: "Hello! I'm a mock AI agent response. This would be the actual agent's reply in production.",
          context: { agentId: endpoint.split('/')[2], timestamp: new Date().toISOString() }
        }
      } as ApiResponse<T>;
    }

    if (endpoint.startsWith('/agents/') && options.method === 'PUT') {
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

    if (endpoint.startsWith('/agents/') && options.method === 'DELETE') {
      return { data: null } as ApiResponse<T>;
    }

    if (options.method === 'POST' && endpoint === '/agents') {
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

  // Agent endpoints
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    return this.request('/agents');
  }

  async createAgent(agent: Omit<Agent, 'id' | 'createdAt'>): Promise<ApiResponse<Agent>> {
    return this.request('/agents', {
      method: 'POST',
      body: JSON.stringify(agent),
    });
  }

  async updateAgent(id: string, agent: Partial<Agent>): Promise<ApiResponse<Agent>> {
    return this.request(`/agents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(agent),
    });
  }

  async deleteAgent(id: string): Promise<ApiResponse<null>> {
    return this.request(`/agents/${id}`, { method: 'DELETE' });
  }

  async chatWithAgent(agentId: string, message: string): Promise<ApiResponse<{ response: string; context?: any }>> {
    return this.request(`/agents/${agentId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Metrics and logs
  async getMetrics(): Promise<ApiResponse<any>> {
    return this.request('/metrics');
  }

  async getLogs(agentId?: string): Promise<ApiResponse<any[]>> {
    const endpoint = agentId ? `/logs?agent_id=${agentId}` : '/logs';
    return this.request(endpoint);
  }
}

export const api = new ApiService();