import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { BarChart3, Activity, Clock, TrendingUp, Zap, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { api, Metrics as MetricsType, LogEntry } from "@/lib/api";

const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricsType | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMetrics();
    loadLogs();
  }, []);

  const loadMetrics = async () => {
    try {
      const response = await api.getMetrics();
      setMetrics(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load metrics",
        variant: "destructive",
      });
    }
  };

  const loadLogs = async () => {
    try {
      const response = await api.getLogs();
      setLogs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-destructive text-destructive-foreground';
      case 'warn': return 'bg-orange-500 text-white';
      case 'info': return 'bg-primary text-primary-foreground';
      case 'debug': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              System <span className="gradient-text-primary">Metrics</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor performance, usage, and system health in real-time
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics?.totalRequests?.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-400">+12.3%</span> from last hour
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                    <Users className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics?.activeAgents}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-400">+2</span> since yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics?.avgResponseTime}ms</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-400">-23ms</span> improvement
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                    <Activity className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics?.uptime}%</div>
                    <p className="text-xs text-muted-foreground">
                      Last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* System Health */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Real-time system status and performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>API Rate Limit</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle>Response Time Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">&lt; 100ms</span>
                        <div className="flex items-center gap-2">
                          <Progress value={75} className="w-24 h-2" />
                          <span className="text-sm">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">100-500ms</span>
                        <div className="flex items-center gap-2">
                          <Progress value={20} className="w-24 h-2" />
                          <span className="text-sm">20%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">500ms-1s</span>
                        <div className="flex items-center gap-2">
                          <Progress value={4} className="w-24 h-2" />
                          <span className="text-sm">4%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">&gt; 1s</span>
                        <div className="flex items-center gap-2">
                          <Progress value={1} className="w-24 h-2" />
                          <span className="text-sm">1%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle>Error Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">
                        {metrics?.errorRate || 0.1}%
                      </div>
                      <p className="text-muted-foreground">Last 24 hours</p>
                      <div className="mt-4 text-sm text-green-400">
                        ↓ 0.05% from yesterday
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle>Requests per Hour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {metrics?.requestsPerHour?.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Peak: 15.2K at 2:00 PM
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle>Most Used Agent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">RAG Research Assistant</div>
                    <p className="text-sm text-muted-foreground">
                      2,108 requests today
                    </p>
                    <Badge className="mt-2">Trending</Badge>
                  </CardContent>
                </Card>

                <Card className="glass border-border/20">
                  <CardHeader>
                    <CardTitle>Popular Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">RAG</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Universal Prompt</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">SRT</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">RCPD</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Logs Tab */}
            <TabsContent value="logs" className="space-y-6">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Recent system events and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10">
                        <Badge className={getLogLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm">{log.message}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{formatTime(log.timestamp)}</span>
                            {log.agentId && <span>Agent: {log.agentId}</span>}
                            {log.userId && <span>User: {log.userId}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Metrics;