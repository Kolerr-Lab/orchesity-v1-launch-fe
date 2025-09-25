import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Download, 
  FolderTree, 
  Database, 
  Globe, 
  Code2,
  Copy,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { ProjectPreview as Preview } from '@/types/orchesity';

export default function ProjectPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/generate');
      return;
    }

    loadPreview();
  }, [id]);

  const loadPreview = async () => {
    if (!id) return;

    try {
      const response = await orchesityService.getProjectPreview(id);
      setPreview(response.data);
    } catch (error) {
      toast({
        title: 'Failed to load preview',
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
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `backend-project.zip`;
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

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
      toast({
        title: 'Copied!',
        description: 'Code copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy code to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const renderFileTree = (files: any[], level = 0) => {
    return files.map((file, index) => (
      <div key={index} className={`ml-${level * 4}`}>
        <div className="flex items-center py-1">
          {file.type === 'directory' ? (
            <FolderTree className="h-4 w-4 mr-2 text-blue-500" />
          ) : (
            <FileText className="h-4 w-4 mr-2 text-gray-500" />
          )}
          <span className="text-sm">{file.name}</span>
          {file.size && (
            <span className="text-xs text-muted-foreground ml-auto">
              {(file.size / 1024).toFixed(1)}KB
            </span>
          )}
        </div>
        {file.children && renderFileTree(file.children, level + 1)}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-2"></div>
          <span>Loading project preview...</span>
        </div>
      </div>
    );
  }

  if (!preview) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <Alert>
          <AlertDescription>
            Project preview not found. The generation may still be in progress.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => navigate(`/generate/status/${id}`)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Status
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Project Preview</h1>
              <p className="text-muted-foreground">
                Generated backend project ready for download
              </p>
            </div>
          </div>
          <Button onClick={handleDownload} size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="structure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="files">Key Files</TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        {/* Project Structure */}
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderTree className="h-5 w-5 mr-2" />
                Project Structure
              </CardTitle>
              <CardDescription>
                File and folder organization of your generated backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="font-mono text-sm">
                  {renderFileTree(preview.project_structure)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Files */}
        <TabsContent value="files">
          <div className="space-y-4">
            {preview.key_files.map((file, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <Code2 className="h-5 w-5 mr-2" />
                      {file.name}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{file.language}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(file.content, file.path)}
                      >
                        {copiedCode === file.path ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>{file.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                    <code className={`language-${file.language}`}>
                      {file.content}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Endpoints */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                API Endpoints
              </CardTitle>
              <CardDescription>
                Available REST API endpoints in your backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preview.api_endpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Badge 
                          variant={endpoint.method === 'GET' ? 'secondary' : 
                                 endpoint.method === 'POST' ? 'default' : 
                                 endpoint.method === 'PUT' ? 'outline' : 'destructive'}
                          className="mr-2"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">{endpoint.path}</code>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {endpoint.description}
                    </p>
                    {endpoint.request_body && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Request Body:</h4>
                        <pre className="bg-muted rounded p-2 text-xs overflow-x-auto">
                          {JSON.stringify(endpoint.request_body, null, 2)}
                        </pre>
                      </div>
                    )}
                    {endpoint.response_body && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Response:</h4>
                        <pre className="bg-muted rounded p-2 text-xs overflow-x-auto">
                          {JSON.stringify(endpoint.response_body, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Schema */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Schema
              </CardTitle>
              <CardDescription>
                Database tables and relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {preview.database_schema.map((table, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4">{table.name}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Column</th>
                            <th className="text-left py-2">Type</th>
                            <th className="text-left py-2">Nullable</th>
                            <th className="text-left py-2">Key</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.columns.map((column, colIndex) => (
                            <tr key={colIndex} className="border-b">
                              <td className="py-2 font-mono">{column.name}</td>
                              <td className="py-2">{column.type}</td>
                              <td className="py-2">
                                <Badge variant={column.nullable ? 'secondary' : 'outline'}>
                                  {column.nullable ? 'Yes' : 'No'}
                                </Badge>
                              </td>
                              <td className="py-2">
                                {column.primary_key && (
                                  <Badge variant="default" className="mr-1">PK</Badge>
                                )}
                                {column.foreign_key && (
                                  <Badge variant="outline">FK</Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {table.relationships && table.relationships.length > 0 && (
                      <div className="mt-3">
                        <h4 className="font-medium text-sm mb-2">Relationships:</h4>
                        <div className="flex flex-wrap gap-2">
                          {table.relationships.map((rel, relIndex) => (
                            <Badge key={relIndex} variant="outline">
                              {rel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deployment Instructions */}
        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Instructions</CardTitle>
              <CardDescription>
                Step-by-step guide to deploy your generated backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm">
                  {preview.deployment_instructions}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}