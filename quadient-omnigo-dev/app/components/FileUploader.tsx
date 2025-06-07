'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import confetti from 'canvas-confetti';

// Define a type for processed files
interface ProcessedFile {
  id: string;
  originalName: string;
  size: number;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  previewUrl?: string;
  downloadUrl?: string;
  processingResult?: {
    distributionMethod: 'email' | 'post' | 'kivra';
    validationStatus: 'success' | 'warning' | 'error';
    validationMessage: string;
  };
}

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [submissionSummary, setSubmissionSummary] = useState<{
    totalFiles: number;
    emailFiles: number;
    postFiles: number;
    kivraFiles: number;
    rejectedFiles: number;
  } | null>(null);
  const [currentStage, setCurrentStage] = useState<'upload' | 'review' | 'summary' | 'success'>('upload');
  const [savings, setSavings] = useState({ amount: 0, percentage: 0 });
  const confettiRef = useRef(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out duplicate files
    const newFiles = acceptedFiles.filter(newFile => {
      // Check if this file already exists in our files array
      const isDuplicate = files.some(existingFile => 
        existingFile.name === newFile.name && 
        existingFile.size === newFile.size
      );
      
      if (isDuplicate) {
        // Set a warning message that will auto-dismiss after 3 seconds
        setDuplicateWarning(`"${newFile.name}" is already in your upload list.`);
        setTimeout(() => setDuplicateWarning(null), 3000);
      }
      
      return !isDuplicate;
    });
    
    // Add only non-duplicate files
    if (newFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  }, [files]);
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'application/xml': ['.xml']
    }
  });
  
  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock server processing
      setProcessing(true);
      
      // Simulate server processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create processed files with mock data
      const processed: ProcessedFile[] = files.map(file => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const randomId = Math.random().toString(36).substring(2, 10);
        
        // Generate random processing results
        const distributionMethods = ['email', 'post', 'kivra'] as const;
        const randomDistributionMethod = distributionMethods[Math.floor(Math.random() * distributionMethods.length)];
        
        let processingResult = {
          distributionMethod: randomDistributionMethod,
          validationStatus: ['success', 'warning', 'error'][Math.floor(Math.random() * 3)] as 'success' | 'warning' | 'error',
          validationMessage: ''
        };
        
        // Add validation messages based on status
        if (processingResult.validationStatus === 'warning') {
          processingResult.validationMessage = 'Some content may need review.';
        } else if (processingResult.validationStatus === 'error') {
          processingResult.validationMessage = 'File format issues detected.';
        }
        
        // Set initial status - automatically reject files with errors
        const initialStatus = processingResult.validationStatus === 'error' ? 'rejected' : 'pending';
        
        return {
          id: randomId,
          originalName: file.name,
          size: file.size,
          type: file.type,
          status: initialStatus,
          downloadUrl: '/mock_response.pdf', // Use static path instead of object URL
          processingResult
        };
      });
      
      setProcessedFiles(processed);
      console.log('Files processed:', processed);
      
      // Move to review stage
      setCurrentStage('review');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };
  
  const handleFileStatusChange = (id: string, status: 'approved' | 'rejected') => {
    setProcessedFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === id ? { ...file, status } : file
      )
    );
  };
  
  const handleFinalSubmission = async () => {
    const approvedFiles = processedFiles.filter(file => file.status === 'approved');
    const rejectedFiles = processedFiles.filter(file => file.status === 'rejected');
    
    if (approvedFiles.length === 0) {
      alert('Please approve at least one file before final submission.');
      return;
    }
    
    setProcessing(true);
    
    try {
      // Simulate final submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Final submission:', approvedFiles);
      
      // Create submission summary
      const summary = {
        totalFiles: processedFiles.length,
        emailFiles: approvedFiles.filter(file => 
          file.processingResult?.distributionMethod === 'email'
        ).length,
        postFiles: approvedFiles.filter(file => 
          file.processingResult?.distributionMethod === 'post'
        ).length,
        kivraFiles: approvedFiles.filter(file => 
          file.processingResult?.distributionMethod === 'kivra'
        ).length,
        rejectedFiles: rejectedFiles.length
      };
      
      setSubmissionSummary(summary);
      
      // Calculate mock savings in SEK
      const mockSavings = {
        amount: Math.floor(Math.random() * 5000) + 1000, // Random amount between 1000-6000 SEK
        percentage: Math.floor(Math.random() * 30) + 20, // Random percentage between 20-50%
      };
      
      setSavings(mockSavings);
      
      // Move to success stage
      setCurrentStage('success');
    } catch (error) {
      console.error('Final submission failed:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleCancelReview = () => {
    // Go back to upload stage
    setCurrentStage('upload');
    setProcessedFiles([]);
  };
  
  const removeFile = (indexToRemove: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'xlsx':
        return '📊';
      case 'csv':
        return '📋';
      case 'xml':
        return '🔖';
      default:
        return '📁';
    }
  };
  
  const getStatusBadge = (status: 'success' | 'warning' | 'error') => {
    switch(status) {
      case 'success':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Valid
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Warning
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Error
          </span>
        );
    }
  };
  
  // Add a function to get distribution method icon and label
  const getDistributionMethodInfo = (method: 'email' | 'post' | 'kivra') => {
    switch(method) {
      case 'email':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          label: 'Email'
        };
      case 'post':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          label: 'Post'
        };
      case 'kivra':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          label: 'Kivra'
        };
    }
  };
  
  // Add a function to handle approving or rejecting all files in a group
  const handleGroupStatusChange = (distributionMethod: 'email' | 'post' | 'kivra' | 'error', status: 'approved' | 'rejected') => {
    setProcessedFiles(prevFiles => 
      prevFiles.map(file => {
        // Only change files that match the distribution method and aren't errors
        // (unless we're explicitly targeting the error group)
        if (
          (distributionMethod === 'error' && file.processingResult?.validationStatus === 'error') ||
          (distributionMethod !== 'error' && 
           file.processingResult?.distributionMethod === distributionMethod &&
           file.processingResult?.validationStatus !== 'error')
        ) {
          return { ...file, status };
        }
        return file;
      })
    );
  };
  
  // Trigger confetti when step changes to success
  useEffect(() => {
    if (currentStage === 'success' && confettiRef.current) {
      const canvas = confettiRef.current;
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });
      
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentStage]);
  
  // Render the upload stage
  const renderUploadStage = () => (
    <>
      {/* Duplicate Warning Message */}
      {duplicateWarning && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {duplicateWarning}
          </div>
          <button 
            onClick={() => setDuplicateWarning(null)}
            className="text-yellow-700 hover:text-yellow-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Drag and Drop Area */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center bg-white transition-colors cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-blue-300 hover:bg-blue-50'}`}
      >
        <input {...getInputProps()} />
        <div className="text-blue-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <p className="text-lg font-medium text-gray-700">
          {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
        </p>
        <p className="text-sm text-gray-500 mt-1">or</p>
        
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          Browse Files
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Supported formats: PDF, DOCX, XLSX, CSV, XML
        </p>
      </div>
      
      {/* Staging Area */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Files to Upload ({files.length})</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => setFiles([])}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                disabled={uploading || processing}
              >
                Clear All
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || processing}
                className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  uploading || processing
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                }`}
              >
                {uploading ? 'Uploading...' : processing ? 'Processing...' : 'Upload All Files'}
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {files.map((file, index) => (
                <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.type || 'Unknown type'} • {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      disabled={uploading || processing}
                      className={`text-gray-500 hover:text-red-600 transition-colors ${(uploading || processing) ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Upload Progress Indicator */}
          {(uploading || processing) && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {uploading ? 'Uploading files, please wait...' : 'Processing files, please wait...'}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
  
  // Render the review stage
  const renderReviewStage = () => {
    // Group files by distribution method and errors
    const groupedFiles = {
      email: processedFiles.filter(file => 
        file.processingResult?.distributionMethod === 'email' && 
        file.processingResult?.validationStatus !== 'error'
      ),
      post: processedFiles.filter(file => 
        file.processingResult?.distributionMethod === 'post' && 
        file.processingResult?.validationStatus !== 'error'
      ),
      kivra: processedFiles.filter(file => 
        file.processingResult?.distributionMethod === 'kivra' && 
        file.processingResult?.validationStatus !== 'error'
      ),
      error: processedFiles.filter(file => 
        file.processingResult?.validationStatus === 'error'
      )
    };
    
    // Function to render a file list for a specific group
    const renderFileGroup = (files: ProcessedFile[], title: string, distributionMethod: 'email' | 'post' | 'kivra' | 'error', icon?: React.ReactNode) => {
      if (files.length === 0) return null;
      
      return (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              <h3 className="text-lg font-medium text-gray-800">{title} ({files.length})</h3>
            </div>
            
            {/* Group action buttons */}
            {distributionMethod !== 'error' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleGroupStatusChange(distributionMethod, 'approved')}
                  disabled={processing}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
                >
                  Approve All
                </button>
                <button
                  onClick={() => handleGroupStatusChange(distributionMethod, 'rejected')}
                  disabled={processing}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
                >
                  Reject All
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {files.map((file) => (
                <li key={file.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getFileIcon(file.originalName)}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-800">{file.originalName}</p>
                            {file.processingResult && getStatusBadge(file.processingResult.validationStatus)}
                          </div>
                          <p className="text-xs text-gray-500">
                            {file.type || 'Unknown type'} • {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {title !== "Files with Errors" ? (
                          <>
                            <button
                              onClick={() => handleFileStatusChange(file.id, 'approved')}
                              disabled={processing}
                              className={`px-3 py-1 rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors ${
                                file.status === 'approved'
                                  ? 'bg-green-100 text-green-800 ring-2 ring-green-500'
                                  : 'bg-gray-100 text-gray-800 hover:bg-green-50 hover:text-green-700'
                              }`}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleFileStatusChange(file.id, 'rejected')}
                              disabled={processing}
                              className={`px-3 py-1 rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors ${
                                file.status === 'rejected'
                                  ? 'bg-red-100 text-red-800 ring-2 ring-red-500'
                                  : 'bg-gray-100 text-gray-800 hover:bg-red-50 hover:text-red-700'
                              }`}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                            Automatically Rejected
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Processing Results */}
                    {file.processingResult && (
                      <div className="ml-10 pl-3 border-l-2 border-gray-200">
                        {/* Only show validation message if it's an error */}
                        {file.processingResult.validationStatus === 'error' && (
                          <p className="text-sm text-red-600 mb-2">
                            {file.processingResult.validationMessage}
                          </p>
                        )}
                        
                        {/* Download Preview Button */}
                        {file.downloadUrl && (
                          <div>
                            <a 
                              href="/mock_response.pdf" 
                              download={`${file.originalName.split('.')[0]} - preview.pdf`}
                              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download for Preview
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };
    
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Review Processed Files</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleCancelReview}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              disabled={processing}
            >
              Cancel
            </button>
            <button
              onClick={handleFinalSubmission}
              disabled={
                processing || 
                !processedFiles.some(file => file.status === 'approved') ||
                processedFiles.some(file => file.status === 'pending')
              }
              className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                processing || 
                !processedFiles.some(file => file.status === 'approved') ||
                processedFiles.some(file => file.status === 'pending')
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
              }`}
            >
              {processing 
                ? 'Submitting...' 
                : processedFiles.some(file => file.status === 'pending')
                  ? 'All Files Must Be Reviewed'
                  : 'Submit Approved Files'
              }
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Review the processed files below. Approve files that look correct, or reject files with issues.
        </p>
        
        {/* Email Files */}
        {renderFileGroup(
          groupedFiles.email, 
          "Email Distribution", 
          'email',
          getDistributionMethodInfo('email').icon
        )}
        
        {/* Post Files */}
        {renderFileGroup(
          groupedFiles.post, 
          "Postal Distribution", 
          'post',
          getDistributionMethodInfo('post').icon
        )}
        
        {/* Kivra Files */}
        {renderFileGroup(
          groupedFiles.kivra, 
          "Kivra Distribution", 
          'kivra',
          getDistributionMethodInfo('kivra').icon
        )}
        
        {/* Error Files */}
        {renderFileGroup(
          groupedFiles.error, 
          "Files with Errors", 
          'error',
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        
        {/* Processing Indicator */}
        {processing && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">Submitting approved files, please wait...</p>
          </div>
        )}
      </div>
    );
  };
  
  // Render the success stage
  const renderSuccessStage = () => {
    if (!submissionSummary) return null;
    
    return (
      <div className="mt-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-green-800">Submission Successful</h2>
          </div>
          
          <p className="text-green-700 mb-6">
            Your files have been successfully submitted for processing and distribution.
          </p>
          
          {/* Savings Information */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Your Savings</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">Total Saved</p>
                  <p className="text-3xl font-bold text-green-700">{savings.amount} SEK</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">Cost Reduction</p>
                  <p className="text-3xl font-bold text-green-700">{savings.percentage}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submission Summary */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Submission Summary</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-500 font-medium">Total Files</p>
                  <p className="text-2xl font-bold text-blue-700">{submissionSummary.totalFiles}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-500 font-medium">Rejected Files</p>
                  <p className="text-2xl font-bold text-red-700">{submissionSummary.rejectedFiles}</p>
                </div>
              </div>
              
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Distribution Breakdown</h4>
              
              <div className="space-y-4">
                {submissionSummary.emailFiles > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      {getDistributionMethodInfo('email').icon}
                      <span className="ml-2 text-gray-700">Email Distribution</span>
                    </div>
                    <span className="font-medium text-gray-900">{submissionSummary.emailFiles} files</span>
                  </div>
                )}
                
                {submissionSummary.postFiles > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      {getDistributionMethodInfo('post').icon}
                      <span className="ml-2 text-gray-700">Postal Distribution</span>
                    </div>
                    <span className="font-medium text-gray-900">{submissionSummary.postFiles} files</span>
                  </div>
                )}
                
                {submissionSummary.kivraFiles > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      {getDistributionMethodInfo('kivra').icon}
                      <span className="ml-2 text-gray-700">Kivra Distribution</span>
                    </div>
                    <span className="font-medium text-gray-900">{submissionSummary.kivraFiles} files</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setFiles([]);
                setProcessedFiles([]);
                setSubmissionSummary(null);
                setCurrentStage('upload');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Upload More Files
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full">
      {/* Hidden canvas for confetti */}
      <canvas 
        ref={confettiRef} 
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />

      {currentStage === 'upload' 
        ? renderUploadStage() 
        : currentStage === 'review'
          ? renderReviewStage()
          : renderSuccessStage()
      }
    </div>
  );
} 