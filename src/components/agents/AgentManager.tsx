import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Play, Pause, Settings, Trash2, Plus, Activity, Clock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface AgentLocal {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  type: 'universal' | 'rag' | 'srt' | 'rcpd';
  config: any;
  stats: {
    requests: number;
    uptime: string;
    lastActive: string;
    successRate: number;
  };
}

export const AgentManager = () => {
  const [agents, setAgents] = useState<AgentLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentLocal | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    type: 'universal',
    config: {}
  });
  const { toast } = useToast();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const response = await api.getAgents();
      // Transform API data to match local interface
      const transformedAgents = response.data.map((agent: any) => ({
        ...agent,
        type: agent.type || 'universal',
        stats: agent.stats || {
          requests: 0,
          uptime: '0%',
          lastActive: 'Never',
          successRate: 0
        }
      }));
      setAgents(transformedAgents);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load agents',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async () => {
    try {
      await api.createAgent({
        ...newAgent,
        model: 'gpt-4',
        plugins: [],
        status: 'active' as any,
        config: newAgent.type === 'universal' ? {
          temperature: 0.7,
          maxTokens: 2048,
          provider: 'openai'
        } : {}
      });
      
      toast({
        title: 'Success',
        description: 'Agent created successfully',
      });
      
      setIsCreateDialogOpen(false);
      setNewAgent({ name: '', description: '', type: 'universal', config: {} });
      loadAgents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create agent',
        variant: 'destructive',
      });
    }
  };

  const toggleAgentStatus = async (agentId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await api.updateAgent(agentId, { status: newStatus });
      
      setAgents(agents.map(agent =>
        agent.id === agentId ? { ...agent, status: newStatus as any } : agent
      ));
      
      toast({
        title: 'Success',
        description: `Agent ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update agent status',
        variant: 'destructive',
      });
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      await api.deleteAgent(agentId);
      setAgents(agents.filter(agent => agent.id !== agentId));
      
      toast({
        title: 'Success',
        description: 'Agent deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete agent',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-orange-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rag': return <Activity className="h-4 w-4" />;
      case 'srt': return <Zap className="h-4 w-4" />;
      case 'rcpd': return <Settings className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Agent Management</h2>
          <p className="text-muted-foreground">Deploy and manage your AI agents</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Deploy Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Deploy New Agent</DialogTitle>
              <DialogDescription>
                Create a new AI agent with specific capabilities
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                  placeholder="Enter agent name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({...newAgent, description: e.target.value})}
                  placeholder="Describe what this agent does"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Agent Type</Label>
                <Select value={newAgent.type} onValueChange={(value) => setNewAgent({...newAgent, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="universal">Universal Agent</SelectItem>
                    <SelectItem value="rag">RAG Agent</SelectItem>
                    <SelectItem value="srt">SRT Agent</SelectItem>
                    <SelectItem value="rcpd">RCPD Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createAgent}>Deploy Agent</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Agents Grid */}
      {agents.length === 0 ? (
        <Card className="glass border-border/20">
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Agents Deployed</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by deploying your first AI agent
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} variant="hero">
              Deploy Your First Agent
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="glass border-border/20 hover:glow-accent transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(agent.type)}
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Requests:</span>
                      <span className="ml-1 font-medium">{agent.stats.requests}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success:</span>
                      <span className="ml-1 font-medium">{agent.stats.successRate}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="ml-1 font-medium">{agent.stats.uptime}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last:</span>
                      <span className="ml-1 font-medium">{agent.stats.lastActive}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={agent.status === 'active' ? 'outline' : 'default'}
                      onClick={() => toggleAgentStatus(agent.id, agent.status)}
                      className="flex-1"
                    >
                      {agent.status === 'active' ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAgent(agent.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};