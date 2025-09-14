import Navigation from '@/components/Navigation';
import { PricingPlans } from '@/components/payments/PricingPlans';
import { SubscriptionStatus } from '@/components/payments/SubscriptionStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Subscription() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text-primary">Plan</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Scale your AI agent operations with flexible pricing designed for every use case
            </p>
          </div>

          {/* Current Subscription */}
          <SubscriptionStatus />

          {/* Available Plans */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text-primary">Available Plans</h2>
              <p className="text-muted-foreground mt-2">Choose the perfect plan for your needs</p>
            </div>
            <PricingPlans />
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="glass border-border/20 mb-4 px-6">
                <AccordionTrigger>Can I change my plan anytime?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, and downgrades take effect at the end of your current billing period.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="glass border-border/20 mb-4 px-6">
                <AccordionTrigger>What happens if I exceed my limits?</AccordionTrigger>
                <AccordionContent>
                  We'll notify you when approaching limits. You can upgrade your plan or purchase additional capacity. For temporary overages, we provide a grace period before any service restrictions.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="glass border-border/20 mb-4 px-6">
                <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="glass border-border/20 mb-4 px-6">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We use enterprise-grade encryption for all data in transit and at rest. Your AI agents and data are isolated and protected with industry-standard security measures.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}