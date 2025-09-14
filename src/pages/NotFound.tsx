import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="glass border-border/20 max-w-md w-full text-center">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h1 className="text-6xl font-bold gradient-text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="hero" className="flex-1">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;