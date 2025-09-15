// Production-ready CORS configuration for API integration
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://yourdomain.com', 
        'https://www.yourdomain.com',
        'https://api.yourdomain.com',
        // Add your production domains here
      ]
    : [
        'http://localhost:3000', 
        'http://localhost:5173', 
        'http://localhost:8000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
      ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-HTTP-Method-Override',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-CSRF-Token',
  ],
  optionsSuccessStatus: 200, // Legacy browser support
  maxAge: 86400, // 24 hours
};

// API Configuration for backend integration
export const apiConfig = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://api.yourdomain.com'
    : 'http://localhost:8000',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Production-ready API client with enhanced error handling and security
export const setupApiClient = () => {
  const makeRequest = async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
    
    try {
      const response = await fetch(`${apiConfig.baseURL}${url}`, {
        ...options,
        headers: { 
          ...apiConfig.headers, 
          ...options.headers,
          // Add CSRF protection
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      // Handle common HTTP errors
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized - redirect to login
          window.location.href = '/auth';
          throw new Error('Unauthorized');
        }
        
        if (response.status === 403) {
          throw new Error('Forbidden: Insufficient permissions');
        }
        
        if (response.status >= 500) {
          throw new Error('Server error: Please try again later');
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  };
  
  return {
    get: (url: string, config?: RequestInit) => 
      makeRequest(url, { method: 'GET', ...config }),
      
    post: (url: string, data?: any, config?: RequestInit) =>
      makeRequest(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      }),
      
    put: (url: string, data?: any, config?: RequestInit) =>
      makeRequest(url, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      }),
      
    patch: (url: string, data?: any, config?: RequestInit) =>
      makeRequest(url, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      }),
      
    delete: (url: string, config?: RequestInit) =>
      makeRequest(url, { method: 'DELETE', ...config }),
  };
};

// Backend integration helper for Orchesity AI
export const orchesityApiEndpoints = {
  agents: {
    list: '/api/agents',
    create: '/api/agents',
    update: (id: string) => `/api/agents/${id}`,
    delete: (id: string) => `/api/agents/${id}`,
    run: (id: string) => `/api/agents/${id}/run`,
  },
  orchestration: {
    universal: '/api/orchestration/universal',
    batch: '/api/orchestration/batch',
    rag: '/api/orchestration/rag',
    srt: '/api/orchestration/srt',
    rcpd: '/api/orchestration/rcpd',
  },
  plugins: {
    list: '/api/plugins',
    install: '/api/plugins/install',
    activate: (id: string) => `/api/plugins/${id}/activate`,
    deactivate: (id: string) => `/api/plugins/${id}/deactivate`,
  },
  metrics: {
    usage: '/api/metrics/usage',
    cost: '/api/metrics/cost',
    performance: '/api/metrics/performance',
  },
  webhooks: {
    create: '/api/webhooks',
    list: '/api/webhooks',
    update: (id: string) => `/api/webhooks/${id}`,
    delete: (id: string) => `/api/webhooks/${id}`,
  },
};