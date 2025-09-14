import { TrendingDown, DollarSign, Zap, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const CostAnalytics = () => {
  const costMetrics = [
    {
      title: "Monthly Savings",
      value: "$2,847",
      change: "↓ 67%",
      icon: TrendingDown,
      color: "text-green-400",
      progress: 67,
    },
    {
      title: "Cost Per Request",
      value: "$0.0024",
      change: "↓ 45%",
      icon: DollarSign,
      color: "text-primary",
      progress: 45,
    },
    {
      title: "Optimization Score",
      value: "94%",
      change: "↑ 12%",
      icon: Target,
      color: "text-accent",
      progress: 94,
    },
    {
      title: "Provider Efficiency",
      value: "87%",
      change: "↑ 8%",
      icon: Zap,
      color: "text-orange-400",
      progress: 87,
    },
  ];

  const topOptimizations = [
    { strategy: "Smart Caching", savings: "$1,234", percentage: "43%" },
    { strategy: "Request Batching", savings: "$892", percentage: "31%" },
    { strategy: "Provider Selection", savings: "$534", percentage: "19%" },
    { strategy: "Model Optimization", savings: "$187", percentage: "7%" },
  ];

  return (
    <div className="space-y-6">
      {/* Cost Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {costMetrics.map((metric) => (
          <Card key={metric.title} className="glass border-border/20 hover:glow-accent transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-green-400">{metric.change}</p>
                <Progress value={metric.progress} className="w-12 h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-400" />
              Cost Optimization Breakdown
            </CardTitle>
            <CardDescription>
              How Orchesity is saving you money this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOptimizations.map((opt, index) => (
                <div key={opt.strategy} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-primary`} style={{ opacity: 1 - (index * 0.2) }} />
                    <div>
                      <p className="font-medium">{opt.strategy}</p>
                      <p className="text-sm text-muted-foreground">{opt.percentage} of total savings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">{opt.savings}</p>
                    <p className="text-xs text-muted-foreground">saved</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Provider Cost Comparison
            </CardTitle>
            <CardDescription>
              Smart routing across AI providers for optimal cost
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { provider: "OpenAI GPT-4", cost: "$0.0034", usage: "45%", status: "Optimized" },
                { provider: "Claude 3", cost: "$0.0028", usage: "30%", status: "Primary" },
                { provider: "Gemini Pro", cost: "$0.0019", usage: "20%", status: "Backup" },
                { provider: "Llama 2", cost: "$0.0012", usage: "5%", status: "Testing" },
              ].map((provider) => (
                <div key={provider.provider} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/10">
                  <div>
                    <p className="font-medium">{provider.provider}</p>
                    <p className="text-sm text-muted-foreground">{provider.usage} usage • {provider.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{provider.cost}</p>
                    <p className="text-xs text-muted-foreground">per 1K tokens</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};