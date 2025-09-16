import Navigation from "@/components/Navigation";
import { Bot, Plus, Play, Pause, Settings, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Agents = () => {
  const agents = [
    {
      id: 1,
      name: "Customer Support Agent",
      description: "Handles customer inquiries with RAG-enabled knowledge base",
      status: "active",
      requests: "1,247",
      uptime: "99.9%",
      lastActive: "2 minutes ago",
    },
    {
      id: 2,
      name: "Data Analysis Agent",
      description: "Processes and analyzes large datasets with intelligent insights",
      status: "active", 
      requests: "847",
      uptime: "99.7%",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      name: "Content Generator",
      description: "Creates high-quality content based on user prompts and context",
      status: "idle",
      requests: "0",
      uptime: "100%",
      lastActive: "2 hours ago",
    },
    {
      id: 4,
      name: "RAG Research Assistant", 
      description: "Retrieval-augmented generation for complex research queries",
      status: "active",
      requests: "2,108",
      uptime: "98.9%",
      lastActive: "1 minute ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                AI <span className="gradient-text-primary">Agents</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and monitor your intelligent agent fleet
              </p>
            </div>
            <Button 
              variant="hero" 
              className="glow-primary"
              onClick={() => {
                // Mock agent creation
                alert('Agent deployment initiated! This would open the agent creation wizard.');
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Deploy New Agent
            </Button>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="glass border-border/20 hover:glow-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        alert(`Agent ${agent.name} settings menu would open here.`);
                      }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-green-400' : 'bg-muted-foreground'
                      }`} />
                      <span className="text-sm font-medium capitalize">{agent.status}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Last active: {agent.lastActive}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-2 rounded-lg bg-secondary/20">
                      <div className="text-lg font-bold text-primary">{agent.requests}</div>
                      <div className="text-xs text-muted-foreground">Requests Today</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-secondary/20">
                      <div className="text-lg font-bold text-green-400">{agent.uptime}</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant={agent.status === 'active' ? 'outline' : 'hero'} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        const action = agent.status === 'active' ? 'paused' : 'started';
                        alert(`Agent ${agent.name} has been ${action}!`);
                      }}
                    >
                      {agent.status === 'active' ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        alert(`Opening settings for ${agent.name}...`);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for New Users */}
          <div className="mt-12 text-center">
            <Card className="glass border-border/20 p-8 max-w-md mx-auto">
              <div className="mb-4">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to Deploy More Agents?</h3>
              <p className="text-muted-foreground mb-4">
                Scale your operations with additional AI agents tailored to your needs
              </p>
              <Button 
                variant="hero" 
                className="glow-primary"
                onClick={() => {
                  alert('Agent creation wizard would open here!');
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Agent
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Agents;