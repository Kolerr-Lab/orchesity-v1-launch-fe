import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { GoBackButton } from '@/components/ui/go-back-button';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <GoBackButton />
      </div>
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
}