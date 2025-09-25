import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Eye, 
  RefreshCw,
  Server,
  Database,
  FileCode,
  GitBranch
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { GenerationStatus as Status } from '@/types/orchesity';

export default function GenerationStatus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      navigate('/generate');
      return;
    }

    // Initial load
    loadStatus();

    // Set up polling for status updates
    const pollInterval = setInterval(loadStatus, 3000);

    // Clean up
    return () => clearInterval(pollInterval);
  }, [id]);

  const loadStatus = async () => {
    if (!id) return;

    try {
      const response = await orchesityService.getGenerationStatus(id);
      const newStatus = response.data;
      setStatus(newStatus);
      setLogs(newStatus.logs || []);

      // Stop polling if generation is complete or failed
      if (newStatus.status === 'completed' || newStatus.status === 'failed') {
        if (newStatus.status === 'completed') {
          toast({
            title: 'Generation Complete!',
            description: 'Your backend has been successfully generated.',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Failed to load status',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!id) return;

    try {
      const response = await orchesityService.downloadProject(id);
      const downloadUrl = response.data.download_url;
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${status?.project_name || 'backend-project'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Download Started',
        description: 'Your backend project is being downloaded.',
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: error instanceof Error ? error.message : 'Failed to download project',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'generating':
      case 'reviewing':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'generating':
      case 'reviewing':
        return 'bg-blue-500';
      default:
        return 'bg-yellow-500';
    }
  };

  if (loading && !status) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin mr-2" />
          <span>Loading generation status...</span>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Generation not found. Please check the URL or start a new generation.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Backend Generation Status</h1>
        <p className="text-muted-foreground">
          Tracking the generation of "{status.project_name}"
        </p>
      </div>

      {/* Status Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(status.status)}
              <span className="ml-2">Generation Progress</span>
            </div>
            <Badge variant="secondary" className={getStatusColor(status.status)}>
              {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
            </Badge>
          </CardTitle>
          <CardDescription>
            Current stage: {status.stage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{status.progress}%</span>
              </div>
              <Progress value={status.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center">
                <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{status.framework}</span>
              </div>
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{status.database}</span>
              </div>
              {status.file_count && (
                <div className="flex items-center">
                  <FileCode className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{status.file_count} files</span>
                </div>
              )}
              {status.total_lines && (
                <div className="flex items-center">
                  <GitBranch className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{status.total_lines} lines</span>
                </div>
              )}
            </div>

            {status.estimated_completion && status.status !== 'completed' && (
              <div className="text-sm text-muted-foreground">
                Estimated completion: {new Date(status.estimated_completion).toLocaleTimeString()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          onClick={handleDownload}
          disabled={status.status !== 'completed'}
          className="flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Project
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate(`/generate/preview/${id}`)}
          disabled={status.status !== 'completed'}
          className="flex items-center"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Project
        </Button>

        {status.status === 'failed' && (
          <Button
            variant="outline"
            onClick={() => navigate('/generate')}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>

      {/* Generation Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Logs</CardTitle>
          <CardDescription>
            Real-time logs from the backend generation process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
            {logs.length > 0 ? (
              <div className="space-y-1 font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="text-muted-foreground">
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-8">
                No logs available yet. Generation will start shortly...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}