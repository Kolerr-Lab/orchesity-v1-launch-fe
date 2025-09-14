import { HelpCircle, Book, MessageCircle, Video, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: Book,
      articles: [
        { title: "Quick Start Guide", time: "5 min read", popular: true },
        { title: "API Authentication", time: "3 min read", popular: true },
        { title: "Your First Integration", time: "10 min read", popular: false },
        { title: "Cost Optimization Basics", time: "7 min read", popular: true },
      ]
    },
    {
      title: "Integration Guides",
      icon: ExternalLink,
      articles: [
        { title: "React Integration", time: "8 min read", popular: true },
        { title: "Python SDK Setup", time: "6 min read", popular: false },
        { title: "Mobile App Integration", time: "12 min read", popular: true },
        { title: "Enterprise Setup", time: "15 min read", popular: false },
      ]
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      articles: [
        { title: "Common API Errors", time: "4 min read", popular: true },
        { title: "Performance Optimization", time: "9 min read", popular: false },
        { title: "Billing Issues", time: "3 min read", popular: true },
        { title: "Security Best Practices", time: "11 min read", popular: false },
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      icon: MessageCircle,
      availability: "24/7 for Pro+ plans",
      response: "< 2 minutes"
    },
    {
      title: "Video Tutorials",
      description: "Learn with step-by-step video guides",
      action: "Watch Videos",
      icon: Video,
      availability: "Free access",
      response: "Self-paced"
    },
    {
      title: "Community Forum",
      description: "Connect with other developers",
      action: "Join Community",
      icon: MessageCircle,
      availability: "Open to all",
      response: "Community driven"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel) => (
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
              <Button variant="outline" className="w-full">
                {channel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Articles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {helpCategories.map((category) => (
            <Card key={category.title} className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.articles.map((article) => (
                    <div key={article.title} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{article.title}</p>
                          {article.popular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{article.time}</p>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
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
          Our support team is here to help you succeed with Orchesity
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero">
            <Link to="/auth">Contact Support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/auth">Schedule a Demo</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};