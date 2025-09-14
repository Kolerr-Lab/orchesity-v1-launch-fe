import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, TrendingDown, Zap, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";

const CostCalculator = () => {
  const [requests, setRequests] = useState(100000);
  const [provider, setProvider] = useState("mixed");
  const [complexity, setComplexity] = useState([50]);
  const [currentCost, setCurrentCost] = useState(500);

  const calculateSavings = () => {
    const baseRate = provider === "openai" ? 0.003 : provider === "claude" ? 0.0025 : 0.002;
    const complexityMultiplier = 1 + (complexity[0] / 100);
    
    // Without Orchesity
    const standardCost = (requests / 1000) * baseRate * complexityMultiplier;
    
    // With Orchesity optimizations
    const cachingDiscount = 0.4; // 40% cache hit rate
    const batchingDiscount = 0.25; // 25% batching efficiency
    const providerOptimization = 0.15; // 15% smart routing
    
    const totalDiscount = cachingDiscount + batchingDiscount + providerOptimization;
    const orchesityCost = standardCost * (1 - totalDiscount);
    
    const savings = standardCost - orchesityCost;
    const savingsPercentage = (savings / standardCost) * 100;
    
    return {
      standardCost: standardCost,
      orchesityCost: orchesityCost,
      savings: savings,
      savingsPercentage: savingsPercentage,
      monthlySavings: savings,
      yearlySavings: savings * 12
    };
  };

  const results = calculateSavings();

  const optimizations = [
    { name: "Smart Caching", savings: "40%", description: "Intelligent response caching reduces duplicate requests" },
    { name: "Request Batching", savings: "25%", description: "Batch multiple requests for better efficiency" },
    { name: "Provider Optimization", savings: "15%", description: "Automatic routing to most cost-effective providers" },
    { name: "Model Selection", savings: "10%", description: "Right-sized models for each task complexity" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Cost <span className="gradient-text-primary">Calculator</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how much you can save on AI costs with Orchesity's optimization engine
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Calculate Your Savings
                </CardTitle>
                <CardDescription>
                  Enter your current AI usage to see potential cost reductions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Monthly API Requests</Label>
                  <Input
                    type="number"
                    value={requests}
                    onChange={(e) => setRequests(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Total number of AI API calls per month
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Primary AI Provider</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                      <SelectItem value="claude">Anthropic (Claude)</SelectItem>
                      <SelectItem value="mixed">Mixed Providers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Task Complexity: {complexity[0]}%</Label>
                  <Slider
                    value={complexity}
                    onValueChange={setComplexity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Simple tasks</span>
                    <span>Complex tasks</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Monthly AI Spend (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={currentCost}
                      onChange={(e) => setCurrentCost(Number(e.target.value))}
                      className="pl-10"
                      placeholder="500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* Savings Summary */}
              <Card className="glass border-border/20 glow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-400" />
                    Your Potential Savings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {results.savingsPercentage.toFixed(1)}%
                    </div>
                    <p className="text-muted-foreground">Cost Reduction</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-secondary/20">
                      <div className="text-2xl font-bold">${results.monthlySavings.toFixed(0)}</div>
                      <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/20">
                      <div className="text-2xl font-bold">${results.yearlySavings.toFixed(0)}</div>
                      <p className="text-sm text-muted-foreground">Yearly Savings</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Without Orchesity:</span>
                      <span className="font-semibold">${results.standardCost.toFixed(0)}/month</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm">With Orchesity:</span>
                      <span className="font-semibold text-green-400">${results.orchesityCost.toFixed(0)}/month</span>
                    </div>
                    <Button asChild className="w-full" variant="hero">
                      <Link to="/auth">Start Saving Today</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Breakdown */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    How We Optimize Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {optimizations.map((opt, index) => (
                      <div key={opt.name} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10">
                        <div className={`w-2 h-2 rounded-full bg-primary mt-2`} style={{ opacity: 1 - (index * 0.15) }} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{opt.name}</p>
                            <span className="text-sm font-semibold text-green-400">{opt.savings}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{opt.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="glass border-border/20 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Saving?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of developers already reducing their AI costs with Orchesity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/auth">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth">Schedule Demo</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CostCalculator;