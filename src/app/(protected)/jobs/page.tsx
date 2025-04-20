"use client";

import JobDisplay from "./(components)/jobdisplay";
import { useEffect, useState } from "react";
import scraper from '@/lib/app/job/api/scrape';
import { JobScraperResponse } from "@/lib/app/job/types";
import clsx from "clsx";
import { ourJobList, ourJobList2 } from "./(components)/masterpiece";
import JobDetail from "./(components)/jobDetail";
import JobCardLoading from "./(components)/jobCardLoading";
import 'react-loading-skeleton/dist/skeleton.css'
import JobDetailLoading from "./(components)/jobDetailLoading";

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<JobScraperResponse>([]);
    const [search, setSearch] = useState<string>('software engineer');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            handleSubmit();
        }
    }, [mounted]);

    const handleSubmit = async () => {
        if (!mounted) return;
        
        setLoading(true);
      
        try {
            const data = await scraper.get({
                field: search,
                page: pageNumber
            });
            data[4] = ourJobList;
            data[8] = ourJobList2;
            setJobs(data);
            setSelectedJobId(data.length > 0 ? Number(data[0]?.job_id) : null);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return (
            <div className="bg-white w-full min-h-screen py-8">
                <div className='w-[70rem] mx-auto flex gap-8 mt-[50px]'>
                    <div className="w-[30rem]">
                        <div className='flex gap-6'>
                            <div className='w-[30rem] h-12 bg-gray-200 animate-pulse rounded-md'></div>
                        </div>
                        <div className="w-30 flex flex-col gap-5 mt-12">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <JobCardLoading key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="w-[40rem]">
                        <div className="h-[96px]"></div>
                        <div className="sticky top-10">
                            <JobDetailLoading />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white w-full min-h-screen py-8">
            <div className='w-[70rem] mx-auto flex gap-8 mt-[50px]'>
                <div className="w-[30rem]"> 
                    <div className='flex gap-6'>
                        <input 
                            type="text" 
                            placeholder="Search for jobs or company" 
                            className='w-[30rem] border border-dip-grey rounded-md py-3 px-5 focus:outline-none' 
                            onChange={(e) => setSearch(e.target.value)} 
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            value={search}
                        />
                    </div>
                    <div className="w-30 flex flex-col gap-5 mt-12">
                        {!loading && jobs.length > 0 ? (
                            jobs.map((job, index) => (
                                <JobDisplay 
                                    key={index} 
                                    job={job} 
                                    selectedJobId={selectedJobId} 
                                    setSelectedJobId={setSelectedJobId}
                                />
                            ))
                        ) : (
                            <>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <JobCardLoading key={index} />
                                ))}
                            </>
                        )}
                        {!loading && jobs.length > 0 ? (
                            <div className="flex w-36 mx-auto justify-between mt-4">
                                {[1,2,3,4,5].map((page, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => {
                                            if(page !== pageNumber) {
                                                setPageNumber(page); 
                                                handleSubmit();
                                            }
                                        }} 
                                        className={clsx(
                                            page === pageNumber ? "bg-slate-200" : "", 
                                            "rounded-full w-8 h-8 flex items-center justify-center hover:cursor-pointer"
                                        )}
                                    >
                                        {page}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="w-[40rem]">
                    <div className="h-[96px]"></div>
                    <div className="sticky top-10">
                        {selectedJobId ? (
                            <JobDetail selectedJobId={selectedJobId} />
                        ) : (
                            <JobDetailLoading />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
