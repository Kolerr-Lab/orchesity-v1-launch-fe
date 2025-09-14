import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Server, Database, Zap, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Array<{
    name: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    responseTime: number;
    uptime: number;
    details?: string;
  }>;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    activeConnections: number;
    requestRate: number;
    errorRate: number;
  };
  lastChecked: string;
}

export const HealthMonitor = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHealth();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadHealth = async () => {
    try {
      const response = await api.getSystemHealth();
      setHealth(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load system health',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshHealth = async () => {
    setRefreshing(true);
    await loadHealth();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'degraded':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'unhealthy':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border/20';
    }
  };

  const getMetricColor = (value: number, warningThreshold: number, criticalThreshold: number) => {
    if (value >= criticalThreshold) return 'text-red-500';
    if (value >= warningThreshold) return 'text-orange-500';
    return 'text-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!health) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Unable to retrieve system health information.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Health</h2>
          <p className="text-muted-foreground">Real-time monitoring of your Orchesity backend</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={refreshHealth} 
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Overall Status */}
      <Card className={`glass border-border/20 ${getStatusColor(health.status)}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(health.status)}
            System Status: {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
          </CardTitle>
          <CardDescription>
            Last checked: {new Date(health.lastChecked).toLocaleString()}
          </CardDescription>
        </CardHeader>
        {health.status !== 'healthy' && (
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {health.status === 'degraded' 
                  ? 'Some services are experiencing issues. Performance may be affected.'
                  : 'Critical system issues detected. Immediate attention required.'
                }
              </AlertDescription>
            </Alert>
          </CardContent>
        )}
      </Card>

      {/* Service Status */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Service Status
          </CardTitle>
          <CardDescription>
            Status of individual system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {health.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/10">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.responseTime}ms • {service.uptime}% uptime
                    </p>
                    {service.details && (
                      <p className="text-xs text-muted-foreground">{service.details}</p>
                    )}
                  </div>
                </div>
                <Badge variant={service.status === 'healthy' ? 'default' : 'secondary'}>
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'CPU Usage',
            value: health.metrics.cpuUsage,
            unit: '%',
            icon: Zap,
            warning: 70,
            critical: 90
          },
          {
            title: 'Memory Usage',
            value: health.metrics.memoryUsage,
            unit: '%',
            icon: Database,
            warning: 80,
            critical: 95
          },
          {
            title: 'Disk Usage',
            value: health.metrics.diskUsage,
            unit: '%',
            icon: Server,
            warning: 85,
            critical: 95
          },
          {
            title: 'Active Connections',
            value: health.metrics.activeConnections,
            unit: '',
            icon: Shield,
            warning: 1000,
            critical: 1500
          },
          {
            title: 'Request Rate',
            value: health.metrics.requestRate,
            unit: '/min',
            icon: Zap,
            warning: 10000,
            critical: 15000
          },
          {
            title: 'Error Rate',
            value: health.metrics.errorRate,
            unit: '%',
            icon: AlertTriangle,
            warning: 1,
            critical: 5
          }
        ].map((metric) => (
          <Card key={metric.title} className="glass border-border/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <metric.icon className="h-5 w-5 text-primary" />
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getMetricColor(metric.value, metric.warning, metric.critical)}`}>
                    {metric.value}{metric.unit}
                  </span>
                  <Badge variant={
                    metric.value >= metric.critical ? 'destructive' :
                    metric.value >= metric.warning ? 'secondary' : 'default'
                  }>
                    {metric.value >= metric.critical ? 'Critical' :
                     metric.value >= metric.warning ? 'Warning' : 'Normal'}
                  </Badge>
                </div>
                
                <Progress 
                  value={metric.title.includes('Rate') && !metric.title.includes('Error') 
                    ? Math.min((metric.value / metric.critical) * 100, 100)
                    : metric.value
                  } 
                  className="h-2"
                />
                
                <div className="text-xs text-muted-foreground">
                  Warning: {metric.warning}{metric.unit} • Critical: {metric.critical}{metric.unit}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};