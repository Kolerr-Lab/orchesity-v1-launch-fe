import React from 'react';
import { ArrowRight, Sparkles, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-20 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/10 to-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Welcome back, {user?.name || 'Developer'}!
          </Badge>

          {/* Main Heading */}
          <h1 className="font-inter text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Generate with{" "}
            <span className="gradient-text-primary">META Agent?</span>
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Transform any idea into a complete backend with our revolutionary META Agent. 
            Generate production-ready infrastructure from simple natural language prompts.
          </p>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <Card className="glass border-primary/20 hover:border-primary/40 transition-colors group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Complete Backend Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Transform ideas into production-ready backends instantly
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20 hover:border-primary/40 transition-colors group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">7-Phase Process</h3>
                <p className="text-sm text-muted-foreground">
                  End-to-end generation from design to deployment
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20 hover:border-primary/40 transition-colors group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Infrastructure as Code</h3>
                <p className="text-sm text-muted-foreground">
                  Complete Docker + deployment configs included
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="outline" size="sm" className="glass">
              <Link to="/generate">
                <ArrowRight className="h-4 w-4 mr-2" />
                META Agent Generator
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="glass">
              <Link to="/generate/examples">
                Example Backends
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="glass">
              <Link to="/docs">
                Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;