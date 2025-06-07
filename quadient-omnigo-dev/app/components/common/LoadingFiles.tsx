import React from 'react';
import { Check, Loader } from './Icons';

// Type definitions
interface LoadingFile {
    name: string;
    status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface LoadingFilesProps {
    files: LoadingFile[];
}

const LoadingFiles: React.FC<LoadingFilesProps> = ({ files }) => (
    <div className="space-y-3">
        <h3 className="font-medium text-gray-900 mb-3">Laddar upp filer...</h3>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
        {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        {file.status === 'completed' ? <Check /> : <Loader />}
                    </div>
                    <span className="font-medium text-gray-900">{file.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    {file.status === 'completed' ? (
                        <span className="text-green-600 text-sm">✓</span>
                    ) : (
                        <span className="text-orange-600 text-sm animate-pulse">○</span>
                    )}
                </div>
            </div>
        ))}
        <button className="w-full mt-4 px-4 py-2 text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50 transition-colors">
            Laddar upp filer...
        </button>
    </div>
);

export default LoadingFiles;