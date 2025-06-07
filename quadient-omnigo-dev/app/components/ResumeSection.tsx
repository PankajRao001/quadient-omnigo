import { useState } from 'react';
import Button from './common/Button';
import { ResumeJob } from '../types';

interface ResumeSectionProps {
    resumeJobs?: ResumeJob[];
    onResume: (job: ResumeJob) => void;
    onDelete: (jobId: number) => void;
    onClose: () => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
    resumeJobs = [],
    onResume,
    onDelete,
    onClose
}) => {
    const [selectedJob, setSelectedJob] = useState<ResumeJob | null>(null);

    const handleResumeJob = (job: ResumeJob): void => {
        setSelectedJob(job);
        onResume(job);
    };

    const handleDeleteJob = (jobId: number): void => {
        if (window.confirm('Är du säker på att du vill ta bort detta jobb?')) {
            onDelete(jobId);
        }
    };

    // Don't show section if no jobs to resume
    if (!resumeJobs || resumeJobs.length === 0) {
        return null;
    }

    return (
        <div className="bg-white border-5 border-[#F8F8F8] rounded-xl sm:rounded-[30px] p-3 sm:p-4 md:p-5 lg:p-6 mb-6">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-11 mb-4 sm:mb-5">
                <h3 className='text-conceptual text-sm sm:text-base md:text-lg lg:text-xl font-medium'>
                    Återuppta jobb
                </h3>
                <button
                    onClick={onClose}
                    className='text-black text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-red-500 transition-colors self-start sm:self-auto cursor-pointer'
                >
                    Stäng
                </button>
            </div>

            {/* Job List */}
            <div className="space-y-3">
                {resumeJobs.map((job) => (
                    <div
                        key={job.id}
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 md:p-5 rounded-xl cursor-pointer transition-colors duration-300 ${selectedJob?.id === job.id
                                ? 'bg-orange-100 border-2 border-orange-300'
                                : 'bg-blueHijab hover:bg-blue-50'
                            }`}
                    >
                        {/* Job Info Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-5 lg:gap-[75px] mb-3 sm:mb-0">
                            <div className="font-medium text-sm md:text-base text-black">
                                {job.name}
                            </div>
                            <div className="font-medium text-xs sm:text-xs md:text-sm text-gray">
                                {job.createdDate}
                            </div>
                        </div>

                        {/* Expiry and Action Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                            {/* Expiry Info */}
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="font-medium text-xs sm:text-xs md:text-sm text-black">
                                    Löper ut:
                                </div>
                                <div className="font-medium text-xs sm:text-xs md:text-sm text-gray">
                                    {job.expiryDate}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end sm:justify-start mt-2 sm:mt-0">
                                <Button
                                    variant='primary'
                                    className='!text-xs sm:!text-xs md:!text-sm !py-2 !px-4 sm:!px-5 md:!px-[20px] w-full sm:w-auto'
                                    onClick={() => handleResumeJob(job)}
                                >
                                    {job.status === 'paused' ? 'Återuppta' : 'Fortsätt'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeSection;