"use client"
import { useState } from 'react';
import { EmailIcon } from '../common/Icons';
import VerifyFileCard from './VerifyFileCard';
import Button from '../common/Button';

interface ReviewFileCardProps {
    files: any[]; // Replace 'any' with the actual file type if available
    title: string;
}

const ReviewFileCard = ({ files, title }: ReviewFileCardProps) => {
    const [showAll, setShowAll] = useState(false);

    const visibleFiles = showAll ? files : files.slice(0, 3);

    return (
        <div className="bg-white border-[#F8F8F8] border-[5px] py-5 md:py-10 px-4 sm:px-10 md:px-[30px] lg:px-[55px] rounded-[30px] mt-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4 w-full pb-4">
                <div className="flex justify-center items-center gap-3">
                    {title === "Digital Brevlåda" ? (
                        <img
                            className="max-w-[51px] w-full"
                            src="/kivra-logo.webp"
                            alt="kivra-logo"
                        />
                    ) : title === 'Email' ? (
                        <EmailIcon />
                    ) : (
                        <img
                            className="w-5 sm:max-w-[22px]"
                            src="/post.webp"
                            alt="post"
                        />
                    )}
                    <h3 className="text-lg sm:text-xl md:text-[25px] font-medium font-montserrat text-black">
                        {title}
                    </h3>
                </div>
                <Button variant='secondary' size="sm">
                    Godkänn alla
                </Button>
            </div>

            <div className="space-y-3">
                {visibleFiles.map((file, index) => (
                    <VerifyFileCard file={file} key={index} />
                ))}
            </div>

            {files.length > 3 && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-purple-600 font-medium text-sm cursor-pointer"
                    >
                        {showAll ? 'Visa färre...' : 'Visa fler...'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewFileCard;
