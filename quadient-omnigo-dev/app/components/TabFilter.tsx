'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DropdownIcon, Filter } from './common/Icons';
import Button from './common/Button';
import Image from 'next/image';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface TabFilterProps {
    onTabChange?: (tab: string) => void;
    onFilterChange?: (filters: FilterState) => void;
    initialTab?: string;
}

interface FilterState {
    categories: string[];
    dateRange: string;
    isOpen: boolean;
    fileName: string;
    selectedFilter: string;
}

const TabFilter: React.FC<TabFilterProps> = ({
    onTabChange,
    onFilterChange,
    initialTab = 'Känt'
}) => {
    const [activeTab, setActiveTab] = useState<string>(initialTab);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['PII', 'Phorms']);
    const [fileName, setFileName] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('Fil');

    const [dateRange, setDateRange] = useState<any>([
        {
            startDate: new Date('2024-04-12'),
            endDate: new Date('2024-04-12'),
            key: 'selection'
        }
    ]);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const dateRef = useRef<HTMLDivElement>(null);

    const tabs = ['Känt', 'Vantar', 'Misslyckad'];
    const filterOptions = ['Fil', 'Jobb', 'Status'];

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    const getFormattedDateRange = () => {
        const formatDate = (date: Date) =>
            date.toLocaleDateString('sv-SE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        return `${formatDate(dateRange[0].startDate)} → ${formatDate(dateRange[0].endDate)}`;
    };

    const toggleFilter = () => {
        const newState = !isFilterOpen;
        setIsFilterOpen(newState);
        onFilterChange?.({
            categories: selectedCategories,
            dateRange: getFormattedDateRange(),
            isOpen: newState,
            fileName,
            selectedFilter
        });
    };

    const applyFilters = () => {
        onFilterChange?.({
            categories: selectedCategories,
            dateRange: getFormattedDateRange(),
            isOpen: isFilterOpen,
            fileName,
            selectedFilter
        });
    };

    // Close date picker on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
                setShowDatePicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full">
            {/* Tab and Filter Section */}
            <div className="flex items-center sm:justify-between flex-wrap gap-2 justify-end mb-2">
                <div className="flex items-center space-x-2 overflow-auto max-sm:w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${activeTab === tab
                                ? 'bg-[#4CAF50] text-white border-transparent'
                                : 'bg-white text-black border-[#EDEDED] hover:bg-gray-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <button
                        onClick={toggleFilter}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${isFilterOpen
                            ? 'text-primary'
                            : 'text-[#949494]'
                            }`}
                    >
                        <Filter color={isFilterOpen ? '#FF4200' : "#949494"} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <div className="rounded-xl mb-4 relative">
                    <Image src="/filter-bg.png" alt="filter-bg" fill className='w-full absolute !-top-[20px] !h-[103px] max-md:hidden' unoptimized />
                    <Image src="/filter-bg-md.png" alt="filter-bg" fill className='w-full absolute !-top-[16px] !h-[190px] sm:!h-[138px] md:hidden' unoptimized />
                    <div className="flex md:items-center sm:items-start max-sm:flex-col justify-between relative z-10 gap-4 p-4">
                        <div className="flex sm:items-center gap-3 md:gap-5 lg:gap-8 max-md:flex-col w-full">
                            <div className='flex items-center gap-3 w-full'>
                                {/* Filter select and filename input */}
                                <div className="relative border-[#F3F3F3] border rounded-sm">
                                    <select id='file-type'
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}
                                        className='px-3 pl-8 rounded-sm focus:outline-none focus:border-[#FF4200] appearance-none bg-white cursor-pointer h-[35px]'
                                    >
                                        {filterOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <DropdownIcon className="absolute size-2 left-2.5 top-0 mt-3.5" />
                                </div>

                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    className='border border-[#F3F3F3] rounded-sm p-2.5 focus:outline-none focus:border-[#FF4200] w-full lg:w-[300px] h-[35px]'
                                    placeholder='Filnamn...'
                                />
                            </div>

                            {/* Date Range */}
                            <div className="flex relative z-50 items-center gap-5 w-full" ref={dateRef}>
                                <span className="text-sm text-black">Datum</span>
                                <input
                                    readOnly
                                    value={getFormattedDateRange()}
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                    className="border border-[#F3F3F3] rounded-sm px-3 py-2.5 md:w-[260px] w-full cursor-pointer text-sm"
                                />
                                {showDatePicker && (
                                    <div className="absolute top-full mt-2 z-50 shadow-lg border border-gray-200 rounded-md bg-white">
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDateRange([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={dateRange}
                                            rangeColors={["#FF4200"]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Filter Button */}
                        <Button variant='primary' size='sm' onClick={applyFilters}>
                            Filtrera
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabFilter;
