// Production-ready Stripe service
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  metadata: Record<string, string>;
}

export interface Price {
  id: string;
  product: string;
  unit_amount: number;
  currency: string;
  recurring?: {
    interval: 'month' | 'year';
    interval_count: number;
  };
  metadata: Record<string, string>;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  metadata: Record<string, string>;
}

export interface Subscription {
  id: string;
  customer: string;
  status: 'active' | 'past_due' | 'canceled' | 'unpaid' | 'trialing' | 'incomplete' | 'incomplete_expired';
  current_period_start: number;
  current_period_end: number;
  items: {
    data: Array<{
      id: string;
      price: Price;
      quantity: number;
    }>;
  };
  metadata: Record<string, string>;
}

export interface PaymentIntent {
  id: string;
  client_secret: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  amount: number;
  currency: string;
}

export interface CheckoutSessionRequest {
  price_ids: string[];
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSession {
  id: string;
  url: string;
  customer: string;
  payment_status: 'paid' | 'unpaid' | 'no_payment_required';
}

class StripeService {
  private baseURL = '/api/payments';

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment request failed');
    }

    return response.json();
  }

  // Checkout Sessions
  async createCheckoutSession(data: CheckoutSessionRequest): Promise<CheckoutSession> {
    return this.makeRequest<CheckoutSession>('/checkout/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCheckoutSession(sessionId: string): Promise<CheckoutSession> {
    return this.makeRequest<CheckoutSession>(`/checkout/${sessionId}`);
  }

  // Customer Portal
  async createPortalSession(returnUrl: string): Promise<{ url: string }> {
    return this.makeRequest<{ url: string }>('/portal/create', {
      method: 'POST',
      body: JSON.stringify({ return_url: returnUrl }),
    });
  }

  // Products & Prices
  async getProducts(): Promise<Product[]> {
    return this.makeRequest<Product[]>('/products');
  }

  async getProduct(productId: string): Promise<Product> {
    return this.makeRequest<Product>(`/products/${productId}`);
  }

  async getPrices(productId?: string): Promise<Price[]> {
    const query = productId ? `?product=${productId}` : '';
    return this.makeRequest<Price[]>(`/prices${query}`);
  }

  // Customer Management
  async getCustomer(): Promise<Customer> {
    return this.makeRequest<Customer>('/customer');
  }

  async updateCustomer(data: Partial<Customer>): Promise<Customer> {
    return this.makeRequest<Customer>('/customer', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Subscriptions
  async getSubscriptions(): Promise<Subscription[]> {
    return this.makeRequest<Subscription[]>('/subscriptions');
  }

  async getSubscription(subscriptionId: string): Promise<Subscription> {
    return this.makeRequest<Subscription>(`/subscriptions/${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true): Promise<Subscription> {
    return this.makeRequest<Subscription>(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ cancel_at_period_end: cancelAtPeriodEnd }),
    });
  }

  async updateSubscription(subscriptionId: string, data: { price_id?: string; quantity?: number }): Promise<Subscription> {
    return this.makeRequest<Subscription>(`/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Payment Intents (for one-time payments)
  async createPaymentIntent(amount: number, currency = 'usd', metadata?: Record<string, string>): Promise<PaymentIntent> {
    return this.makeRequest<PaymentIntent>('/payment-intents', {
      method: 'POST',
      body: JSON.stringify({ amount, currency, metadata }),
    });
  }

  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    return this.makeRequest<PaymentIntent>(`/payment-intents/${paymentIntentId}`);
  }

  // Utility methods
  formatPrice(amount: number, currency = 'usd'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString();
  }

  getSubscriptionStatus(subscription: Subscription): 'active' | 'past_due' | 'canceled' | 'other' {
    switch (subscription.status) {
      case 'active':
      case 'trialing':
        return 'active';
      case 'past_due':
      case 'unpaid':
        return 'past_due';
      case 'canceled':
      case 'incomplete_expired':
        return 'canceled';
      default:
        return 'other';
    }
  }
}

export const stripeService = new StripeService();