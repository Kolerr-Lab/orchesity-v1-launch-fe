import { HelpCircle, Book, MessageCircle, Video, ExternalLink, Phone, FileText, Users, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Everything you need to start with Orchesity AI platform",
      articles: [
        { title: "Quick Start Guide - 2025 Edition", time: "5 min read", popular: true, link: "/docs#quick-start" },
        { title: "API Authentication Setup", time: "3 min read", popular: true, link: "/docs#authentication" },
        { title: "Your First AI Agent Integration", time: "10 min read", popular: false, link: "/docs#first-integration" },
        { title: "Cost Optimization Strategies", time: "7 min read", popular: true, link: "/cost-calculator" },
        { title: "Platform Overview 2025", time: "6 min read", popular: true, link: "/docs#platform-overview" },
      ]
    },
    {
      title: "Integration Guides",
      icon: ExternalLink,
      description: "Step-by-step integration tutorials for popular frameworks",
      articles: [
        { title: "React & Next.js Integration", time: "8 min read", popular: true, link: "/docs#react-integration" },
        { title: "Python SDK Complete Guide", time: "12 min read", popular: true, link: "/docs#python-sdk" },
        { title: "Node.js Backend Integration", time: "10 min read", popular: false, link: "/docs#nodejs-integration" },
        { title: "Mobile App Integration (2025)", time: "15 min read", popular: true, link: "/docs#mobile-integration" },
        { title: "Enterprise SSO Setup", time: "20 min read", popular: false, link: "/docs#enterprise-sso" },
      ]
    },
    {
      title: "Advanced Features",
      icon: Lightbulb,
      description: "Leverage advanced AI orchestration capabilities",
      articles: [
        { title: "Multi-Model AI Orchestration", time: "12 min read", popular: true, link: "/blog/multi-model-ai" },
        { title: "RAG Implementation Guide", time: "15 min read", popular: true, link: "/docs#rag-guide" },
        { title: "Custom Agent Development", time: "18 min read", popular: false, link: "/agents" },
        { title: "Performance Monitoring 2025", time: "10 min read", popular: true, link: "/metrics" },
        { title: "Security Best Practices", time: "11 min read", popular: false, link: "/security" },
      ]
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      description: "Common issues and solutions",
      articles: [
        { title: "API Error Codes Reference", time: "4 min read", popular: true, link: "/docs#error-codes" },
        { title: "Performance Optimization Tips", time: "9 min read", popular: false, link: "/docs#performance" },
        { title: "Billing & Usage FAQs", time: "5 min read", popular: true, link: "/subscription#faq" },
        { title: "Connection Issues Troubleshooting", time: "7 min read", popular: false, link: "/docs#troubleshooting" },
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our expert support team available 24/7",
      action: "Start Live Chat",
      icon: MessageCircle,
      availability: "24/7 for Pro+ plans",
      response: "< 2 minutes",
      link: "https://orchesity.crisp.chat/",
      external: true
    },
    {
      title: "Video Tutorials",
      description: "Comprehensive video library with latest 2025 features and tutorials",
      action: "Watch Tutorials",
      icon: Video,
      availability: "Free access",
      response: "Self-paced learning",
      link: "https://youtube.com/@orchesity",
      external: true
    },
    {
      title: "Developer Community",
      description: "Join 10,000+ developers building with Orchesity AI platform",
      action: "Join Community",
      icon: Users,
      availability: "Open to all developers",
      response: "Community driven",
      link: "https://discord.gg/orchesity",
      external: true
    },
    {
      title: "Phone Support",
      description: "Direct phone support for Enterprise customers",
      action: "Schedule Call",
      icon: Phone,
      availability: "Enterprise plans only",
      response: "Same day callback",
      link: "/contact",
      external: false
    },
    {
      title: "Documentation",
      description: "Complete API reference and implementation guides updated for 2025",
      action: "Browse Docs",
      icon: FileText,
      availability: "Always available",
      response: "Instant access",
      link: "/docs",
      external: false
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers, get support, and learn how to make the most of Orchesity
        </p>
      </div>

      {/* Quick Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportChannels.slice(0, 3).map((channel) => (
          <Card key={channel.title} className="glass border-border/20 hover:glow-accent transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <channel.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{channel.title}</CardTitle>
              </div>
              <CardDescription>{channel.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Availability: {channel.availability}</p>
                <p className="text-xs text-muted-foreground">Response: {channel.response}</p>
              </div>
              {channel.external ? (
                <Button variant="outline" className="w-full" asChild>
                  <a href={channel.link} target="_blank" rel="noopener noreferrer">
                    {channel.action}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link to={channel.link}>
                    {channel.action}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportChannels.slice(3).map((channel) => (
          <Card key={channel.title} className="glass border-border/20 hover:glow-accent transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <channel.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{channel.title}</CardTitle>
              </div>
              <CardDescription>{channel.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Availability: {channel.availability}</p>
                <p className="text-xs text-muted-foreground">Response: {channel.response}</p>
              </div>
              {channel.external ? (
                <Button variant="outline" className="w-full" asChild>
                  <a href={channel.link} target="_blank" rel="noopener noreferrer">
                    {channel.action}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link to={channel.link}>
                    {channel.action}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Articles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {helpCategories.map((category) => (
            <Card key={category.title} className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  {category.title}
                </CardTitle>
                <CardDescription className="text-sm">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.articles.map((article) => (
                    <Link 
                      key={article.title} 
                      to={article.link}
                      className="block p-2 rounded-lg hover:bg-secondary/20 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">{article.title}</p>
                            {article.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{article.time}</p>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Card */}
      <Card className="glass border-border/20 text-center p-8">
        <h3 className="text-xl font-bold mb-2">Still need help?</h3>
        <p className="text-muted-foreground mb-6">
          Our expert support team is here to help you succeed with Orchesity AI platform in 2025
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero">
            <Link to="/contact">Contact Support Team</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="https://calendly.com/orchesity/demo" target="_blank" rel="noopener noreferrer">
              Schedule a Live Demo
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Enterprise customers:</strong> Get priority support with guaranteed 2-hour response time. 
            <Link to="/subscription" className="text-primary hover:underline ml-1">Upgrade to Enterprise</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};