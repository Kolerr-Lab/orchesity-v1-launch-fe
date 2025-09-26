import { Bot, Brain, Gauge, Shield, Zap, Database, Code, Layers, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "7-Phase Generation Process",
      description: "Complete backend generation through Requirements → Design → Code → Test → Deploy → Review → Optimize phases with AI quality assurance.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Code,
      title: "Production-Ready Output",
      description: "Generate complete backends with database models, API endpoints, authentication, tests, Docker configs, and monitoring - ready to deploy.",
      gradient: "from-accent to-blue-400",
    },
    {
      icon: Brain,
      title: "Intelligent Orchestration",
      description: "4 LLM providers with dynamic selection, adaptive processing for optimal performance, and intelligent routing for every request type.",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Shield,
      title: "AI-Powered Quality Assurance",
      description: "Automated code review, security validation, performance optimization, and auto-fixing with industry best practices built-in.",
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: Layers,
      title: "Multi-Step Async Processing",
      description: "Kafka-powered async processing for large projects, Redis caching for performance, and real-time progress tracking throughout generation.",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      icon: GitBranch,
      title: "Infrastructure as Code",
      description: "Complete infrastructure setup including Docker containers, deployment scripts, monitoring, logging, and scalable architecture patterns.",
      gradient: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Revolutionary{" "}
            <span className="gradient-text-primary">META Agent</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform any idea into production-ready infrastructure. Our META Agent revolutionizes backend development 
            with end-to-end generation from natural language to deployable code.
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

        {/* Use Cases Section */}
        <div className="text-center mt-20 mb-16">
          <h3 className="text-3xl font-bold mb-8">From Prompt to Production in Minutes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { title: "Task Management API", desc: "\"Build me a task management API\" → Complete REST API with auth, database, tests" },
              { title: "E-commerce Backend", desc: "\"Create an e-commerce backend\" → Full microservices with payments, inventory, orders" },
              { title: "Social Media Platform", desc: "\"Design a social platform backend\" → Scalable API with feeds, users, content management" }
            ].map((useCase) => (
              <div key={useCase.title} className="glass rounded-lg p-6 hover:glow-accent transition-all">
                <h4 className="font-semibold mb-2">{useCase.title}</h4>
                <p className="text-sm text-muted-foreground">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto hover:glow-primary transition-all">
            <h3 className="text-2xl font-bold mb-4">Experience Infrastructure as Prompt</h3>
            <p className="text-muted-foreground mb-6">
              Join the revolution in backend development. Transform ideas into production-ready infrastructure with a single prompt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" className="px-6 py-3 hover:scale-105 transition-transform">
                <Link to="/generate">Generate Your Backend</Link>
              </Button>
              <Button asChild variant="outline" className="px-6 py-3 glass border border-border/20 hover:bg-secondary/50 transition-colors">
                <Link to="/generate/examples">View Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;