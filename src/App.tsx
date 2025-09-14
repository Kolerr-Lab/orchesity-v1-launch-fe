import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Orchestration from "./pages/Orchestration";
import Plugins from "./pages/Plugins";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";
import Subscription from "./pages/Subscription";
import Docs from "./pages/Docs";
import CostCalculator from "./pages/CostCalculator";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={
      <PublicRoute>
        <Index />
      </PublicRoute>
    } />
    <Route path="/auth" element={
      <PublicRoute>
        <Auth />
      </PublicRoute>
    } />
    <Route path="/auth/callback/:provider" element={
      <PublicRoute>
        <AuthCallback />
      </PublicRoute>
    } />
    <Route path="/reset-password" element={
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    } />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/agents" element={
      <ProtectedRoute>
        <Agents />
      </ProtectedRoute>
    } />
    <Route path="/orchestration" element={
      <ProtectedRoute>
        <Orchestration />
      </ProtectedRoute>
    } />
    <Route path="/plugins" element={
      <ProtectedRoute>
        <Plugins />
      </ProtectedRoute>
    } />
    <Route path="/metrics" element={
      <ProtectedRoute>
        <Metrics />
      </ProtectedRoute>
    } />
    <Route path="/settings" element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    } />
    <Route path="/subscription" element={<Subscription />} />
    <Route path="/docs" element={<Docs />} />
    <Route path="/cost-calculator" element={<CostCalculator />} />
    <Route path="/support" element={<Support />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
