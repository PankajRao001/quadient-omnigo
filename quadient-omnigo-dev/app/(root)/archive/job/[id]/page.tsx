'use client';
import DetailedFileItem from '@/app/components/common/DetailedFileItem';
import FileItem from '@/app/components/common/FileItem';
import { BackArrow, Loader } from '@/app/components/common/Icons';
import Pagination from '@/app/components/common/Pagination';
import { mockJobHistory } from '@/app/data/mockJobHistory';
import { FileStatus, JobHistory } from '@/app/types';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobHistory | null>(null);
  const [statusFilter, setStatusFilter] = useState<FileStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundJob = mockJobHistory.find(j => j.id === jobId);
    setJob(foundJob || null);
    setLoading(false);
  }, [jobId]);

  const FILTER_OPTIONS = [
    { key: 'all' as const, label: 'All Files' },
    { key: 'delivered' as const, label: 'Delivered' },
    { key: 'pending' as const, label: 'Pending' },
    { key: 'error' as const, label: 'Failed' }
  ];


  // Filter files based on selected status
  const getFilteredFiles = () => {
    if (!job) return [];

    if (statusFilter === 'all') {
      return job.files;
    }

    return job.files.filter(file => file.status === statusFilter);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Loading job details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-black mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Link href="/archive" className="text-black hover:text-primary">
            tillbaka till arkiv
          </Link>
        </div>
      </main>
    );
  }

  const filteredFiles = getFilteredFiles();

  // Define the onDownload handler
  const onDownload = (fileId: string) => {
    console.log(fileId, "fileId")
  };

  console.log(filteredFiles, "filteredFiles")
  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="px-6 my-10 lg:my-16">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-[52px] leading-[100%] font-montserrat text-center font-semibold text-black mb-2">
              {job.jobName}
            </h1>
            <p className="text-[#949494] text-center text-base sm:text-lg lg:text-[22px]">
              Ditt jobb i detalj
            </p>
          </div>
        </div>
        <div className='bg-[#FDF9F8] lg:p-9 md:p-5 p-3 rounded-xl lg:rounded-[35px]'>
          <div className="flex justify-between items-center mb-6">
            <Link href="/archive" className="inline-flex items-center text-base md:text-lg lg:text-xl font-medium gap-3 text-black hover:opacity-80 mb-2">
              <BackArrow />
              tillbaka till arkiv
            </Link>
            <button className="px-4 py-2 text-primary flex items-center gap-3 text-sm transition-colors cursor-pointer">
              <Loader /> Uppdatera
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <FileItem
                name={job.jobName}
                createdAt={job.createdAt}
                completedFiles={job.completedFiles}
                pendingFiles={job.pendingFiles}
                errorFiles={job.errorFiles}
              />

              {/* Tabs */}
              <div className="flex space-x-2 mt-6 mb-4">
                {FILTER_OPTIONS.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setStatusFilter(filter.key)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${statusFilter === filter.key
                      ? 'text-black'
                      : 'text-[#949494]'
                      }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {filteredFiles.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No files match the selected filter.</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-3 sm:p-6 lg:p-10 space-y-6">
                  {filteredFiles.map(file => (
                    <DetailedFileItem
                      key={file.id}
                      fileName={file.fileName}
                      fileType={file.fileType}
                      fileSize={file.fileSize}
                      status={file.status}
                      recipient={file.recipient}
                      distributionMethod={file.distributionMethod}
                      deliveredAt={file.deliveredAt}
                      processedAt={file.processedAt}
                      errorMessage={file.errorMessage}
                      onDownload={() => onDownload?.(file.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
} 