import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Calendar,
  Download,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { UsageStats, SubscriptionPlan, PaymentHistory } from '@/types/orchesity';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function BillingDashboard() {
  const { toast } = useToast();
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      const [usageResponse, plansResponse, historyResponse] = await Promise.all([
        orchesityService.getUsageStats(),
        orchesityService.getSubscriptionPlans(),
        orchesityService.getPaymentHistory(),
      ]);

      setUsageStats(usageResponse.data);
      setSubscriptionPlans(plansResponse.data);
      setPaymentHistory(historyResponse.data);
    } catch (error) {
      toast({
        title: 'Failed to load billing data',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    try {
      const response = await orchesityService.createCheckoutSession(planId);
      window.location.href = response.data.checkout_url;
    } catch (error) {
      toast({
        title: 'Failed to create checkout session',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleManageBilling = async () => {
    try {
      const response = await orchesityService.createPortalSession();
      window.open(response.data.portal_url, '_blank');
    } catch (error) {
      toast({
        title: 'Failed to open billing portal',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-2"></div>
          <span>Loading billing information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <CreditCard className="mr-3 h-8 w-8 text-primary" />
          Billing & Usage
        </h1>
        <p className="text-muted-foreground">
          Monitor your usage, manage your subscription, and view billing history
        </p>
      </div>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="usage">Usage & Stats</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        {/* Usage & Stats */}
        <TabsContent value="usage" className="space-y-6">
          {usageStats && (
            <>
              {/* Current Period Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{usageStats.current_period.requests.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {usageStats.current_period.start_date} - {usageStats.current_period.end_date}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{usageStats.current_period.tokens.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Across all models and providers
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${usageStats.current_period.cost.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      Current billing period
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Usage Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Usage Trends</CardTitle>
                  <CardDescription>
                    Your daily API usage over the current billing period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={usageStats.daily_usage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: any, name: string) => [
                          name === 'requests' ? value.toLocaleString() : 
                          name === 'tokens' ? value.toLocaleString() : 
                          `$${value.toFixed(2)}`,
                          name === 'requests' ? 'Requests' :
                          name === 'tokens' ? 'Tokens' : 'Cost'
                        ]}
                      />
                      <Line type="monotone" dataKey="requests" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Models Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Usage Breakdown</CardTitle>
                  <CardDescription>
                    Most used AI models in the current period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageStats.top_models}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          name === 'requests' ? value.toLocaleString() : 
                          name === 'tokens' ? value.toLocaleString() : 
                          `$${value.toFixed(2)}`,
                          name === 'requests' ? 'Requests' :
                          name === 'tokens' ? 'Tokens' : 'Cost'
                        ]}
                      />
                      <Bar dataKey="requests" fill="#8884d8" />
                      <Bar dataKey="cost" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Subscription Plans */}
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="relative">
                {plan.name === 'Pro' && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Requests</span>
                      <span>{plan.limits.requests.toLocaleString()}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tokens</span>
                      <span>{plan.limits.tokens.toLocaleString()}/month</span>
                    </div>
                    {plan.limits.team_members && (
                      <div className="flex justify-between text-sm">
                        <span>Team Members</span>
                        <span>{plan.limits.team_members}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full"
                    variant={plan.name === 'Pro' ? 'default' : 'outline'}
                  >
                    {plan.name === 'Free' ? 'Current Plan' : 'Upgrade to ' + plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Billing Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Manage your subscription, update payment methods, and view invoices
                  </p>
                </div>
                <Button onClick={handleManageBilling} variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Manage Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Your billing and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">
                            ${payment.amount.toFixed(2)} {payment.currency.toUpperCase()}
                          </p>
                          <Badge 
                            variant={
                              payment.status === 'succeeded' ? 'default' :
                              payment.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                        {payment.invoice_url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(payment.invoice_url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No payment history available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}