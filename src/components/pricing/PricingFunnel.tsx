import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ArrowRight, Zap, Crown, Building2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePayments } from '@/hooks/usePayments';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for developers exploring AI agent capabilities',
    monthlyPrice: 9,
    yearlyPrice: 7.20, // 20% discount
    icon: Zap,
    features: [
      '1,000 API calls/month',
      'Basic AI agent orchestration',
      'Standard support',
      'Community access',
      'Basic analytics',
    ],
    cta: 'Get Started',
    ctaVariant: 'outline' as const,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Ideal for growing businesses with advanced AI needs',
    monthlyPrice: 29,
    yearlyPrice: 23.20, // 20% discount
    icon: Sparkles,
    popular: true,
    features: [
      '10,000 API calls/month',
      'Advanced orchestration with RAG',
      'Smart caching & batching',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
    cta: 'Start Pro',
    ctaVariant: 'hero' as const,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations requiring unlimited scale and support',
    monthlyPrice: 99,
    yearlyPrice: 79.20, // 20% discount
    icon: Crown,
    features: [
      'Unlimited API calls',
      'Everything in Pro',
      'Dedicated infrastructure',
      'SLA guarantees (99.99%)',
      'Dedicated support manager',
      'Custom development',
      'Advanced security features',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
  },
];

export const PricingFunnel = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { createCheckout, isLoading } = usePayments();

  const handlePlanSelect = async (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'starter') {
      // Redirect to auth for starter plan
      window.location.href = '/auth';
      return;
    }
    
    if (planId === 'enterprise') {
      window.location.href = '/support?contact=sales';
      return;
    }

    // Pro plan - create checkout session
    try {
      await createCheckout({
        price_ids: [isYearly ? 'price_pro_yearly' : 'price_pro_monthly'],
        success_url: `${window.location.origin}/dashboard?welcome=true`,
        cancel_url: `${window.location.origin}/subscription`,
      });
    } catch (error) {
      setSelectedPlan(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Pricing Toggle */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-4 p-1 bg-background/20 rounded-lg border border-border/20">
          <span className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`text-sm font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          {isYearly && (
            <Badge variant="secondary" className="text-xs">
              Save 20%
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const isSelected = selectedPlan === plan.id;
          const isPopular = plan.popular;

          return (
            <Card
              key={plan.id}
              className={`relative glass border-border/20 transition-all duration-300 hover:glow-accent ${
                isPopular ? 'ring-2 ring-primary glow-primary' : ''
              } ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-3 rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl gradient-text-primary">{plan.name}</CardTitle>
                  <CardDescription className="mt-2 text-base">{plan.description}</CardDescription>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold">
                    ${price}
                    {price > 0 && <span className="text-lg text-muted-foreground font-normal">/month</span>}
                  </div>
                  {isYearly && price > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Billed annually (${price * 12}/year)
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.id)}
                  variant={plan.ctaVariant}
                  size="lg"
                  className="w-full"
                  disabled={isLoading && selectedPlan === plan.id}
                >
                  {isLoading && selectedPlan === plan.id ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enterprise Features */}
      <div className="grid gap-6 lg:grid-cols-2 mt-16">
        <Card className="glass border-border/20 p-6">
          <div className="flex items-start gap-4">
            <Building2 className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-muted-foreground mb-4">
                SOC2 compliance, GDPR ready, enterprise SSO, and dedicated infrastructure for mission-critical applications.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/support?contact=enterprise">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="glass border-border/20 p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Cost Optimization</h3>
              <p className="text-muted-foreground mb-4">
                Advanced caching, smart batching, and provider optimization reduce LLM costs by up to 70% automatically.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/cost-calculator">
                  Calculate Savings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Have questions? Check our{' '}
          <Button asChild variant="link" className="p-0 h-auto">
            <Link to="/support">support center</Link>
          </Button>{' '}
          or{' '}
          <Button asChild variant="link" className="p-0 h-auto">
            <Link to="/docs">documentation</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};