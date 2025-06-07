import { FileStatus } from "@/app/types";
import { DownloadIcon, EmailIcon, PdfIcon } from "./Icons";
import JobStatusBadge from "./JobStatusBadge";

interface DetailedFileItemProps {
    fileName: string;
    fileType?: string;
    fileSize: number;
    status: FileStatus;
    recipient?: string;
    distributionMethod?: 'email' | 'post' | 'kivra';
    deliveredAt?: string;
    processedAt?: string;
    errorMessage?: string;
    onDownload?: () => void;
}

const DetailedFileItem: React.FC<DetailedFileItemProps> = ({
    fileName,
    fileType,
    fileSize,
    status,
    recipient,
    distributionMethod,
    deliveredAt,
    processedAt,
    errorMessage,
    onDownload
}) => {
    // Format file size for display
    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };


    // Get distribution method icon and label
    const getDistributionMethodInfo = (method: string) => {
        switch (method) {
            case 'email':
                return {
                    icon: (
                        <EmailIcon />
                    ),
                    label: 'Email'
                };
            case 'post':
                return {
                    icon: (
                        <img
                            className="w-5 sm:max-w-[22px]"
                            src="/post.webp"
                            alt="post"
                        />
                    ),
                    label: 'Post'
                };
            case 'kivra':
                return {
                    icon: (
                        <img
                            className="max-w-[51px] w-full"
                            src="/kivra-logo.webp"
                            alt="kivra-logo"
                        />
                    ),
                    label: 'Kivra'
                };
            default:
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    ),
                    label: 'Unknown'
                };
        }
    };


    return (
        <div className="py-4 hover:bg-gray-50 border-2 border-[#F8F8F8] transition-colors rounded-xl">
            <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between px-4 lg:ps-8 lg:pe-12">
                    <div className="flex items-center gap-3">
                        <div className="sm:p-3 p-2 rounded-xl bg-conceptual flex items-center justify-center">
                            <PdfIcon />
                        </div>
                        <p className="text-sm font-medium text-gray-900">{fileName}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Status-specific information */}
                        {status === 'delivered' && (
                            <JobStatusBadge status="delivered" />
                        )}

                        {status === 'pending' && (
                            <span className="text-xs bg-[#FFFEF6] text-[#C38022]">
                                Skicka
                            </span>
                        )}

                        {status === 'error' && (
                            <JobStatusBadge status="error" />
                        )}

                        <button onClick={onDownload} className="flex justify-center items-center gap-2 text-black font-medium text-sm cursor-pointer">
                            <DownloadIcon />
                            Hämta fil
                        </button>
                    </div>
                </div>

                {/* Detailed information section */}
                <div className="px-4 lg:ps-8 lg:pe-12 pt-2.5 border-t-2 border-[#F8F8F8] flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                        {recipient && (
                            <div className="flex items-center lg:gap-7 md:gap-5 gap-3">
                                <span className="font-medium mr-1">{getDistributionMethodInfo(distributionMethod ?? '').icon}</span>
                                <span>{getDistributionMethodInfo(distributionMethod ?? '').label}: {recipient}</span>
                            </div>
                        )}

                    </div>

                    {processedAt && status !== 'error' ? (
                        <div className="text-[#73BE44] text-xs">
                            <span className="font-medium">Uppdaterat:</span>
                            <span>{formatDate(processedAt)}</span>
                        </div>
                    ) : null}

                    {status === 'error' && errorMessage && (
                        <div className="text-xs text-red-700">
                            <span className="font-medium">Feldetaljer:</span> {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailedFileItem;
