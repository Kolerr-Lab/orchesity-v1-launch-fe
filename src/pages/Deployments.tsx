import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud, 
  GitBranch, 
  Code, 
  ExternalLink, 
  Rocket,
  Database,
  Settings,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { Deployment, GitRepository, SDKIntegration } from '@/types/orchesity';

export default function DeploymentsList() {
  const { toast } = useToast();
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [repositories, setRepositories] = useState<GitRepository[]>([]);
  const [integrations, setIntegrations] = useState<SDKIntegration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [deploymentsResponse, repositoriesResponse, integrationsResponse] = await Promise.all([
        orchesityService.getDeployments(),
        orchesityService.getGitRepositories(),
        orchesityService.getSDKIntegrations(),
      ]);

      setDeployments(deploymentsResponse.data);
      setRepositories(repositoriesResponse.data);
      setIntegrations(integrationsResponse.data);
    } catch (error) {
      toast({
        title: 'Failed to load data',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'synced':
        return 'bg-green-500';
      case 'deploying':
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      case 'stopped':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin mr-2" />
          <span>Loading project management...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Management</h1>
        <p className="text-muted-foreground">
          Manage your deployments, Git repositories, and SDK integrations
        </p>
      </div>

      <Tabs defaultValue="deployments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="repositories">Git Repositories</TabsTrigger>
          <TabsTrigger value="integrations">SDK Integrations</TabsTrigger>
        </TabsList>

        {/* Deployments */}
        <TabsContent value="deployments">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Deployments</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Deployment
              </Button>
            </div>

            {deployments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deployments.map((deployment) => (
                  <Card key={deployment.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Cloud className="mr-2 h-5 w-5" />
                          {deployment.project_name}
                        </span>
                        <Badge variant="secondary" className={getStatusColor(deployment.status)}>
                          {deployment.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {deployment.framework} deployment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span>{new Date(deployment.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Deploy:</span>
                            <span>{new Date(deployment.last_deployed).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {deployment.url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => window.open(deployment.url, '_blank')}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Deployment
                          </Button>
                        )}

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="mr-1 h-3 w-3" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Rocket className="mr-1 h-3 w-3" />
                            Redeploy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Cloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Deployments Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Deploy your generated backends to make them accessible online
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Deployment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Git Repositories */}
        <TabsContent value="repositories">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Git Repositories</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Connect Repository
              </Button>
            </div>

            {repositories.length > 0 ? (
              <div className="space-y-4">
                {repositories.map((repo) => (
                  <Card key={repo.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <GitBranch className="mr-2 h-5 w-5" />
                          {repo.name}
                        </span>
                        <Badge variant="secondary" className={getStatusColor(repo.status)}>
                          {repo.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Repository URL</label>
                          <p className="text-sm truncate">{repo.url}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Branch</label>
                          <p className="text-sm">{repo.branch}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Last Sync</label>
                          <p className="text-sm">{new Date(repo.last_sync).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Sync Now
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(repo.url, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          View on GitHub
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <GitBranch className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Repositories Connected</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your GitHub repositories to sync generated backends
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Connect First Repository
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* SDK Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">SDK Integrations</h2>

            {integrations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="mr-2 h-5 w-5" />
                        {integration.name}
                      </CardTitle>
                      <CardDescription>
                        {integration.language} v{integration.version}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-muted rounded p-2">
                          <code className="text-sm">
                            {integration.example_code}
                          </code>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => window.open(integration.documentation_url, '_blank')}
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Docs
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigator.clipboard.writeText(integration.example_code)}
                          >
                            <Code className="mr-1 h-3 w-3" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Code className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">SDK Integrations Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Use our SDKs to integrate Orchesity AI into your applications
                  </p>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}