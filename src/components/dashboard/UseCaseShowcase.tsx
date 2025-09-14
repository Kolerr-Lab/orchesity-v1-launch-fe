import { Code, Smartphone, Building, Globe, MessageSquare, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const UseCaseShowcase = () => {
  const useCases = [
    {
      icon: Code,
      title: "SaaS Integration",
      description: "Add AI chat and automation to your SaaS platform",
      integration: "React, Vue, Angular",
      examples: ["Customer Support", "Data Analysis", "Content Generation"],
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Integrate AI into iOS and Android applications",
      integration: "Swift, Kotlin, React Native",
      examples: ["Voice Assistants", "Image Recognition", "Smart Recommendations"],
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Building,
      title: "Enterprise Tools",
      description: "Scale AI across your organization securely",
      integration: "Java, .NET, Python",
      examples: ["Document Processing", "Workflow Automation", "Business Intelligence"],
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: Globe,
      title: "Web Applications",
      description: "Power modern web apps with intelligent features",
      integration: "Next.js, Nuxt, Svelte",
      examples: ["Search Enhancement", "Content Moderation", "User Personalization"],
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: MessageSquare,
      title: "Chatbots & Assistants",
      description: "Build conversational AI for any platform",
      integration: "REST APIs, WebSockets",
      examples: ["Customer Service", "Sales Assistant", "Knowledge Base"],
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Extract intelligence from your data",
      integration: "Python, R, SQL",
      examples: ["Sentiment Analysis", "Trend Prediction", "Report Generation"],
      gradient: "from-indigo-400 to-blue-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Real-World Use Cases</h2>
        <p className="text-muted-foreground">
          See how teams are using Orchesity across different industries and platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <Card 
            key={useCase.title}
            className="glass border-border/20 hover:glow-accent transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${useCase.gradient} group-hover:scale-110 transition-transform`}>
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {useCase.title}
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">
                {useCase.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Compatible with:</p>
                <Badge variant="secondary" className="text-xs">
                  {useCase.integration}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Example use cases:</p>
                <div className="flex flex-wrap gap-1">
                  {useCase.examples.map((example) => (
                    <Badge key={example} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button asChild variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-primary/10">
                <Link to="/docs">View Integration Guide</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Card className="glass border-border/20 p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Not seeing your use case?</h3>
          <p className="text-muted-foreground mb-4">
            Orchesity is designed to work with any application, in any language, for any use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="hero">
              <Link to="/auth">Contact Sales</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/docs">View Documentation</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};