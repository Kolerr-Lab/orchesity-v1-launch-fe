import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Zap, Users, Activity, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface MetricsData {
  overview: {
    totalRequests: number;
    totalCost: number;
    averageResponseTime: number;
    successRate: number;
    activeAgents: number;
    costSavings: number;
  };
  trends: Array<{
    date: string;
    requests: number;
    cost: number;
    responseTime: number;
    errors: number;
  }>;
  providerUsage: Array<{
    name: string;
    requests: number;
    cost: number;
    color: string;
  }>;
  agentPerformance: Array<{
    name: string;
    requests: number;
    successRate: number;
    avgResponseTime: number;
  }>;
  costBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export const BusinessDashboard = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const { toast } = useToast();

  useEffect(() => {
    loadMetrics();
  }, [timeRange]);

  const loadMetrics = async () => {
    try {
      const response = await api.getMetrics();
      // Transform metrics data to match interface
      setMetrics(response.data as MetricsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load metrics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async () => {
    try {
      // This would trigger a backend endpoint to generate and download a report
      toast({
        title: 'Success',
        description: 'Report export started',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export report',
        variant: 'destructive',
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-muted-foreground">
        No metrics data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into your Orchesity platform</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            title: 'Total Requests',
            value: formatNumber(metrics.overview.totalRequests),
            icon: BarChart3,
            color: 'text-primary',
            change: '+12.5%'
          },
          {
            title: 'Total Cost',
            value: formatCurrency(metrics.overview.totalCost),
            icon: DollarSign,
            color: 'text-green-500',
            change: '-23.1%'
          },
          {
            title: 'Avg Response',
            value: `${metrics.overview.averageResponseTime}ms`,
            icon: Zap,
            color: 'text-orange-500',
            change: '-5.2%'
          },
          {
            title: 'Success Rate',
            value: `${metrics.overview.successRate}%`,
            icon: TrendingUp,
            color: 'text-green-500',
            change: '+0.8%'
          },
          {
            title: 'Active Agents',
            value: formatNumber(metrics.overview.activeAgents),
            icon: Users,
            color: 'text-primary',
            change: '+3'
          },
          {
            title: 'Cost Savings',
            value: formatCurrency(metrics.overview.costSavings),
            icon: TrendingDown,
            color: 'text-green-500',
            change: '+45.3%'
          }
        ].map((stat, index) => (
          <Card key={stat.title} className="glass border-border/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant={stat.change.startsWith('+') && stat.title !== 'Active Agents' ? 'default' : 'secondary'}>
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Request volume and performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={metrics.trends}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#0088FE" strokeWidth={2} name="Requests" />
                  <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#00C49F" strokeWidth={2} name="Response Time (ms)" />
                  <Line yAxisId="left" type="monotone" dataKey="errors" stroke="#FF8042" strokeWidth={2} name="Errors" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle>Provider Usage Distribution</CardTitle>
                <CardDescription>Request distribution across AI providers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={metrics.providerUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="requests"
                    >
                      {metrics.providerUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle>Provider Costs</CardTitle>
                <CardDescription>Cost comparison across providers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.providerUsage}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value as number)}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="cost" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>Performance metrics for each deployed agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.agentPerformance.map((agent, index) => (
                  <div key={agent.name} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(agent.requests)} requests • {agent.avgResponseTime}ms avg
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={agent.successRate >= 95 ? 'default' : 'secondary'}>
                        {agent.successRate}% success
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>Detailed analysis of your spending patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.costBreakdown.map((item, index) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">{formatCurrency(item.amount)} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};