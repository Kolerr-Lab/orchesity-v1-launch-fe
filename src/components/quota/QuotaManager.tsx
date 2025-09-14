import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3, AlertTriangle, Settings, Zap, DollarSign, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface QuotaStatus {
  requests: {
    current: number;
    limit: number;
    resetDate: string;
  };
  tokens: {
    current: number;
    limit: number;
    resetDate: string;
  };
  cost: {
    current: number;
    limit: number;
    resetDate: string;
  };
  rateLimit: {
    requestsPerMinute: number;
    currentUsage: number;
  };
}

export const QuotaManager = () => {
  const [quotaStatus, setQuotaStatus] = useState<QuotaStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newLimits, setNewLimits] = useState({
    requestLimit: 0,
    tokenLimit: 0,
    costLimit: 0,
    rateLimit: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadQuotaStatus();
    // Refresh every 30 seconds
    const interval = setInterval(loadQuotaStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadQuotaStatus = async () => {
    try {
      const response = await api.getQuotaStatus();
      setQuotaStatus(response.data);
      
      if (response.data) {
        setNewLimits({
          requestLimit: response.data.requests.limit,
          tokenLimit: response.data.tokens.limit,
          costLimit: response.data.cost.limit,
          rateLimit: response.data.rateLimit.requestsPerMinute
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load quota status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLimits = async () => {
    try {
      await api.updateQuotaLimits(newLimits);
      
      toast({
        title: 'Success',
        description: 'Quota limits updated successfully',
      });
      
      setIsUpdateDialogOpen(false);
      loadQuotaStatus();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update quota limits',
        variant: 'destructive',
      });
    }
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return limit > 0 ? (current / limit) * 100 : 0;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-orange-500';
    return 'text-green-500';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quotaStatus) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load quota information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const quotaItems = [
    {
      title: 'API Requests',
      icon: BarChart3,
      current: quotaStatus.requests.current,
      limit: quotaStatus.requests.limit,
      resetDate: quotaStatus.requests.resetDate,
      formatter: formatNumber,
      unit: 'requests'
    },
    {
      title: 'Token Usage',
      icon: Zap,
      current: quotaStatus.tokens.current,
      limit: quotaStatus.tokens.limit,
      resetDate: quotaStatus.tokens.resetDate,
      formatter: formatNumber,
      unit: 'tokens'
    },
    {
      title: 'Cost Spending',
      icon: DollarSign,
      current: quotaStatus.cost.current,
      limit: quotaStatus.cost.limit,
      resetDate: quotaStatus.cost.resetDate,
      formatter: formatCurrency,
      unit: ''
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quota Management</h2>
          <p className="text-muted-foreground">Monitor and control your API usage limits</p>
        </div>
        
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Update Limits
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Quota Limits</DialogTitle>
              <DialogDescription>
                Modify your usage limits and rate limiting settings
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="requestLimit">Request Limit</Label>
                <Input
                  id="requestLimit"
                  type="number"
                  value={newLimits.requestLimit}
                  onChange={(e) => setNewLimits({...newLimits, requestLimit: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenLimit">Token Limit</Label>
                <Input
                  id="tokenLimit"
                  type="number"
                  value={newLimits.tokenLimit}
                  onChange={(e) => setNewLimits({...newLimits, tokenLimit: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costLimit">Cost Limit ($)</Label>
                <Input
                  id="costLimit"
                  type="number"
                  value={newLimits.costLimit}
                  onChange={(e) => setNewLimits({...newLimits, costLimit: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateLimit">Rate Limit (requests/minute)</Label>
                <Input
                  id="rateLimit"
                  type="number"
                  value={newLimits.rateLimit}
                  onChange={(e) => setNewLimits({...newLimits, rateLimit: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={updateLimits}>Update Limits</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rate Limit Status */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Rate Limiting
          </CardTitle>
          <CardDescription>
            Real-time request rate monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Requests per Minute</span>
            <Badge variant={quotaStatus.rateLimit.currentUsage > quotaStatus.rateLimit.requestsPerMinute * 0.8 ? 'destructive' : 'default'}>
              {quotaStatus.rateLimit.currentUsage} / {quotaStatus.rateLimit.requestsPerMinute}
            </Badge>
          </div>
          <Progress 
            value={(quotaStatus.rateLimit.currentUsage / quotaStatus.rateLimit.requestsPerMinute) * 100} 
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Quota Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotaItems.map((item) => {
          const percentage = getUsagePercentage(item.current, item.limit);
          const isNearLimit = percentage >= 80;
          
          return (
            <Card key={item.title} className={`glass border-border/20 ${isNearLimit ? 'border-orange-500/50' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </div>
                  {isNearLimit && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {item.formatter(item.current)}
                    </span>
                    <span className={`text-sm font-medium ${getUsageColor(percentage)}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <Progress value={percentage} className="h-2" />
                  
                  <div className="text-sm text-muted-foreground">
                    <div>Limit: {item.formatter(item.limit)} {item.unit}</div>
                    <div>Resets: {new Date(item.resetDate).toLocaleDateString()}</div>
                  </div>
                  
                  {isNearLimit && (
                    <Alert className="border-orange-500/50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Approaching usage limit. Consider upgrading your plan.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Usage Insights */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle>Usage Insights</CardTitle>
          <CardDescription>
            Recommendations based on your current usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quotaItems.map((item) => {
              const percentage = getUsagePercentage(item.current, item.limit);
              let insight = '';
              
              if (percentage >= 90) {
                insight = `${item.title} is critically high. Consider upgrading your plan immediately.`;
              } else if (percentage >= 75) {
                insight = `${item.title} is approaching the limit. Monitor closely or upgrade your plan.`;
              } else if (percentage <= 25) {
                insight = `${item.title} is well within limits. You could consider a lower tier plan.`;
              }
              
              if (insight) {
                return (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10">
                    <item.icon className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-sm">{insight}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};