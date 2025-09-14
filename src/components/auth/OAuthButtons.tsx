import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Chrome, Loader2 } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';

interface OAuthButtonsProps {
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
}

export const OAuthButtons = ({ disabled = false, variant = 'outline' }: OAuthButtonsProps) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const { toast } = useToast();

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoadingProvider(provider);
    
    try {
      if (provider === 'google') {
        authService.initiateGoogleAuth();
      } else {
        authService.initiateGitHubAuth();
      }
    } catch (error) {
      toast({
        title: 'Authentication Error',
        description: `Failed to initiate ${provider} authentication`,
        variant: 'destructive',
      });
      setLoadingProvider(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant={variant}
        onClick={() => handleOAuthLogin('google')}
        disabled={disabled || loadingProvider !== null}
        className="w-full"
      >
        {loadingProvider === 'google' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Chrome className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      
      <Button
        variant={variant}
        onClick={() => handleOAuthLogin('github')}
        disabled={disabled || loadingProvider !== null}
        className="w-full"
      >
        {loadingProvider === 'github' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  );
};