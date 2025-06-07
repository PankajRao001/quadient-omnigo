"use client"
import { useRouter } from 'next/navigation'
import Button from './common/Button'
import FileItem from './common/FileItem'
import { recentJobs } from './common/Helper'

const RecentUploads = () => {
    const router = useRouter()
    return (
        <div className="space-y-6 bg-white mt-6 rounded-[30px] p-4 sm:p-5 lg:p-9">
            {/* Recent Uploads */}
            <div>
                <h3 className="font-medium text-black mb-5">Senaste uppladdningar</h3>
                <div className="space-y-3">
                    {recentJobs.map((job) => (
                        <FileItem
                            key={job.id}
                            name={job.name}
                            totalFiles={job.totalFiles}
                            onView={`/archive/job/${job.id}`}
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-5 lg:mt-[33px]">
                    <Button onClick={() => router.push("/archive")} variant="outline">
                        Se alla uppladdningar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RecentUploads