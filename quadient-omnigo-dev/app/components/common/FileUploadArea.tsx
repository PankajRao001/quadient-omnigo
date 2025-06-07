import React, { useRef, useState } from 'react';
import Button from './Button';

// Type definitions
interface ExistingFile {
    id: number;
    name: string;
    size: number;
    file: File;
    status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface FileUploadAreaProps {
    onFileSelect: (files: File[], replace?: boolean) => void;
    isLoading?: boolean;
    existingFiles?: ExistingFile[];
    isUploading?: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
    onFileSelect,
    isLoading = false,
    existingFiles = [],
    isUploading = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleButtonClick = (): void => {
        if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (isUploading) return;

        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            const newFiles = files.filter(newFile =>
                !existingFiles.some(existingFile =>
                    existingFile.name === newFile.name && existingFile.size === newFile.size
                )
            );

            if (newFiles.length > 0) {
                onFileSelect(newFiles, false);
            } else {
                alert('Dessa filer är redan tillagda.');
            }
        }
        event.target.value = '';
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setIsDragOver(false);

        if (isUploading) return;

        const files = Array.from(event.dataTransfer.files);
        const pdfFiles = files.filter(file => file.type === 'application/pdf');

        if (pdfFiles.length > 0) {
            const newFiles = pdfFiles.filter(newFile =>
                !existingFiles.some(existingFile =>
                    existingFile.name === newFile.name && existingFile.size === newFile.size
                )
            );

            if (newFiles.length > 0) {
                onFileSelect(newFiles, false);
            } else {
                alert('Dessa filer är redan tillagda.');
            }
        } else if (files.length > 0) {
            alert('Endast PDF-filer stöds.');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        if (!isUploading) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setIsDragOver(false);
    };

    return (
        <div
            className={`border-2 border-dashed rounded-[30px] px-6 py-12 text-center lg:h-[408px] flex flex-col items-center justify-center transition-colors duration-200 ${isUploading
                ? 'border-[#B8B8B8] bg-[#F8F8F8] cursor-not-allowed'
                : isDragOver
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-orange-300 bg-[#FFF6F3]'
                }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="md:space-y-4 space-y-2">
                <p className="text-black text-base sm:text-lg lg:text-2xl">
                    Dra & släpp dina filer här
                </p>
                <p className="text-black text-base sm:text-lg lg:text-2xl">eller</p>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,application/pdf"
                    multiple
                    className="hidden"
                    disabled={isLoading || isUploading}
                />

                <Button
                    variant='primary'
                    onClick={handleButtonClick}
                    disabled={isLoading || isUploading}
                >
                    Välj filer från din enhet
                </Button>
                <p className={`text-base font-medium ${isUploading ? 'text-black' : 'text-primary'}`}>
                    Filformat som stöds: PDF
                </p>
            </div>
        </div>
    );
};

export default FileUploadArea;