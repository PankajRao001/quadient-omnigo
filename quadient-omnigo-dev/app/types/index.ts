// Job and file status types
export type FileStatus = 'pending' | 'delivered' | 'error';
export type DistributionMethod = 'email' | 'post' | 'kivra';
export type JobStatus = 'pending' | 'completed' | 'processing' | 'failed';

// Individual file in a job
export interface JobFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: FileStatus;
  distributionMethod: DistributionMethod;
  recipient?: string;
  errorMessage?: string;
  processedAt?: string;
  deliveredAt?: string;
}

// Job history entry
export interface JobHistory {
  id: string;
  jobName: string;
  createdAt: string;
  totalFiles: number;
  completedFiles: number;
  pendingFiles: number;
  errorFiles: number;
  files: JobFile[];
}

export interface Job {
  id: string;
  filename: string;
  name?: string;
  status: JobStatus;
  timestamp: number; // Unix timestamp
  fileSize: number; // in MB
  pages: number;
}

export interface ResumeJob {
  id: number;
  name: string;
  createdDate: string;
  expiryDate: string;
  fileCount: number;
  status: 'paused' | 'active' | 'completed' | 'error';
}

export interface StagedFile {
  id: number;
  name: string;
  size: number;
  file: File;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}