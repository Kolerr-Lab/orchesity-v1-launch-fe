import { useState, useCallback } from 'react';
import { stripeService, CheckoutSessionRequest } from '@/services/stripe.service';
import { useToast } from '@/hooks/use-toast';

export const usePayments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createCheckout = useCallback(async (options: CheckoutSessionRequest) => {
    setIsLoading(true);
    
    try {
      const session = await stripeService.createCheckoutSession(options);
      window.location.href = session.url;
      return session;
    } catch (error) {
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to start checkout',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const manageBilling = useCallback(async (returnUrl?: string) => {
    setIsLoading(true);
    
    try {
      const { url } = await stripeService.createPortalSession(
        returnUrl || window.location.href
      );
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Billing Error',
        description: error instanceof Error ? error.message : 'Failed to open billing portal',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    isLoading,
    createCheckout,
    manageBilling,
  };
};