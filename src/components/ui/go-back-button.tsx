import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GoBackButtonProps {
  className?: string;
  variant?: "ghost" | "outline" | "secondary";
  size?: "sm" | "default" | "lg";
  fallbackPath?: string;
}

export function GoBackButton({ 
  className, 
  variant = "ghost", 
  size = "sm",
  fallbackPath = "/"
}: GoBackButtonProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleGoBack}
      className={cn("gap-2", className)}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}