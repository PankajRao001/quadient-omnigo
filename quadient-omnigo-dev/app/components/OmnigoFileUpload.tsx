"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileUploadArea from "./common/FileUploadArea";
import RecentUploads from "./RecentUploads";
import ResumeSection from "./ResumeSection";
import StagingSection from "./StagingSection";
import { ResumeJob, StagedFile } from "../types";

type CurrentView = 'main' | 'staging';

const OmnigoFileUpload: React.FC = () => {
    const [currentView, setCurrentView] = useState<CurrentView>('main');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
    const router = useRouter();

    const [resumeJobs] = useState<ResumeJob[]>([
        {
            id: 1,
            name: 'Jobb 4',
            createdDate: '24 feb 2024 kl. 14:00',
            expiryDate: '26 dec 2024 kl. 20:00',
            fileCount: 15,
            status: 'paused'
        }
    ]);

    const handleFileSelect = (newFiles: File[], replace: boolean = true): void => {
        if (replace) {
            const filesWithData: StagedFile[] = newFiles.map((file, index) => ({
                id: Date.now() + index,
                name: file.name,
                size: file.size,
                file: file,
                status: 'pending'
            }));
            setStagedFiles(filesWithData);
        } else {
            const filesWithData: StagedFile[] = newFiles.map((file, index) => ({
                id: Date.now() + index + stagedFiles.length,
                name: file.name,
                size: file.size,
                file: file,
                status: 'pending'
            }));
            setStagedFiles(prev => [...prev, ...filesWithData]);
        }
        setCurrentView('staging');
    };

    const handleResumeJob = (job: ResumeJob): void => {
        console.log('Resuming job:', job);
    };

    const handleDeleteJob = (jobId: number): void => {
        console.log('Deleting job:', jobId);
    };

    const handleUploadFiles = (): void => {
        if (isUploaded) {
            router.push('/verify');
            return;
        }
        setIsUploading(true);

        // Start uploading all pending files
        setStagedFiles(prev =>
            prev.map(file =>
                file.status === 'pending' ? { ...file, status: 'uploading' } : file
            )
        );

        // Simulate upload process
        stagedFiles.forEach((file, index) => {
            if (file.status === 'pending') {
                setTimeout(() => {
                    setStagedFiles(prev =>
                        prev.map(f =>
                            f.id === file.id
                                ? { ...f, status: Math.random() > 0.2 ? 'completed' : 'error' }
                                : f
                        )
                    );

                    // Check if all files are processed
                    if (index === stagedFiles.filter(f => f.status === 'pending').length - 1) {
                        setTimeout(() => {
                            setIsUploading(false);
                            setIsUploaded(true);
                        }, 500);
                    }
                }, (index + 1) * 1000 + Math.random() * 2000);
            }
        });
    };

    const handleDeleteFile = (fileId: number): void => {
        setStagedFiles(prev => prev.filter(file => file.id !== fileId));
        if (stagedFiles.length === 1) {
            setCurrentView('main');
        }
    };

    const handleClose = (): void => {
        setCurrentView('main');
        setStagedFiles([]);
        setIsUploading(false);
    };

    useEffect(() => {
        router.prefetch('/verify');
    }, [router]);

    return (
        <section className="pt-20 relative">
            <Image
                src="/quad-tree.png"
                height={273}
                width={322}
                alt="quad tree"
                className="absolute top-5 xl:top-10 right-0 max-w-[100px] h-[150px] lg:max-w-[200px] lg:h-[273px] max-sm:opacity-45"
            />
            <div className="container xl:max-w-[1212px] mx-auto px-4 relative z-20">
                <div className="px-6 mb-10 lg:mb-16">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-[52px] leading-[100%] font-montserrat text-center font-semibold text-black mb-2">
                            Automatisera dina utskick
                        </h1>
                        <p className="text-[#949494] text-center text-base sm:text-lg lg:text-[22px]">
                            Med Omnigo distribuerar du med ett klick väg alla dina dokument
                        </p>
                    </div>
                </div>

                <div className="mx-auto relative z-10">
                    {/* Resume Section */}
                    <div className="shadow-[0px_23px_52px_0px_#0000001A] mb-[35px] rounded-[35px] p-3 sm:p-6 lg:p-[33px]">
                        <ResumeSection
                            resumeJobs={resumeJobs}
                            onResume={handleResumeJob}
                            onDelete={handleDeleteJob}
                            onClose={() => console.log('Close resume section')}
                        />
                    </div>

                    <div className="bg-[#FDF9F8] lg:p-9 md:p-5 p-3 rounded-[35px]">
                        {/* Upload Section */}
                        <FileUploadArea
                            onFileSelect={handleFileSelect}
                            isLoading={isLoading}
                            existingFiles={stagedFiles}
                            isUploading={isUploading}
                        />

                        {/* Staging Section */}
                        {currentView === 'staging' && stagedFiles.length > 0 && (
                            <StagingSection
                                files={stagedFiles}
                                onClose={handleClose}
                                onUpload={handleUploadFiles}
                                onDeleteFile={handleDeleteFile}
                                isUploading={isUploading}
                            />
                        )}

                        <RecentUploads />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OmnigoFileUpload;