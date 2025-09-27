import React, { Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GlobalLoader } from "@/components/common/GlobalLoader";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { initPerformanceMonitoring } from "@/lib/performance";
import { productionSecurityChecklist } from "@/lib/security";
import "./index.css";

// Lazy load components with retry mechanism for production reliability
const Index = lazy(() => 
  import("@/pages/Index").catch(() => 
    import("@/pages/Index") // Retry once on failure
  )
);

const Login = lazy(() => 
  import("@/pages/Login").catch(() => 
    import("@/pages/Login")
  )
);

const Register = lazy(() => 
  import("@/pages/Register").catch(() => 
    import("@/pages/Register")
  )
);

const AuthCallback = lazy(() => 
  import("@/pages/AuthCallback").catch(() => 
    import("@/pages/AuthCallback")
  )
);

const Dashboard = lazy(() => 
  import("@/pages/Dashboard").catch(() => 
    import("@/pages/Dashboard")
  )
);

const Agents = lazy(() => 
  import("@/pages/Agents").catch(() => 
    import("@/pages/Agents")
  )
);

const Orchestration = lazy(() => 
  import("@/pages/Orchestration").catch(() => 
    import("@/pages/Orchestration")
  )
);

const Plugins = lazy(() => 
  import("@/pages/Plugins").catch(() => 
    import("@/pages/Plugins")
  )
);

const Metrics = lazy(() => 
  import("@/pages/Metrics").catch(() => 
    import("@/pages/Metrics")
  )
);

const Settings = lazy(() => 
  import("@/pages/Settings").catch(() => 
    import("@/pages/Settings")
  )
);

const Docs = lazy(() => 
  import("@/pages/Docs").catch(() => 
    import("@/pages/Docs")
  )
);

const Contact = lazy(() => 
  import("@/pages/Contact").catch(() => 
    import("@/pages/Contact")
  )
);

const Support = lazy(() => 
  import("@/pages/Support").catch(() => 
    import("@/pages/Support")
  )
);

const Subscription = lazy(() => 
  import("@/pages/Subscription").catch(() => 
    import("@/pages/Subscription")
  )
);

const CostCalculator = lazy(() => 
  import("@/pages/CostCalculator").catch(() => 
    import("@/pages/CostCalculator")
  )
);

const ResetPassword = lazy(() => 
  import("@/pages/ResetPassword").catch(() => 
    import("@/pages/ResetPassword")
  )
);

const About = lazy(() => 
  import("@/pages/About").catch(() => 
    import("@/pages/About")
  )
);

const Careers = lazy(() => 
  import("@/pages/Careers").catch(() => 
    import("@/pages/Careers")
  )
);

const Blog = lazy(() => 
  import("@/pages/Blog").catch(() => 
    import("@/pages/Blog")
  )
);

const Privacy = lazy(() => 
  import("@/pages/Privacy").catch(() => 
    import("@/pages/Privacy")
  )
);

const Terms = lazy(() => 
  import("@/pages/Terms").catch(() => 
    import("@/pages/Terms")
  )
);

const Security = lazy(() => 
  import("@/pages/Security").catch(() => 
    import("@/pages/Security")
  )
);

const Cookies = lazy(() => 
  import("@/pages/Cookies").catch(() => 
    import("@/pages/Cookies")
  )
);

const NotFound = lazy(() => 
  import("@/pages/NotFound").catch(() => 
    import("@/pages/NotFound")
  )
);

// Orchesity specific pages
const Generate = lazy(() => 
  import("@/pages/Generate").catch(() => 
    import("@/pages/Generate")
  )
);

const GenerationStatus = lazy(() => 
  import("@/pages/GenerationStatus").catch(() => 
    import("@/pages/GenerationStatus")
  )
);

const ProjectPreview = lazy(() => 
  import("@/pages/ProjectPreview").catch(() => 
    import("@/pages/ProjectPreview")
  )
);

const AgentDashboard = lazy(() => 
  import("@/pages/AgentDashboard").catch(() => 
    import("@/pages/AgentDashboard")
  )
);

const Examples = lazy(() => 
  import("@/pages/Examples").catch(() => 
    import("@/pages/Examples")
  )
);

const Billing = lazy(() => 
  import("@/pages/Billing").catch(() => 
    import("@/pages/Billing")
  )
);

const Deployments = lazy(() => 
  import("@/pages/Deployments").catch(() => 
    import("@/pages/Deployments")
  )
);

const Admin = lazy(() => 
  import("@/pages/Admin").catch(() => 
    import("@/pages/Admin")
  )
);

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Run security checks in development
    if (process.env.NODE_ENV === 'development') {
      productionSecurityChecklist.runChecks();
    }
  }, []);

  return (
    <>
      <GlobalLoader />
      <ErrorBoundary resetKeys={[location.pathname, location.search]}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="sr-only">Loading application...</span>
            </div>
          }
        >
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/github/callback" element={<AuthCallback />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Backend Generator (Main Feature) */}
            <Route path="/generate" element={<Generate />} />
            <Route path="/generate/status/:id" element={<GenerationStatus />} />
            <Route path="/generate/preview/:id" element={<ProjectPreview />} />
            <Route path="/generate/examples" element={<Examples />} />
            <Route path="/examples" element={<Examples />} />
            
            {/* Agent Dashboard */}
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/batch" element={<AgentDashboard />} />
            <Route path="/agent/history" element={<AgentDashboard />} />
            <Route path="/agent/status" element={<AgentDashboard />} />
            
            {/* Billing & Subscription */}
            <Route path="/billing" element={<Billing />} />
            
            {/* Project Management */}
            <Route path="/deployments" element={<Deployments />} />
            
            {/* Admin Panel */}
            <Route path="/admin" element={<Admin />} />
            
            {/* Legacy Routes */}
            <Route path="/agents" element={<Agents />} />
            <Route path="/orchestration" element={<Orchestration />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Static Pages */}
            <Route path="/docs" element={<Docs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/cost-calculator" element={<CostCalculator />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/security" element={<Security />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </ErrorBoundary>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="orchesity-ui-theme">
      <LoadingProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
