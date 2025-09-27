// Main form with all backend generation options

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader2, Code, Database, Settings } from 'lucide-react';
import type { BackendGeneratorRequest } from '@/types/backendGenerator';

interface GenerationFormProps {
  onSubmit: (data: BackendGeneratorRequest) => void;
  loading?: boolean;
}

const frameworks = [
  { value: 'fastapi', label: 'FastAPI (Python)' },
  { value: 'django', label: 'Django (Python)' },
  { value: 'flask', label: 'Flask (Python)' },
  { value: 'express', label: 'Express.js (Node.js)' },
  { value: 'nestjs', label: 'NestJS (Node.js)' },
];

const databases = [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mongodb', label: 'MongoDB' },
];

const commonFeatures = [
  'Authentication & JWT',
  'User Management',
  'File Upload/Storage',
  'Email Service',
  'Payment Integration',
  'API Rate Limiting',
  'Caching (Redis)',
  'WebSocket Support',
  'Background Tasks',
  'Admin Dashboard',
  'API Documentation',
  'Docker Support',
];

export const GenerationForm = ({ onSubmit, loading = false }: GenerationFormProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prompt.trim() || !formData.project_name.trim()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Project Description */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Project Description
          </CardTitle>
          <CardDescription>
            Describe your backend requirements in natural language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">What kind of backend do you need?</Label>
            <Textarea
              id="prompt"
              placeholder="Example: I need a task management API with user authentication, team collaboration, file attachments, and real-time notifications..."
              value={formData.prompt}
              onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
              className="min-h-[120px] glass"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration
          </CardTitle>
          <CardDescription>
            Choose your preferred technology stack
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_name">Project Name</Label>
              <Input
                id="project_name"
                placeholder="my-awesome-api"
                value={formData.project_name}
                onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
                className="glass"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Framework</Label>
              <Select
                value={formData.framework}
                onValueChange={(value) => setFormData(prev => ({ ...prev, framework: value as any }))}
              >
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((fw) => (
                    <SelectItem key={fw.value} value={fw.value}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </Label>
            <Select
              value={formData.database}
              onValueChange={(value) => setFormData(prev => ({ ...prev, database: value as any }))}
            >
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {databases.map((db) => (
                  <SelectItem key={db.value} value={db.value}>
                    {db.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle>Features & Integrations</CardTitle>
          <CardDescription>
            Select additional features you'd like to include
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
                <Label htmlFor={feature} className="text-sm">{feature}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Requirements */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle>Additional Requirements</CardTitle>
          <CardDescription>
            Any specific requirements, constraints, or preferences?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Example: Use SQLAlchemy ORM, include unit tests, follow REST API best practices, add OpenAPI documentation..."
            value={formData.requirements}
            onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
            className="min-h-[100px] glass"
          />
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-center">
        <Button 
          type="submit" 
          size="lg" 
          variant="hero"
          disabled={loading || !formData.prompt.trim() || !formData.project_name.trim()}
          className="min-w-[200px]"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Generating...' : 'Generate Backend'}
        </Button>
      </div>
    </form>
  );
};