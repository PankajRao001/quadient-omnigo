import Link from "next/link";
import { FileIcon } from "./Icons";
import JobStatusBadge from "./JobStatusBadge";

interface FileItemProps {
    name: string;
    createdAt?: string;
    completedFiles?: number;
    pendingFiles?: number;
    errorFiles?: number;
    totalFiles?: number;
    onView?: string;
    showCounts?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
    name,
    createdAt,
    completedFiles = 0,
    pendingFiles = 0,
    errorFiles = 0,
    totalFiles,
    onView,
    showCounts = true
}) => {
    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('sv-SE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-[#FDF9F8] rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary rounded-xl flex-shrink-0">
                    <FileIcon />
                </div>
                <div>
                    <div className="font-medium text-sm text-black truncate max-md:w-[80%]">{name}</div>
                    {createdAt && (
                        <div className="text-xs text-[#949494]">{formatDate(createdAt)}</div>
                    )}
                    {totalFiles && (
                        <div className="text-xs text-[#949494]">{totalFiles} filer</div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-10 lg:gap-20">
                {showCounts && (
                    <div className="flex space-x-2">
                        {completedFiles > 0 && <JobStatusBadge status="delivered" files={completedFiles} />}
                        {pendingFiles > 0 && <JobStatusBadge status="pending" files={pendingFiles} />}
                        {errorFiles > 0 && <JobStatusBadge status="error" files={errorFiles} />}
                    </div>
                )}

                {onView && (
                    <Link
                        href={onView}
                        className="text-secondary underline underline-offset-2 hover:text-orange-600 font-medium text-sm cursor-pointer whitespace-nowrap"
                    >
                        Visa
                    </Link>
                )}
            </div>
        </div>
    );
};

export default FileItem;