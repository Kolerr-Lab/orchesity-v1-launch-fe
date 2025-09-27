// Backend Generator related types

export interface BackendGeneratorRequest {
  prompt: string;
  project_name: string;
  framework?: 'fastapi' | 'django' | 'flask' | 'express' | 'nestjs';
  database?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  features?: string[];
  requirements?: string;
}

export interface BackendGeneratorResponse {
  generation_id: string;
  status: 'pending' | 'generating' | 'reviewing' | 'completed' | 'failed';
  progress: number;
  stage: string;
  project_name: string;
  framework: string;
  database: string;
  created_at: string;
  updated_at: string;
}

export interface GenerationStatus extends BackendGeneratorResponse {
  logs: string[];
  estimated_completion: string;
  file_count?: number;
  total_lines?: number;
}

export interface ProjectPreview {
  generation_id: string;
  project_structure: FileStructure[];
  key_files: KeyFile[];
  api_endpoints: ApiEndpoint[];
  database_schema: DatabaseTable[];
  deployment_instructions: string;
}

export interface FileStructure {
  name: string;
  type: 'file' | 'directory';
  path: string;
  size?: number;
  children?: FileStructure[];
}

export interface KeyFile {
  name: string;
  path: string;
  content: string;
  language: string;
  description: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  request_body?: Record<string, any>;
  response_body?: Record<string, any>;
}

export interface DatabaseTable {
  name: string;
  columns: DatabaseColumn[];
  relationships?: string[];
}

export interface DatabaseColumn {
  name: string;
  type: string;
  nullable: boolean;
  primary_key: boolean;
  foreign_key?: string;
}

export interface DownloadInfo {
  generation_id: string;
  download_url: string;
  file_size: number;
  expires_at: string;
}

export interface BackendExample {
  id: string;
  title: string;
  description: string;
  framework: string;
  database: string;
  features: string[];
  prompt: string;
  preview_url?: string;
  thumbnail?: string;
  complexity: 'simple' | 'medium' | 'complex';
}

export interface GenerationReview {
  review: string;
  suggestions: string[];
}