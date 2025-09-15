import React from "react";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface UsageHeaderProps {
  currentUsage?: number;
  dailyLimit?: number;
  compact?: boolean;
}

export const UsageHeader: React.FC<UsageHeaderProps> = ({
  currentUsage = 2,
  dailyLimit = 3,
  compact = false
}) => {
  const remainingUses = Math.max(0, dailyLimit - currentUsage);
  const isLimitReached = currentUsage >= dailyLimit;

  if (compact) {
    return (
      <Badge 
        variant={isLimitReached ? "destructive" : remainingUses <= 1 ? "outline" : "secondary"}
        className="gap-1"
      >
        <Zap className="h-3 w-3" />
        {currentUsage}/{dailyLimit}
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Zap className="h-4 w-4 text-primary" />
      <span className="text-muted-foreground">Daily usage:</span>
      <Badge 
        variant={isLimitReached ? "destructive" : remainingUses <= 1 ? "outline" : "secondary"}
      >
        {currentUsage}/{dailyLimit} uses
      </Badge>
      {!isLimitReached && (
        <span className="text-muted-foreground">
          ({remainingUses} remaining)
        </span>
      )}
    </div>
  );
};