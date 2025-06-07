import { JobHistory, FileStatus, DistributionMethod, Job, JobStatus } from '../types';


// Deterministic mock data for both recent uploads and archive
const mockJobs: Job[] = [
  {
    id: '1',
    filename: 'quarterly_report.pdf',
    name: 'Quarterly Financial Report - Q2 2023',
    status: 'completed',
    timestamp: new Date('2023-06-15T14:30:00').getTime(),
    fileSize: 2.4,
    pages: 12
  },
  {
    id: '2',
    filename: 'financial_analysis.pdf',
    name: 'Annual Financial Analysis 2023',
    status: 'completed',
    timestamp: new Date('2023-06-10T09:15:00').getTime(),
    fileSize: 1.8,
    pages: 5
  },
  {
    id: '3',
    filename: 'presentation_deck.pdf',
    name: 'Executive Board Presentation',
    status: 'completed',
    timestamp: new Date('2023-06-05T16:45:00').getTime(),
    fileSize: 5.2,
    pages: 24
  },
  {
    id: '4',
    filename: 'contract_draft.pdf',
    name: 'Client Contract Drafts - June 2023',
    status: 'processing',
    timestamp: new Date('2023-05-28T11:20:00').getTime(),
    fileSize: 0.9,
    pages: 8
  },
  {
    id: '5',
    filename: 'marketing_plan.pdf',
    name: 'Q3 Marketing Campaign Plan',
    status: 'failed',
    timestamp: new Date('2023-05-20T13:10:00').getTime(),
    fileSize: 3.7,
    pages: 18
  },
  {
    id: '6',
    filename: 'budget_2023.pdf',
    name: 'Department Budget Allocation 2023',
    status: 'completed',
    timestamp: new Date('2023-05-15T10:05:00').getTime(),
    fileSize: 1.2,
    pages: 3
  },
  {
    id: '7',
    filename: 'project_timeline.pdf',
    name: 'Project Milestone Timeline',
    status: 'completed',
    timestamp: new Date('2023-05-10T15:30:00').getTime(),
    fileSize: 0.8,
    pages: 2
  }
];

// Convert the deterministic Job objects to JobHistory objects for the archive
export const mockJobHistory: JobHistory[] = mockJobs.map(job => {
  // Create a consistent number of files for each job
  const fileCount = job.pages;
  
  // Create files based on the job
  const files = Array.from({ length: fileCount }).map((_, index) => {
    // Ensure a mix of statuses for each job regardless of job status
    // Distribute files roughly as: 60% delivered, 20% pending, 20% error
    let status: FileStatus;
    
    if (index % 5 === 0) {
      status = 'pending';
    } else if (index % 5 === 1) {
      status = 'error';
    } else {
      status = 'delivered';
    }
    
    const distributionMethod: DistributionMethod = (['email', 'post', 'kivra'] as const)[index % 3];
    
    return {
      id: `file_${job.id}_${index}`,
      fileName: `${job.filename.replace('.pdf', '')}_part${index + 1}.pdf`,
      fileSize: Math.round((job.fileSize * 1024 * 1024) / fileCount), // Convert MB to bytes and divide by file count
      fileType: 'application/pdf',
      status,
      distributionMethod,
      recipient: distributionMethod === 'email' ? 
        `recipient${index}@example.com` : 
        distributionMethod === 'post' ? 
          `123 Main St, City ${index}, Country` : 
          `User${1000 + index}`,
      errorMessage: status === 'error' ? 'Could not be delivered' : undefined,
      processedAt: status !== 'pending' ? new Date(job.timestamp + 3600000).toISOString() : undefined,
      deliveredAt: status === 'delivered' ? new Date(job.timestamp + 7200000).toISOString() : undefined
    };
  });
  
  // Count files by status
  const pendingFiles = files.filter(file => file.status === 'pending').length;
  const errorFiles = files.filter(file => file.status === 'error').length;
  const completedFiles = files.filter(file => file.status === 'delivered').length;
  
  // Determine overall job status based on file statuses
  let jobStatus: JobStatus;
  if (pendingFiles > 0) {
    jobStatus = 'processing';
  } else if (errorFiles > 0) {
    jobStatus = 'failed';
  } else {
    jobStatus = 'completed';
  }
  
  return {
    id: job.id,
    jobName: job.name || job.filename,
    createdAt: new Date(job.timestamp).toISOString(),
    totalFiles: fileCount,
    completedFiles,
    pendingFiles,
    errorFiles,
    files
  };
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

// Update the mock jobs with the calculated statuses
mockJobs.forEach((job, index) => {
  const jobHistory = mockJobHistory.find(j => j.id === job.id);
  if (jobHistory) {
    // Determine job status based on file statuses
    if (jobHistory.pendingFiles > 0) {
      job.status = 'processing';
    } else if (jobHistory.errorFiles > 0) {
      job.status = 'failed';
    } else {
      job.status = 'completed';
    }
  }
});

export function getMockJobs(): Job[] {
  // Return a copy of the mock jobs sorted by timestamp (newest first)
  return [...mockJobs].sort((a, b) => b.timestamp - a.timestamp);
}

export function getMockJobById(id: string): Job | undefined {
  return mockJobs.find(job => job.id === id);
}

export function getMockJobHistoryById(id: string): JobHistory | undefined {
  return mockJobHistory.find(job => job.id === id);
} 