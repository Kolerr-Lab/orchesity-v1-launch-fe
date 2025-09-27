// Common shared types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status_code: number;
  details?: Record<string, any>;
}