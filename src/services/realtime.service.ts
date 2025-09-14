import { api } from '@/lib/api';

interface RealtimeMetrics {
  requestsPerSecond: number;
  errorRate: number;
  avgResponseTime: number;
  activeConnections: number;
  systemLoad: number;
}

interface RealtimeCallback {
  (data: RealtimeMetrics): void;
}

class RealtimeService {
  private ws: WebSocket | null = null;
  private callbacks: Set<RealtimeCallback> = new Set();
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = process.env.VITE_WS_URL || 'ws://localhost:8000/ws';
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      
      // Send authentication token if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.ws?.send(JSON.stringify({ type: 'auth', token }));
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'metrics') {
          this.callbacks.forEach(callback => callback(data.payload));
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  subscribe(callback: RealtimeCallback) {
    this.callbacks.add(callback);
    
    // Auto-connect if not already connected
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect();
    }

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
      
      // Disconnect if no more subscribers
      if (this.callbacks.size === 0) {
        this.disconnect();
      }
    };
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
    this.reconnectAttempts++;

    this.reconnectTimer = setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect();
    }, delay);
  }

  sendMessage(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }
}

export const realtimeService = new RealtimeService();