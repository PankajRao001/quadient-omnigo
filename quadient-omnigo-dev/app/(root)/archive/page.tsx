'use client';
import FileItem from '@/app/components/common/FileItem';
import { FileIcon, Loader } from '@/app/components/common/Icons';
import Pagination from '@/app/components/common/Pagination';
import TabFilter from '@/app/components/TabFilter';
import { mockJobHistory } from '@/app/data/mockJobHistory';
import { JobHistory } from '@/app/types';
import Link from 'next/link';
import { useState } from 'react';

interface FilterState {
  categories: string[];
  dateRange: string;
  isOpen: boolean;
}

export default function ArchivePage() {
  const [jobs] = useState<JobHistory[]>(mockJobHistory);
  const [activeTab, setActiveTab] = useState<string>('Känt');
  const [filters, setFilters] = useState<FilterState>({
    categories: ['PII', 'Phorms'],
    dateRange: '15 april 2024 - 15 april 2024',
    isOpen: false
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // You can add filtering logic based on tab here
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // You can add filtering logic based on filters here
  };

  // Filter jobs based on active tab
  const getFilteredJobs = () => {
    // This is where you would implement the actual filtering logic
    // For now, returning all jobs
    return jobs;
  };

  const filteredJobs = getFilteredJobs();

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="px-6 my-10 lg:my-16">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-[52px] leading-[100%] font-montserrat text-center font-semibold text-black mb-2">
              Arkiv
            </h1>
            <p className="text-[#949494] text-center text-base sm:text-lg lg:text-[22px]">
              Följ status på dina skickade filer
            </p>
          </div>
        </div>
        <div className='bg-[#FDF9F8] lg:p-9 md:p-5 p-3 rounded-xl lg:rounded-[35px]'>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-black">Jobb</h2>
            <button className="px-4 py-2 text-primary flex items-center gap-3 text-sm transition-colors cursor-pointer">
              <Loader /> Uppdatera
            </button>
          </div>

          {/* Tab Filter Component */}
          <TabFilter
            onTabChange={handleTabChange}
            onFilterChange={handleFilterChange}
            initialTab="Känt"
          />

          <div className="overflow-x-auto">
            {filteredJobs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No jobs found. Start by uploading some files.</p>
              </div>
            ) : (
              <div className="space-y-3 min-w-[800px]">
                {filteredJobs.map(job => (
                  <FileItem
                    name={job.jobName}
                    createdAt={job.createdAt}
                    completedFiles={job.completedFiles}
                    pendingFiles={job.pendingFiles}
                    errorFiles={job.errorFiles}
                    onView={`/archive/job/${job.id}`}
                  />
                ))}
              </div>
            )}
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
}