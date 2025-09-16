import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Calendar, CreditCard, AlertTriangle, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react';
import { stripeService, Subscription, Customer } from '@/services/stripe.service';
import { useToast } from '@/hooks/use-toast';

export const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      const [subscriptions, customerData] = await Promise.all([
        stripeService.getSubscriptions(),
        stripeService.getCustomer(),
      ]);

      setCustomer(customerData);
      
      // Get the most recent active subscription
      const activeSubscription = subscriptions.find(sub => 
        ['active', 'trialing', 'past_due'].includes(sub.status)
      ) || subscriptions[0];
      
      setSubscription(activeSubscription);
    } catch (error) {
      // Silently handle error without toast notification
      console.error('Failed to load subscription information:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsManaging(true);
    
    try {
      const { url } = await stripeService.createPortalSession(window.location.href);
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to open billing portal',
        variant: 'destructive',
      });
      setIsManaging(false);
    }
  };

  const getStatusBadge = (status: Subscription['status']) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'default' as const, icon: CheckCircle2 },
      trialing: { label: 'Trial', variant: 'secondary' as const, icon: CheckCircle2 },
      past_due: { label: 'Past Due', variant: 'destructive' as const, icon: AlertTriangle },
      canceled: { label: 'Canceled', variant: 'outline' as const, icon: AlertTriangle },
      unpaid: { label: 'Unpaid', variant: 'destructive' as const, icon: AlertTriangle },
      incomplete: { label: 'Incomplete', variant: 'outline' as const, icon: AlertTriangle },
      incomplete_expired: { label: 'Expired', variant: 'destructive' as const, icon: AlertTriangle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card className="glass border-border/20">
        <CardContent className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>
            You don't have an active subscription. Choose a plan to get started.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const primaryPrice = subscription.items.data[0]?.price;
  const statusType = stripeService.getSubscriptionStatus(subscription);

  return (
    <Card className="glass border-border/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            Current Subscription
            {getStatusBadge(subscription.status)}
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </div>
        <Button
          onClick={handleManageBilling}
          variant="outline"
          disabled={isManaging}
        >
          {isManaging ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Opening...
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Manage Billing
            </>
          )}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {statusType === 'past_due' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your subscription payment is past due. Please update your payment method to continue service.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CreditCard className="h-4 w-4" />
              Plan Details
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              {primaryPrice && (
                <>
                  <p>Amount: {stripeService.formatPrice(primaryPrice.unit_amount)}</p>
                  {primaryPrice.recurring && (
                    <p>Billing: Every {primaryPrice.recurring.interval}</p>
                  )}
                  <p>Quantity: {subscription.items.data[0]?.quantity || 1}</p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Billing Period
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Current period: {stripeService.formatDate(subscription.current_period_start)} - {' '}
                {stripeService.formatDate(subscription.current_period_end)}
              </p>
              {subscription.status === 'active' && (
                <p>
                  Next billing: {stripeService.formatDate(subscription.current_period_end)}
                </p>
              )}
            </div>
          </div>
        </div>

        {customer && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Customer Information</div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Email: {customer.email}</p>
              {customer.name && <p>Name: {customer.name}</p>}
              <p>Customer ID: {customer.id}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};