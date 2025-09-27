// Billing & subscription API calls

import { BaseApiService } from './api';
import type { ApiResponse } from '@/types/common';
import type {
  UsageStats,
  SubscriptionPlan,
  PaymentHistory,
  CheckoutSession,
  PortalSession
} from '@/types/billing';

class BillingService extends BaseApiService {
  async getUsageStats(): Promise<ApiResponse<UsageStats>> {
    return this.request('/billing/usage');
  }

  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    return this.request('/billing/plans');
  }

  async createCheckoutSession(planId: string): Promise<ApiResponse<CheckoutSession>> {
    return this.request('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
  }

  async createPortalSession(): Promise<ApiResponse<PortalSession>> {
    return this.request('/billing/portal', { method: 'POST' });
  }

  async getPaymentHistory(): Promise<ApiResponse<PaymentHistory[]>> {
    return this.request('/billing/history');
  }
}

export const billingService = new BillingService();