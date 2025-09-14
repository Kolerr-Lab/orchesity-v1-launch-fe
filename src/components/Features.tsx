import { Bot, Brain, Gauge, Shield, Zap, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Cost Optimization Engine",
      description: "Save up to 70% on LLM costs with smart batching, intelligent caching, optimal provider selection, and advanced orchestration strategies.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Bot,
      title: "Universal Backend",
      description: "Plug into any app, any programming language, any use case. No need to build or maintain your own AI infrastructure.",
      gradient: "from-accent to-blue-400",
    },
    {
      icon: Shield,
      title: "Business-Ready Security",
      description: "Enterprise-grade OAuth, Stripe payments, SOC2 compliance, and robust authentication. Production-ready from day one.",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Gauge,
      title: "Cost Analytics Dashboard",
      description: "Real-time cost tracking, usage analytics, optimization recommendations, and ROI insights across all your AI operations.",
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: Brain,
      title: "Multi-Tenant Architecture",
      description: "Seamlessly manage multiple organizations, workspaces, and teams with isolated environments and granular access controls.",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      icon: Database,
      title: "Plugin Ecosystem",
      description: "Extensive marketplace of pre-built integrations for CRMs, databases, APIs, and third-party services. Custom plugin support included.",
      gradient: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="gradient-text-primary">Orchesity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The only cloud AI backend you'll ever need. Built for developers, optimized for business, 
            trusted by enterprises. From SaaS to mobile apps to enterprise tools.
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
          <h3 className="text-3xl font-bold mb-8">Perfect For Any Use Case</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { title: "SaaS Applications", desc: "Add AI chat, automation, and intelligence to your existing SaaS platform" },
              { title: "Mobile Apps", desc: "Integrate powerful AI capabilities into iOS and Android apps with simple APIs" },
              { title: "Enterprise Tools", desc: "Scale AI across your organization with security, compliance, and cost control" }
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
            <h3 className="text-2xl font-bold mb-4">Start Saving on AI Costs Today</h3>
            <p className="text-muted-foreground mb-6">
              Join 50,000+ apps already using Orchesity to reduce AI costs and accelerate development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg font-medium hover:scale-105 transition-transform">
                Start Free Trial
              </button>
              <button className="px-6 py-3 glass border border-border/20 rounded-lg font-medium hover:bg-secondary/50 transition-colors">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;