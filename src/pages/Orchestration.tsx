import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Bot, Cpu, Zap, Play, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const Orchestration = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("universal");
  const [config, setConfig] = useState({
    temperature: 0.7,
    maxTokens: 2048,
    provider: "openai",
    enableRag: false,
    enableSrt: false,
    enableRcpd: false,
  });
  const { toast } = useToast();

  const executePrompt = async (type: string) => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let result;
      switch (type) {
        case "universal":
          result = await api.universalPrompt({ prompt, config });
          break;
        case "rag":
          result = await api.ragPrompt(prompt);
          break;
        case "srt":
          result = await api.srtPrompt(prompt);
          break;
        case "rcpd":
          result = await api.rcpdPrompt(prompt);
          break;
        case "orchestrate":
          result = await api.orchestrateAgents([{ prompt, config }]);
          break;
        default:
          result = await api.promptOrchestration(prompt, config);
      }
      setResponse(result.data.response || JSON.stringify(result.data, null, 2));
      toast({
        title: "Success",
        description: "Prompt executed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute prompt",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const orchestrationTypes = [
    {
      id: "universal",
      title: "Universal Prompt",
      description: "General-purpose agent orchestration",
      icon: Bot,
      color: "text-primary",
    },
    {
      id: "rag",
      title: "RAG Prompt",
      description: "Retrieval-Augmented Generation",
      icon: Zap,
      color: "text-accent",
    },
    {
      id: "srt",
      title: "Self-Reflected Thinking",
      description: "Advanced reasoning with reflection",
      icon: Cpu,
      color: "text-green-400",
    },
    {
      id: "rcpd",
      title: "RCPD",
      description: "Rapid Catching Prompt Detection",
      icon: Settings,
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
              Agent <span className="gradient-text-primary">Orchestration</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Advanced AI agent coordination with RAG, SRT, and RCPD capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orchestration Types */}
            <div className="lg:col-span-1">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle>Orchestration Types</CardTitle>
                  <CardDescription>
                    Choose your agent orchestration method
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orchestrationTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={activeTab === type.id ? "hero" : "ghost"}
                      className="w-full justify-start h-auto p-4"
                      onClick={() => setActiveTab(type.id)}
                    >
                      <div className="flex items-center gap-3">
                        <type.icon className={`h-5 w-5 ${type.color}`} />
                        <div className="text-left">
                          <div className="font-medium">{type.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Configuration */}
              <Card className="glass border-border/20 mt-6">
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Select value={config.provider} onValueChange={(value) => setConfig({...config, provider: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="local">Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature: {config.temperature}</Label>
                    <Input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={config.temperature}
                      onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      type="number"
                      value={config.maxTokens}
                      onChange={(e) => setConfig({...config, maxTokens: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rag">Enable RAG</Label>
                      <Switch
                        checked={config.enableRag}
                        onCheckedChange={(checked) => setConfig({...config, enableRag: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="srt">Enable SRT</Label>
                      <Switch
                        checked={config.enableSrt}
                        onCheckedChange={(checked) => setConfig({...config, enableSrt: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rcpd">Enable RCPD</Label>
                      <Switch
                        checked={config.enableRcpd}
                        onCheckedChange={(checked) => setConfig({...config, enableRcpd: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Orchestration Interface */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Orchestration Playground
                  </CardTitle>
                  <CardDescription>
                    Test and execute agent orchestration with advanced features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Current Configuration Display */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Provider: {config.provider}</Badge>
                      <Badge variant="secondary">Temperature: {config.temperature}</Badge>
                      <Badge variant="secondary">Max Tokens: {config.maxTokens}</Badge>
                      {config.enableRag && <Badge className="bg-accent text-accent-foreground">RAG</Badge>}
                      {config.enableSrt && <Badge className="bg-green-500 text-white">SRT</Badge>}
                      {config.enableRcpd && <Badge className="bg-orange-500 text-white">RCPD</Badge>}
                    </div>

                    {/* Prompt Input */}
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Prompt</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Enter your prompt for agent orchestration..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="glass"
                      />
                    </div>

                    {/* Execute Button */}
                    <Button
                      onClick={() => executePrompt(activeTab)}
                      disabled={loading}
                      className="w-full"
                      variant="hero"
                    >
                      {loading ? "Executing..." : `Execute ${orchestrationTypes.find(t => t.id === activeTab)?.title}`}
                    </Button>

                    {/* Response */}
                    {response && (
                      <div className="space-y-2">
                        <Label>Response</Label>
                        <div className="p-4 rounded-lg bg-secondary/20 border border-border/10">
                          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orchestration;