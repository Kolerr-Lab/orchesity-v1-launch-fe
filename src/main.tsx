import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { GlobalLoader } from "@/components/common/GlobalLoader";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

// Lazy load components for better performance
const Index = lazy(() => import("@/pages/Index"));
const Auth = lazy(() => import("@/pages/Auth"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Agents = lazy(() => import("@/pages/Agents"));
const Orchestration = lazy(() => import("@/pages/Orchestration"));
const Plugins = lazy(() => import("@/pages/Plugins"));
const Metrics = lazy(() => import("@/pages/Metrics"));
const Settings = lazy(() => import("@/pages/Settings"));
const Docs = lazy(() => import("@/pages/Docs"));
const Contact = lazy(() => import("@/pages/Contact"));
const Support = lazy(() => import("@/pages/Support"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const CostCalculator = lazy(() => import("@/pages/CostCalculator"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <GlobalLoader />
      <ErrorBoundary resetKeys={[location.pathname, location.search]}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/orchestration" element={<Orchestration />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/cost-calculator" element={<CostCalculator />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LoadingProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
