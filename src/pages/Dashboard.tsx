import { BarChart3, Bot, Cpu, Zap, Users, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Agents",
      value: "24",
      change: "+12%",
      icon: Bot,
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
      title: "Response Time",
      value: "98ms",
      change: "-5.1%",
      icon: Activity,
      color: "text-green-400",
    },
    {
      title: "Active Users",
      value: "1,429",
      change: "+23.1%",
      icon: Users,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Agent <span className="gradient-text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor and manage your AI agent fleet
            </p>
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Agents */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Active Agents
                </CardTitle>
                <CardDescription>
                  Real-time status of your deployed agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Customer Support Agent", status: "Active", requests: "1.2K" },
                    { name: "Data Analysis Agent", status: "Active", requests: "847" },
                    { name: "Content Generator", status: "Idle", requests: "0" },
                    { name: "RAG Research Assistant", status: "Active", requests: "2.1K" },
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${agent.status === 'Active' ? 'bg-green-400' : 'bg-muted-foreground'}`} />
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.requests} requests today</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest agent interactions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Agent deployed", time: "2 minutes ago", agent: "Support Bot v2.1" },
                    { action: "RAG query completed", time: "5 minutes ago", agent: "Research Assistant" },
                    { action: "Batch job finished", time: "12 minutes ago", agent: "Data Processor" },
                    { action: "New user registered", time: "18 minutes ago", agent: "System" },
                    { action: "API limit increased", time: "1 hour ago", agent: "System" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.agent} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

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
                  <Button variant="hero" className="h-20 flex-col gap-2">
                    <Bot className="h-6 w-6" />
                    Deploy New Agent
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 glass">
                    <Cpu className="h-6 w-6" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 glass">
                    <BarChart3 className="h-6 w-6" />
                    Generate Report
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