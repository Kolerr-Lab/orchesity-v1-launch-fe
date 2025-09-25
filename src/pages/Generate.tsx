import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles, Database, Server, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { BackendGeneratorRequest } from '@/types/orchesity';

const frameworks = [
  { value: 'fastapi', label: 'FastAPI', description: 'Modern, fast Python web framework' },
  { value: 'django', label: 'Django', description: 'High-level Python web framework' },
  { value: 'flask', label: 'Flask', description: 'Lightweight Python web framework' },
  { value: 'express', label: 'Express.js', description: 'Fast Node.js web framework' },
  { value: 'nestjs', label: 'NestJS', description: 'Progressive Node.js framework' },
];

const databases = [
  { value: 'postgresql', label: 'PostgreSQL', description: 'Advanced open source database' },
  { value: 'mysql', label: 'MySQL', description: 'Popular relational database' },
  { value: 'sqlite', label: 'SQLite', description: 'Lightweight embedded database' },
  { value: 'mongodb', label: 'MongoDB', description: 'Document-based NoSQL database' },
];

const commonFeatures = [
  'Authentication & Authorization',
  'API Documentation (OpenAPI/Swagger)',
  'Database Migrations',
  'Input Validation',
  'Error Handling',
  'Logging & Monitoring',
  'Rate Limiting',
  'CORS Configuration',
  'Environment Configuration',
  'Unit Tests',
  'Docker Configuration',
  'CI/CD Pipeline',
];

export default function Generate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<BackendGeneratorRequest>({
    prompt: '',
    project_name: '',
    framework: 'fastapi',
    database: 'postgresql',
    features: [],
    requirements: '',
  });

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...(prev.features || []), feature]
        : (prev.features || []).filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prompt.trim() || !formData.project_name.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both a project description and name.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await orchesityService.generateBackend(formData);
      toast({
        title: 'Generation Started!',
        description: 'Your backend is being generated. You will be redirected to track progress.',
      });
      navigate(`/generate/status/${response.data.generation_id}`);
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to start backend generation',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          <Sparkles className="inline-block mr-2 h-8 w-8" />
          Generate Your Backend
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your backend requirements in natural language and let our AI generate a complete, 
          production-ready backend application for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5" />
              Project Description
            </CardTitle>
            <CardDescription>
              Describe what your backend should do. Be as detailed as possible for better results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Create a task management API with user authentication, team collaboration features, file uploads, real-time notifications, and analytics dashboard..."
              value={formData.prompt}
              onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
              className="min-h-32"
              required
            />
          </CardContent>
        </Card>

        {/* Project Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project_name">Project Name</Label>
                <Input
                  id="project_name"
                  placeholder="my-awesome-api"
                  value={formData.project_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select 
                  value={formData.framework} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, framework: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((framework) => (
                      <SelectItem key={framework.value} value={framework.value}>
                        <div>
                          <div className="font-medium">{framework.label}</div>
                          <div className="text-sm text-muted-foreground">{framework.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="database">Database</Label>
              <Select 
                value={formData.database} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, database: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {databases.map((database) => (
                    <SelectItem key={database.value} value={database.value}>
                      <div className="flex items-center">
                        <Database className="mr-2 h-4 w-4" />
                        <div>
                          <div className="font-medium">{database.label}</div>
                          <div className="text-sm text-muted-foreground">{database.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Features Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Features to Include</CardTitle>
            <CardDescription>
              Select the features you want included in your backend. More features may increase generation time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={(formData.features || []).includes(feature)}
                    onCheckedChange={(checked) => handleFeatureToggle(feature, checked as boolean)}
                  />
                  <Label htmlFor={feature} className="text-sm font-normal">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Requirements</CardTitle>
            <CardDescription>
              Any specific requirements, constraints, or additional details about your backend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Must integrate with Stripe for payments, need Redis for caching, should follow specific coding patterns..."
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
              className="min-h-24"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isGenerating}
            className="px-8 py-4 text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Backend...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Backend
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}