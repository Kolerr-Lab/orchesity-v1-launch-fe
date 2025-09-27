// Base API configuration with interceptors

export class BaseApiService {
  protected baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  }

  protected getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // WebSocket connection helper
  createWebSocketConnection(path: string, params?: Record<string, string>): WebSocket {
    const wsUrl = this.baseURL.replace('http', 'ws');
    const token = localStorage.getItem('access_token');
    
    const searchParams = new URLSearchParams({
      token: token || '',
      ...params
    });
    
    return new WebSocket(`${wsUrl}/ws${path}?${searchParams}`);
  }
}