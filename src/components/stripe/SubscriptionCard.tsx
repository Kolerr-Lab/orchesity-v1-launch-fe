import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Crown, Zap, Star } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  icon: React.ComponentType<any>;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'price_starter',
    name: 'Starter',
    description: 'Perfect for individuals getting started',
    price: 9,
    interval: 'month',
    features: [
      '5 AI Agents',
      '1,000 API calls/month',
      'Basic RAG support',
      'Email support'
    ],
    icon: Zap,
  },
  {
    id: 'price_pro',
    name: 'Pro',
    description: 'Best for growing teams and businesses',
    price: 29,
    interval: 'month',
    features: [
      '25 AI Agents',
      '10,000 API calls/month',
      'Advanced RAG support',
      'Custom plugins',
      'Priority support'
    ],
    icon: Star,
    popular: true,
  },
  {
    id: 'price_enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 99,
    interval: 'month',
    features: [
      'Unlimited AI Agents',
      'Unlimited API calls',
      'Custom integrations',
      'White-label support',
      'Dedicated support'
    ],
    icon: Crown,
  },
];

export const SubscriptionCard = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId);
    try {
      const response = await api.createCheckoutSession(priceId);
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`glass border-border/20 relative ${
            plan.popular ? 'glow-primary ring-2 ring-primary/20' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>
          )}
          
          <CardHeader className="text-center">
            <plan.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.interval}</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button
              className="w-full"
              variant={plan.popular ? 'hero' : 'outline'}
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading === plan.id}
            >
              {loading === plan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Started
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};