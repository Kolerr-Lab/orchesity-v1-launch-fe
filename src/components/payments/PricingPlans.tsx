import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Check, Star, Loader2 } from 'lucide-react';
import { stripeService, Product, Price } from '@/services/stripe.service';
import { useToast } from '@/hooks/use-toast';

interface PricingPlan {
  product: Product;
  prices: Price[];
  features: string[];
  popular?: boolean;
}

interface PricingPlansProps {
  onSelectPlan?: (priceId: string) => void;
  showYearly?: boolean;
}

export const PricingPlans = ({ onSelectPlan, showYearly = false }: PricingPlansProps) => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const [products, prices] = await Promise.all([
        stripeService.getProducts(),
        stripeService.getPrices(),
      ]);

      // Group prices by product and create plan structure
      const plansMap = new Map<string, PricingPlan>();
      
      products.forEach(product => {
        const productPrices = prices.filter(price => price.product === product.id);
        
        if (productPrices.length > 0) {
          plansMap.set(product.id, {
            product,
            prices: productPrices,
            features: product.metadata.features ? product.metadata.features.split(',') : [],
            popular: product.metadata.popular === 'true',
          });
        }
      });

      setPlans(Array.from(plansMap.values()));
    } catch (error) {
      toast({
        title: 'Error loading plans',
        description: 'Failed to load pricing information',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = async (priceId: string) => {
    setSelectedPriceId(priceId);
    
    try {
      if (onSelectPlan) {
        onSelectPlan(priceId);
      } else {
        // Default checkout behavior
        const session = await stripeService.createCheckoutSession({
          price_ids: [priceId],
          success_url: `${window.location.origin}/dashboard?success=true`,
          cancel_url: `${window.location.origin}/subscription?canceled=true`,
        });
        
        window.location.href = session.url;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start checkout process',
        variant: 'destructive',
      });
    } finally {
      setSelectedPriceId(null);
    }
  };

  const getDisplayPrice = (plan: PricingPlan): { price: Price; display: string } | null => {
    const targetInterval = showYearly ? 'year' : 'month';
    const price = plan.prices.find(p => 
      p.recurring?.interval === targetInterval || 
      (!p.recurring && targetInterval === 'month')
    );

    if (!price) return null;

    const display = price.recurring
      ? `${stripeService.formatPrice(price.unit_amount)}/${price.recurring.interval}`
      : stripeService.formatPrice(price.unit_amount);

    return { price, display };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pricing plans available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      {plans.map((plan) => {
        const priceInfo = getDisplayPrice(plan);
        if (!priceInfo) return null;

        const { price, display } = priceInfo;
        const isPopular = plan.popular;

        return (
          <Card 
            key={plan.product.id} 
            className={`relative glass border-border/20 ${
              isPopular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.product.name}</CardTitle>
              <CardDescription>{plan.product.description}</CardDescription>
              <div className="text-3xl font-bold gradient-text-primary">
                {display}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature.trim()}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSelectPlan(price.id)}
                className="w-full"
                variant={isPopular ? "hero" : "outline"}
                disabled={selectedPriceId !== null}
              >
                {selectedPriceId === price.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};