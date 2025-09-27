import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Code, 
  Database, 
  Server, 
  Star, 
  Eye, 
  Copy,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { orchesityService } from '@/services/orchesity.service';
import { BackendExample } from '@/types/orchesity';

export default function ExamplesGallery() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [examples, setExamples] = useState<BackendExample[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState('all');
  const [complexityFilter, setComplexityFilter] = useState('all');

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    try {
      const response = await orchesityService.getBackendExamples();
      setExamples(response.data);
    } catch (error) {
      toast({
        title: 'Failed to load examples',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFramework = frameworkFilter === 'all' || example.framework === frameworkFilter;
    const matchesComplexity = complexityFilter === 'all' || example.complexity === complexityFilter;

    return matchesSearch && matchesFramework && matchesComplexity;
  });

  const useExample = (example: BackendExample) => {
    // Navigate to generate page with pre-filled data
    navigate('/generate', { 
      state: { 
        prompt: example.prompt,
        framework: example.framework,
        database: example.database,
        features: example.features
      } 
    });
  };

  const copyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: 'Copied!',
        description: 'Example prompt copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy prompt to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'complex':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const frameworks = [...new Set(examples.map(e => e.framework))];

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-2"></div>
          <span>Loading examples...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Backend Examples Gallery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore curated examples of backend projects you can generate. 
          Find inspiration or use these as starting points for your own projects.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search examples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Frameworks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                {frameworks.map((framework) => (
                  <SelectItem key={framework} value={framework}>
                    {framework.charAt(0).toUpperCase() + framework.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={complexityFilter} onValueChange={setComplexityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Complexities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Complexities</SelectItem>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="complex">Complex</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map((example) => (
          <Card key={example.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{example.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {example.description}
                  </CardDescription>
                </div>
                {example.thumbnail && (
                  <img 
                    src={example.thumbnail} 
                    alt={example.title}
                    className="w-16 h-16 rounded-lg object-cover ml-4"
                  />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-4">
                {/* Tech Stack */}
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{example.framework}</span>
                  <Database className="h-4 w-4 text-muted-foreground ml-2" />
                  <span className="text-sm">{example.database}</span>
                </div>

                {/* Complexity */}
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className={getComplexityColor(example.complexity)}>
                    {example.complexity.charAt(0).toUpperCase() + example.complexity.slice(1)}
                  </Badge>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {example.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {example.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{example.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Prompt Preview */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Prompt:</h4>
                  <div className="bg-muted rounded p-2 text-xs">
                    <p className="line-clamp-3">
                      {example.prompt}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Actions */}
            <CardContent className="pt-0">
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={() => useExample(example)}
                  className="w-full"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Use This Example
                </Button>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyPrompt(example.prompt)}
                    className="flex-1"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy Prompt
                  </Button>
                  
                  {example.preview_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(example.preview_url, '_blank')}
                      className="flex-1"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExamples.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No examples found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setFrameworkFilter('all');
              setComplexityFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}