import { ArrowRight, Sparkles, Cpu, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 animated-bg opacity-80" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 float">
        <Cpu className="h-8 w-8 text-primary/40" />
      </div>
      <div className="absolute top-40 right-32 float" style={{ animationDelay: "1s" }}>
        <Network className="h-6 w-6 text-accent/40" />
      </div>
      <div className="absolute bottom-40 left-32 float" style={{ animationDelay: "2s" }}>
        <Sparkles className="h-10 w-10 text-primary/30" />
      </div>

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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Universal{" "}
            <span className="gradient-text-primary">Cloud AI</span>
            <br />
            Backend for Every App
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            The only AI backend you'll ever need. Plug into any app, any language, any use case. 
            Save up to 70% on LLM costs with smart orchestration, caching, and provider optimization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 glow-primary pulse-glow group"
            >
              <Link to="/auth">
                Start Building Agents
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 glass hover:glow-accent"
            >
              <Link to="/docs">
                View Documentation
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { label: "Cost Savings", value: "70%" },
              { label: "Apps Connected", value: "50K+" },
              { label: "Enterprise SLA", value: "99.99%" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="glass rounded-lg p-6 group hover:glow-accent transition-all"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;