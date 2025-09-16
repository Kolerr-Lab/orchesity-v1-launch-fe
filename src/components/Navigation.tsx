import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Bot, BarChart3, Settings, BookOpen, LogOut, User, Cpu, Puzzle, Activity, Calculator, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  
  // Close mobile menu when clicking outside
  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) setIsOpen(false);
  });

  const navItems = [
    { label: "Control Center", href: "/dashboard", icon: BarChart3 },
    { label: "Connected Apps", href: "/agents", icon: Bot },
    { label: "Cost Analytics", href: "/metrics", icon: Activity },
    { label: "API Playground", href: "/orchestration", icon: Cpu },
    { label: "Integrations", href: "/plugins", icon: Puzzle },
    { label: "API Docs", href: "/docs", icon: BookOpen },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const publicNavItems = [
    { label: "Documentation", href: "/docs", icon: BookOpen },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "Cost Calculator", href: "/cost-calculator", icon: Calculator },
    { label: "Pricing", href: "/subscription", icon: Zap },
    { label: "Contact", href: "/contact", icon: MessageCircle },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/20" ref={mobileMenuRef}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img 
                src="/logo-symbol.png" 
                alt="OrchesityAI Symbol" 
                className="h-8 w-8 group-hover:opacity-75 transition-all dark:invert"
              />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold gradient-text-primary">
              OrchesityAI
            </span>
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
              publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))
            )}
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
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
            "md:hidden border-t border-border/20 transition-all duration-300 ease-in-out backdrop-blur-md bg-background/95",
            isOpen
              ? "max-h-96 opacity-100 pb-4 shadow-lg"
              : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="pt-4 space-y-1 bg-background/50 backdrop-blur-sm rounded-lg mx-2 mt-2 border border-border/10">
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 px-6 py-4 rounded-lg text-base font-bold text-foreground/90 hover:text-foreground hover:bg-primary/10 transition-all border-b border-border/5 last:border-b-0 backdrop-blur-sm bg-background/60"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-primary/80" />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-border/30 bg-background/40 rounded-b-lg">
                  <div className="flex items-center space-x-3 px-6 py-3 text-base font-semibold text-foreground/80 bg-background/60 rounded-lg mx-2 mb-2">
                    <User className="h-5 w-5 text-primary/70" />
                    <span className="tracking-wide">{user?.name}</span>
                  </div>
                  <div className="flex justify-center mb-3">
                    <ThemeToggle />
                  </div>
                  <div className="px-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start gap-3 font-bold text-base py-4 hover:bg-destructive/10 hover:text-destructive transition-all bg-background/60 border border-border/10" 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 px-6 py-4 rounded-lg text-base font-bold text-foreground/90 hover:text-foreground hover:bg-primary/10 transition-all border-b border-border/5 last:border-b-0 backdrop-blur-sm bg-background/60"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-primary/80" />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                ))}
                <div className="pt-4 space-y-3 bg-background/40 rounded-b-lg p-4 mt-4 border-t border-border/30">
                  <div className="flex justify-center mb-3">
                    <ThemeToggle />
                  </div>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start font-bold text-base py-4 bg-background/60 border border-border/10 hover:bg-secondary/50">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full font-bold text-base py-4 shadow-lg">
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