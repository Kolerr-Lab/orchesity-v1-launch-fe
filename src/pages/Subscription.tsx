import Navigation from '@/components/Navigation';
import { SubscriptionCard } from '@/components/stripe/SubscriptionCard';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function Subscription() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const response = await api.createPortalSession();
      window.open(response.data.url, '_blank');
    } catch (error) {
      toast({
        title: "Failed to open billing portal",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text-primary">Plan</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Scale your AI agent operations with flexible pricing designed for every use case
            </p>
          </div>

          {/* Current Subscription */}
          {user?.subscription && (
            <div className="mb-12">
              <Card className="glass border-border/20 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Current Subscription
                  </CardTitle>
                  <CardDescription>
                    Manage your current plan and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="default">{user.subscription.plan}</Badge>
                      <Badge 
                        variant={user.subscription.status === 'active' ? 'default' : 'secondary'}
                      >
                        {user.subscription.status}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleManageBilling}
                      disabled={loading}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Manage Billing
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Next billing date: {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pricing Plans */}
          <SubscriptionCard />

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="text-lg">Can I change my plan anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="text-lg">What happens if I exceed my limits?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We'll notify you when approaching limits. You can upgrade your plan or purchase additional capacity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}