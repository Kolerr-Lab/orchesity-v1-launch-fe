import { BarChart3, Bot, Cpu, Zap, Users, Activity, DollarSign, TrendingDown, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { CostAnalytics } from "@/components/dashboard/CostAnalytics";
import { UseCaseShowcase } from "@/components/dashboard/UseCaseShowcase";
import { FreePlanQuota } from "@/components/quota/FreePlanQuota";
import { UsageHeader } from "@/components/quota/UsageHeader";

const Dashboard = () => {
  const stats = [
    {
      title: "Monthly Savings",
      value: "$2,847",
      change: "↓ 67%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Connected Apps",
      value: "12",
      change: "+3 this month", 
      icon: Building,
      color: "text-primary",
    },
    {
      title: "API Calls Today",
      value: "142.3K",
      change: "+8.2%",
      icon: Zap,
      color: "text-accent",
    },
    {
      title: "Cost per Request",
      value: "$0.0024",
      change: "↓ 45%",
      icon: TrendingDown,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                Orchesity <span className="gradient-text-primary">Control Center</span>
              </h1>
              <UsageHeader />
            </div>
            <p className="text-muted-foreground text-lg">
              Your universal cloud AI backend - monitor costs, manage apps, and optimize performance
            </p>
          </header>

          {/* Free Plan Quota */}
          <div className="mb-8">
            <FreePlanQuota />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.title} className="glass border-border/20 hover:glow-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-400">{stat.change}</span> from last week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cost-analytics">Cost Analytics</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Connected Applications */}
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Connected Applications
                    </CardTitle>
                    <CardDescription>
                      Apps using your Orchesity backend
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                {[
                  { name: "CustomerCare SaaS", type: "React App", requests: "45.2K", cost: "$108", status: "active" },
                  { name: "MobileAnalytics", type: "React Native", requests: "32.1K", cost: "$77", status: "active" },
                  { name: "EnterpriseBot", type: "Java Spring", requests: "28.9K", cost: "$69", status: "active" },
                  { name: "WebPortal", type: "Next.js", requests: "15.3K", cost: "$37", status: "active" },
                ].map((app) => (
                  <div key={app.name} className="flex items-center justify-between p-4 rounded-lg glass border border-border/20 hover:glow-accent transition-all group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground">{app.name}</p>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-all h-8 px-3 text-xs"
                              onClick={() => window.open(`/apps/${app.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
                            >
                              Manage
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-3 text-xs"
                              asChild
                            >
                              <Link to="/metrics">Analytics</Link>
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{app.type} • {app.requests} requests</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-green-400">{app.cost}</p>
                      <p className="text-xs text-muted-foreground">this month</p>
                    </div>
                  </div>
                ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Optimizations */}
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-green-400" />
                      Recent Optimizations
                    </CardTitle>
                    <CardDescription>
                      Automatic cost optimizations applied
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { optimization: "Smart caching enabled", savings: "$234", time: "2 hours ago" },
                        { optimization: "Provider switched to Gemini", savings: "$189", time: "6 hours ago" },
                        { optimization: "Request batching optimized", savings: "$156", time: "1 day ago" },
                        { optimization: "Model downgrade for simple tasks", savings: "$98", time: "2 days ago" },
                        { optimization: "Cache hit rate improved", savings: "$67", time: "3 days ago" },
                      ].map((opt, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <div className="flex-1">
                            <p className="text-sm">{opt.optimization}</p>
                            <p className="text-xs text-muted-foreground">Saved {opt.savings} • {opt.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cost-analytics">
              <CostAnalytics />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <header className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Integration Hub</h2>
                <p className="text-muted-foreground">
                  Connect Orchesity to your existing applications and services
                </p>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "REST API", status: "Active", integrations: "12 apps", docs: "View Docs", action: "docs" },
                  { name: "GraphQL", status: "Active", integrations: "3 apps", docs: "View Docs", action: "docs" },
                  { name: "WebSockets", status: "Active", integrations: "5 apps", docs: "View Docs", action: "docs" },
                  { name: "Stripe", status: "Configured", integrations: "Payment ready", docs: "Manage", action: "subscription" },
                  { name: "OAuth Providers", status: "Active", integrations: "Google, GitHub", docs: "Configure", action: "settings" },
                  { name: "Webhooks", status: "Active", integrations: "8 endpoints", docs: "Manage", action: "settings" },
                ].map((integration) => (
                  <Card key={integration.name} className="glass border-border/20 hover:glow-accent transition-all group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">{integration.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full shadow-sm ${integration.status === 'Active' ? 'bg-green-400' : 'bg-primary'}`} />
                          <span className="text-sm font-medium text-muted-foreground">{integration.status}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 font-medium">{integration.integrations}</p>
                      <div className="flex gap-2">
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 font-medium"
                        >
                          <Link to={`/${integration.action}`}>{integration.docs}</Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-all px-3"
                          onClick={() => {
                            if (integration.name === "Stripe") {
                              window.open("/subscription", "_blank");
                            } else {
                              window.open(`/docs#${integration.name.toLowerCase().replace(/\s+/g, '-')}`, "_blank");
                            }
                          }}
                        >
                          ↗
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="use-cases">
              <UseCaseShowcase />
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild variant="hero" className="h-20 flex-col gap-2 hover:scale-105 transition-transform">
                    <Link to="/agents" className="w-full">
                      <Bot className="h-6 w-6" />
                      <span className="font-semibold">Deploy New Agent</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col gap-2 glass hover:glow-accent transition-all">
                    <Link to="/metrics" className="w-full">
                      <Cpu className="h-6 w-6" />
                      <span className="font-semibold">View Analytics</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col gap-2 glass hover:glow-accent transition-all">
                    <Link to="/cost-calculator" className="w-full">
                      <BarChart3 className="h-6 w-6" />
                      <span className="font-semibold">Cost Calculator</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;