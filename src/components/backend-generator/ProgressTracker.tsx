// Real-time progress with phases

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { GenerationStatus } from '@/types/backendGenerator';

interface ProgressTrackerProps {
  status: GenerationStatus;
}

const phases = [
  { name: 'Analysis', description: 'Analyzing requirements' },
  { name: 'Architecture', description: 'Designing system architecture' },
  { name: 'Database', description: 'Creating database schema' },
  { name: 'API', description: 'Generating API endpoints' },
  { name: 'Security', description: 'Implementing security features' },
  { name: 'Testing', description: 'Adding tests and validation' },
  { name: 'Documentation', description: 'Creating documentation' },
];

export const ProgressTracker = ({ status }: ProgressTrackerProps) => {
  const getCurrentPhaseIndex = () => {
    const currentPhase = status.stage.toLowerCase();
    return phases.findIndex(phase => 
      currentPhase.includes(phase.name.toLowerCase())
    );
  };

  const currentPhaseIndex = getCurrentPhaseIndex();

  const getStatusIcon = (phaseIndex: number) => {
    if (phaseIndex < currentPhaseIndex) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (phaseIndex === currentPhaseIndex) {
      return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
    } else {
      return <div className="h-4 w-4 rounded-full border-2 border-muted" />;
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'generating': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="glass border-border/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generation Progress</CardTitle>
          <Badge variant={status.status === 'failed' ? 'destructive' : 'secondary'}>
            {status.status === 'failed' && <AlertCircle className="h-3 w-3 mr-1" />}
            {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{status.progress}%</span>
          </div>
          <Progress value={status.progress} className="h-2" />
        </div>

        {/* Phase Breakdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Generation Phases</h4>
          <div className="space-y-3">
            {phases.map((phase, index) => (
              <div key={phase.name} className="flex items-center gap-3">
                {getStatusIcon(index)}
                <div className="flex-1">
                  <div className="text-sm font-medium">{phase.name}</div>
                  <div className="text-xs text-muted-foreground">{phase.description}</div>
                </div>
                {index === currentPhaseIndex && (
                  <Badge variant="outline" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Stage & ETA */}
        <div className="pt-4 border-t border-border/20 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Stage:</span>
            <span className="font-medium">{status.stage}</span>
          </div>
          {status.estimated_completion && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Completion:</span>
              <span className="font-medium">
                {new Date(status.estimated_completion).toLocaleTimeString()}
              </span>
            </div>
          )}
          {status.file_count && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Files Generated:</span>
              <span className="font-medium">{status.file_count}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};