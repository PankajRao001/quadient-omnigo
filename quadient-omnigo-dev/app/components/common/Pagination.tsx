import React, { useState } from 'react'

interface PaginationProps {
    currentPage?: number
    totalPages?: number
    onPageChange?: (page: number) => void
    maxVisiblePages?: number
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage = 1,
    totalPages = 3,
    onPageChange = () => { },
    maxVisiblePages = 5
}) => {
    const [activePage, setActivePage] = useState<number>(currentPage)

    const handlePageClick = (page: number) => {
        setActivePage(page)
        onPageChange(page)
    }

    const getVisiblePages = (): number[] => {
        const pages: number[] = []
        const startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    return (
        <div className="flex items-center justify-center gap-3 lg:mt-10 mt-6">
            {/* First page if not visible */}
            {visiblePages[0] > 1 && (
                <>
                    <button
                        onClick={() => handlePageClick(1)}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                        1
                    </button>
                    {visiblePages[0] > 2 && (
                        <span className="flex items-center justify-center w-10 h-10 text-gray-400">
                            ...
                        </span>
                    )}
                </>
            )}

            {/* Visible page numbers */}
            {visiblePages.map((page: number) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors font-medium bg-white cursor-pointer  hover:border-gray-400 border-transparent ${page === activePage
                        ? 'text-secondary'
                        : 'text-black hover:bg-gray-50'
                        }`}>
                    {page}
                </button>
            ))}

            {/* Last page if not visible */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className="flex items-center justify-center w-10 h-10 text-gray-400">
                            ...
                        </span>
                    )}
                    <button
                        onClick={() => handlePageClick(totalPages)}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                        {totalPages}
                    </button>
                </>
            )}
        </div>
    )
}

export default Pagination