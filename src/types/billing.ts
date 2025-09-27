// Billing and subscription related types

export interface UsageStats {
  current_period: {
    start_date: string;
    end_date: string;
    requests: number;
    tokens: number;
    cost: number;
  };
  daily_usage: DailyUsage[];
  top_models: ModelUsage[];
}

export interface DailyUsage {
  date: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface ModelUsage {
  model: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    requests: number;
    tokens: number;
    team_members?: number;
  };
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  description: string;
  invoice_url?: string;
  created_at: string;
}

export interface CheckoutSession {
  checkout_url: string;
}

export interface PortalSession {
  portal_url: string;
}