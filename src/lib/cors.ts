// CORS configuration for API integration
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://api.yourdomain.com']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-HTTP-Method-Override',
    'Accept',
    'Origin',
  ],
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

// Helper function to setup CORS for API requests
export const setupApiClient = () => {
  // This would typically be used with axios or fetch interceptors
  // to automatically handle CORS and authentication headers
  return {
    get: (url: string, config?: any) => 
      fetch(`${apiConfig.baseURL}${url}`, {
        method: 'GET',
        headers: { ...apiConfig.headers, ...config?.headers },
        credentials: 'include',
        ...config,
      }),
    post: (url: string, data?: any, config?: any) =>
      fetch(`${apiConfig.baseURL}${url}`, {
        method: 'POST',
        headers: { ...apiConfig.headers, ...config?.headers },
        credentials: 'include',
        body: JSON.stringify(data),
        ...config,
      }),
    put: (url: string, data?: any, config?: any) =>
      fetch(`${apiConfig.baseURL}${url}`, {
        method: 'PUT',
        headers: { ...apiConfig.headers, ...config?.headers },
        credentials: 'include',
        body: JSON.stringify(data),
        ...config,
      }),
    delete: (url: string, config?: any) =>
      fetch(`${apiConfig.baseURL}${url}`, {
        method: 'DELETE',
        headers: { ...apiConfig.headers, ...config?.headers },
        credentials: 'include',
        ...config,
      }),
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