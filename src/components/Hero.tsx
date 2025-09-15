import { ArrowRight, Sparkles, Cpu, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-16">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/80" />
      
      {/* Static gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/15 to-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
      
      {/* Subtle geometric elements */}
      <div className="absolute top-32 right-20 w-2 h-2 bg-primary/30 rounded-full"></div>
      <div className="absolute top-48 left-1/4 w-1 h-1 bg-accent/40 rounded-full"></div>
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/25 rounded-full"></div>
      <div className="absolute bottom-48 right-1/3 w-1 h-1 bg-accent/30 rounded-full"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border mb-8 group hover:glow-primary transition-all cursor-pointer">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">
              Universal Cloud AI Backend • Plug & Play • Cost Optimized
            </span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Main Heading */}
          <h1 className="font-poppins text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
            Universal{" "}
            <span className="gradient-text-primary font-bold">Cloud AI</span>
            <br />
            <span className="font-bold">Backend for Every App</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins text-xl md:text-2xl font-normal text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            The only AI backend you'll ever need. Plug into any app, any language, any use case. 
            Save up to 70% on LLM costs with smart orchestration, caching, and provider optimization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild
              variant="hero" 
              size="lg" 
              className="font-poppins text-lg font-semibold px-8 py-6 glow-primary pulse-glow group"
            >
              <Link to="/auth">
                Start Building Agents
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild
              variant="outline" 
              size="lg" 
              className="font-poppins text-lg font-medium px-8 py-6 glass hover:glow-accent"
            >
              <Link to="/docs">
                View Documentation
              </Link>
            </Button>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { 
                label: "Cost Reduction", 
                value: "Up to 70%", 
                description: "Smart caching & optimization"
              },
              { 
                label: "Universal Backend", 
                value: "Any Stack", 
                description: "React, Vue, Mobile, APIs"
              },
              { 
                label: "Enterprise Ready", 
                value: "99.99%", 
                description: "SLA uptime guarantee"
              },
            ].map((benefit, index) => (
              <div 
                key={benefit.label} 
                className="glass rounded-lg p-6 group hover:glow-accent transition-all"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text-primary mb-2">
                  {benefit.value}
                </div>
                <div className="text-sm font-medium mb-1">{benefit.label}</div>
                <div className="text-xs text-muted-foreground">{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;