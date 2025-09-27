import { LoginForm } from '@/components/auth/LoginForm';
import { GoBackButton } from '@/components/ui/go-back-button';

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <GoBackButton />
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/logo-full.png" 
            alt="OrchesityAI" 
            className="h-12 mx-auto mb-2"
          />
        </div>
        <LoginForm onToggleMode={() => window.location.href = '/register'} />
      </div>
    </div>
  );
}