import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Zap, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

interface FreePlanQuotaProps {
  currentUsage?: number;
  dailyLimit?: number;
  nextResetTime?: string;
}

export const FreePlanQuota: React.FC<FreePlanQuotaProps> = ({
  currentUsage = 2,
  dailyLimit = 3,
  nextResetTime = "7:00 AM"
}) => {
  const usagePercentage = (currentUsage / dailyLimit) * 100;
  const remainingUses = Math.max(0, dailyLimit - currentUsage);
  const isLimitReached = currentUsage >= dailyLimit;

  // Calculate time until next reset (7 AM next day)
  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(7, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Free Plan Usage
          </CardTitle>
          <Badge variant={isLimitReached ? "destructive" : "secondary"}>
            {currentUsage}/{dailyLimit} uses
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Usage Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Usage</span>
            <span className="font-medium">
              {remainingUses} {remainingUses === 1 ? 'use' : 'uses'} remaining
            </span>
          </div>
          <Progress 
            value={usagePercentage} 
            className="h-2"
          />
        </div>

        {/* Reset Timer */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <Clock className="h-4 w-4" />
          <span>Resets in {getTimeUntilReset()} at {nextResetTime}</span>
        </div>

        {/* Limit Reached Message */}
        {isLimitReached && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-destructive mb-1">
                  Daily limit reached
                </h4>
                <p className="text-sm text-destructive/80">
                  You've used all {dailyLimit} free requests today. Upgrade for unlimited access or wait for tomorrow's reset.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade CTA */}
        <div className="pt-2">
          <Link to="/subscription">
            <Button 
              variant={isLimitReached ? "default" : "outline"} 
              className="w-full gap-2"
              size="sm"
            >
              <ArrowUp className="h-4 w-4" />
              {isLimitReached ? "Upgrade Now" : "Upgrade for Unlimited"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};