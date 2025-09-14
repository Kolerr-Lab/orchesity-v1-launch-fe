import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Bot, BarChart3, Settings, BookOpen, LogOut, User, Cpu, Puzzle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { label: "Agents", href: "/agents", icon: Bot },
    { label: "Orchestration", href: "/orchestration", icon: Cpu },
    { label: "Plugins", href: "/plugins", icon: Puzzle },
    { label: "Metrics", href: "/metrics", icon: Activity },
    { label: "Documentation", href: "/docs", icon: BookOpen },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center">
              {/* Geometric Logo Design */}
              <div className="relative">
                {/* Main hexagon shape */}
                <div className="w-10 h-10 relative">
                  <svg 
                    viewBox="0 0 40 40" 
                    className="w-full h-full transform group-hover:rotate-12 transition-transform duration-500"
                    fill="none"
                  >
                    {/* Outer hexagon */}
                    <path 
                      d="M20 2 L35 11 L35 29 L20 38 L5 29 L5 11 Z" 
                      stroke="url(#gradient1)" 
                      strokeWidth="2"
                      fill="url(#gradient2)"
                      className="drop-shadow-lg"
                    />
                    {/* Inner geometric pattern */}
                    <path 
                      d="M20 8 L28 13 L28 27 L20 32 L12 27 L12 13 Z" 
                      stroke="hsl(var(--accent))"
                      strokeWidth="1.5"
                      fill="none"
                      className="opacity-80"
                    />
                    {/* Central dot */}
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="3" 
                      fill="hsl(var(--primary))"
                      className="group-hover:animate-pulse"
                    />
                    
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary) / 0.1)" />
                        <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-lg opacity-0 group-hover:opacity-30 blur-md transition-all duration-500 -z-10" />
              </div>
            </div>
            
            {/* Brand text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text-primary tracking-tight leading-none">
                Orchesity
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                OSS AGENT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))
            ) : (
              <Link
                to="/docs"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <BookOpen className="h-4 w-4" />
                <span>Documentation</span>
              </Link>
            )}
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero" size="sm" className="glow-primary">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden border-t border-border/20 transition-all duration-300 ease-in-out",
            isOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="pt-4 space-y-2">
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-border/20">
                  <div className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start gap-2 mt-2" 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/docs"
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Documentation</span>
                </Link>
                <div className="pt-4 space-y-2">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;