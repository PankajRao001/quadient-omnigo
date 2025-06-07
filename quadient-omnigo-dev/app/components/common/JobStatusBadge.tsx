import { FileStatus } from '@/app/types';
import React from 'react';

interface StatusConfig {
    color: string;
    text: string;
}

interface JobStatusBadgeProps {
    status: FileStatus;
    files?: number
}

const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status, files }) => {
    const statusConfig: Record<FileStatus, StatusConfig> = {
        pending: { color: 'bg-[#FFFEF6] text-[#C38022]', text: 'väntande' },
        delivered: { color: 'bg-toxicLatte text-coolGreen', text: 'levererade' },
        error: { color: 'bg-roseMochi text-[#C32222]', text: 'misslyckade' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${config.color}`}>
            {files} {config.text}
        </span>
    );
};

export default JobStatusBadge;