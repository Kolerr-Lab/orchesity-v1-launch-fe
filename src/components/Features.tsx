import { Bot, Brain, Gauge, Shield, Zap, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "Multi-Agent Orchestration",
      description: "Deploy and coordinate multiple AI agents working together seamlessly. Handle complex workflows with intelligent task distribution.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Brain,
      title: "RAG-Enabled Intelligence",
      description: "Enhance your agents with Retrieval-Augmented Generation. Connect to your knowledge base for contextually aware responses.",
      gradient: "from-accent to-blue-400",
    },
    {
      icon: Gauge,
      title: "Real-time Monitoring",
      description: "Track agent performance, API usage, and system health with comprehensive dashboards and alerting.",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in authentication, role-based access control, and audit logs ensure your AI operations are secure.",
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed and scale. Handle millions of requests with low latency and high throughput.",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      icon: Database,
      title: "Flexible Storage",
      description: "Integrate with any database or storage system. Built-in support for vector databases and document stores.",
      gradient: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="gradient-text-primary">Modern AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, deploy, and scale intelligent AI agent systems.
            From simple chatbots to complex multi-agent orchestrations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="glass border-border/20 hover:glow-accent transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto hover:glow-primary transition-all">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of developers building the future with AI agents
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg font-medium hover:scale-105 transition-transform">
                Start Free Trial
              </button>
              <button className="px-6 py-3 glass border border-border/20 rounded-lg font-medium hover:bg-secondary/50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;