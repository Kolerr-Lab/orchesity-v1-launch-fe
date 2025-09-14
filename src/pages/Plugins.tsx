import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Puzzle, Download, Settings, Play, Pause, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { api, PluginInfo } from "@/lib/api";

const Plugins = () => {
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPlugins();
  }, []);

  const loadPlugins = async () => {
    try {
      const response = await api.getPlugins();
      setPlugins(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load plugins",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePlugin = async (pluginId: string, currentStatus: string) => {
    try {
      if (currentStatus === 'active') {
        await api.deactivatePlugin(pluginId);
        toast({ title: "Plugin deactivated successfully" });
      } else {
        await api.activatePlugin(pluginId);
        toast({ title: "Plugin activated successfully" });
      }
      loadPlugins();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle plugin",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? 
      <CheckCircle className="h-4 w-4 text-green-400" /> : 
      <XCircle className="h-4 w-4 text-muted-foreground" />;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-muted-foreground';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading plugins...</p>
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
              Plugin <span className="gradient-text-primary">Management</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Extend agent capabilities with powerful plugins and integrations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass border-border/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Plugins</p>
                    <p className="text-2xl font-bold">{plugins.length}</p>
                  </div>
                  <Puzzle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Plugins</p>
                    <p className="text-2xl font-bold text-green-400">
                      {plugins.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Updates</p>
                    <p className="text-2xl font-bold text-accent">0</p>
                  </div>
                  <Download className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plugins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((plugin) => (
              <Card key={plugin.id} className="glass border-border/20 hover:glow-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                        <Puzzle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        <CardDescription className="mt-1">
                          v{plugin.version}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusIcon(plugin.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plugin.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(plugin.status)}`} />
                    <span className="text-sm font-medium capitalize">{plugin.status}</span>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Capabilities</p>
                    <div className="flex flex-wrap gap-1">
                      {plugin.capabilities.map((capability) => (
                        <Badge key={capability} variant="secondary" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant={plugin.status === 'active' ? 'outline' : 'hero'}
                      size="sm"
                      className="flex-1"
                      onClick={() => togglePlugin(plugin.id, plugin.status)}
                    >
                      {plugin.status === 'active' ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Plugin Store Section */}
          <div className="mt-12">
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle>Plugin Store</CardTitle>
                <CardDescription>
                  Discover and install new plugins to extend your agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Puzzle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Plugin Store Coming Soon</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    We're working on a comprehensive plugin marketplace where you can find and install
                    plugins created by the community and our team.
                  </p>
                  <Button variant="hero" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Browse Store
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

export default Plugins;