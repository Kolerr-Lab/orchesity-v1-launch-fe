import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { orchesityService } from '@/services/orchesity.service';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

export const OAuthCallback = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const provider = window.location.pathname.split('/').pop(); // Extract provider from URL
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const errorParam = searchParams.get('error');

  useEffect(() => {
    const handleCallback = async () => {
      if (errorParam) {
        setError(`Authentication failed: ${errorParam}`);
        setIsLoading(false);
        return;
      }

      if (!code || !provider) {
        setError('Missing authentication parameters');
        setIsLoading(false);
        return;
      }

      if (!['google', 'github'].includes(provider)) {
        setError('Invalid OAuth provider');
        setIsLoading(false);
        return;
      }

      try {
        if (provider === 'github') {
          const authResponse = await orchesityService.handleGitHubCallback(code, state);
          localStorage.setItem('access_token', authResponse.data.access_token);
          localStorage.setItem('refresh_token', authResponse.data.refresh_token);
          
          // Update auth context - simplified for now
          setIsLoading(false);
          navigate('/dashboard');
        } else {
          throw new Error('Unsupported OAuth provider');
        }
        
        toast({
          title: 'Welcome!',
          description: `Successfully signed in with ${provider}`,
        });
        
        navigate('/dashboard');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Authentication failed';
        setError(message);
        toast({
          title: 'Authentication Error',
          description: message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [code, provider, state, errorParam, navigate, login, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass border-border/20 max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Authenticating...</CardTitle>
            <CardDescription>
              Please wait while we complete your {provider} sign-in
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoadingSpinner size="lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass border-border/20 max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Authentication Failed</CardTitle>
            <CardDescription>
              There was a problem signing you in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            
            <Button
              onClick={() => navigate('/auth')}
              className="w-full"
              variant="outline"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};