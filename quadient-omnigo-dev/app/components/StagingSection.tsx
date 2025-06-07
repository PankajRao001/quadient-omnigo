import Image from 'next/image';
import Button from './common/Button';
import { Check, Loader, PdfIcon } from './common/Icons';
import { StagedFile } from '../types';

interface StagingSectionProps {
    files: StagedFile[];
    onClose: () => void;
    onUpload: () => void;
    onDeleteFile: (fileId: number) => void;
    isUploading?: boolean;
}

const StagingSection: React.FC<StagingSectionProps> = ({
    files,
    onClose,
    onUpload,
    onDeleteFile,
    isUploading = false
}) => {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (status: StagedFile['status']) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="sm:p-3 p-2 rounded-xl bg-conceptual flex items-center justify-center">
                        <PdfIcon />
                    </div>
                );
            case 'error':
                return (
                    <div className="bg-red-500 rounded-xl sm:p-3 p-2 flex items-center justify-center">
                        <PdfIcon />
                    </div>
                );
            default:
                return (
                    <div className="w-12 h-12 flex items-center justify-center bg-[#FBFBFB] rounded">
                        <Image src="/pdf-icon.png" width={20} height={20} alt='pdf icon' />
                    </div>
                );
        }
    };

    const completedFiles = files.filter(f => f.status === 'completed');
    const progressPercentage = files.length > 0 ? (completedFiles.length / files.length) * 100 : 0;

    return (
        <div className="bg-white rounded-xl sm:rounded-[30px] p-4 sm:p-5 lg:p-6 mt-6 border-2 border-primary">
            {/* Header */}
            <h3 className="font-medium text-black text-lg mb-4">
                {isUploading ? 'Laddar upp filer...' : 'Filer för uppladning'}
            </h3>
            <div className="w-full bg-[#F8F8F8] rounded-full h-2 mb-10">
                <div
                    className="bg-primary h-[5px] rounded-full transition-all duration-300"
                    style={{
                        width: `${progressPercentage}%`
                    }}
                />
                <p className='text-primary mt-1.5 text-xs'>
                    {progressPercentage.toFixed(2)}%
                </p>
            </div>

            {/* File List */}
            <div className="space-y-3 mb-6">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className={`flex items-center justify-between w-full p-3 bg-gray-50 rounded-xl border-2 ${file.status === "completed"
                            ? 'border-conceptual'
                            : file.status === "error"
                                ? 'border-primary'
                                : 'border-[#F8F8F8]'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            {getFileIcon(file.status)}
                            <div>
                                <p className="text-black text-sm font-medium truncate max-w-full max-sm:w-[150px]">
                                    {file.name}
                                </p>
                                <p className="text-gray text-xs">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        {file.status === 'pending' || file.status === 'error' ? (
                            <button
                                onClick={() => onDeleteFile(file.id)}
                                className="w-6 h-6 flex items-center justify-center cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                disabled={isUploading}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        ) : file.status === 'completed' ? (
                            <Check />
                        ) : file.status === "uploading" ? (
                            <div className="animate-spin">
                                <Loader />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-end space-x-3">
                <Button
                    variant="ghost"
                    onClick={onClose}
                    className="px-4 py-2 text-sm"
                    disabled={isUploading}
                >
                    Rensa
                </Button>
                <Button
                    variant="primary"
                    onClick={onUpload}
                    className="px-6 py-2 text-sm"
                    disabled={isUploading}
                >
                    {isUploading ? 'Laddar upp filer...' : 'Ladda upp'}
                </Button>
            </div>
        </div>
    );
};

export default StagingSection;