"use client";

import JobDisplay from "./(components)/jobdisplay";
import { useEffect, useState } from "react";
import scraper from '@/lib/app/job/api/scrape';
import { JobScraperResponse } from "@/lib/app/job/types";
import clsx from "clsx";
import { Search, SlidersHorizontal } from "lucide-react";
import JobDetail from "./(components)/jobDetail";

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<JobScraperResponse>([]);
    const [search, setSearch] = useState<string>('software engineer');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

    useEffect(() => {
        handleSubmit()
    }, [])

    const handleSubmit = async () => {
        setLoading(true);
        const data = await scraper.get({
            field: search,
            page: pageNumber
        })
        setJobs(data);
        if (!selectedJobId) {
            setSelectedJobId(data[0].job_id)
        }
        setLoading(false);
    }

    return (
        <div className="bg-white w-full min-h-screen py-8">
            <div className='w-[80rem] mx-auto flex gap-12 mt-[50px]'>
                <div className="w-[30rem]"> 
                    <div className='w-70 flex gap-6'>
                        <input type="text" placeholder="Search for jobs or company" className='w-[22rem] border border-dip-grey rounded-md py-3 px-5 focus:outline-none' onChange={(e)=>(setSearch(e.target.value))} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            handleSubmit();
                            }
                        }}/>
                        <button className="border border-dip-grey w-14 flex items-center justify-center">
                            <SlidersHorizontal className="text-gray-600 w-6 h-6" />
                        </button>
                    </div>
                    <div className="w-30 flex flex-col gap-5 mt-12">
                        {jobs.length && !loading? jobs.map((job, index) => (<JobDisplay key={index} job={job} selectedJobId={selectedJobId} setSelectedJobId={setSelectedJobId}/>)) : loading? <div className="text-center">Loading...</div> : <div className="text-center">No jobs found</div>}
                        {jobs.length?<div className="flex w-36 mx-auto justify-between mt-4">
                            {[1,2,3,4,5].map((page, index) => (
                                <div key={index} onClick={()=>{if(page!==pageNumber){setPageNumber(page); handleSubmit()}}} className={clsx(page===pageNumber?"bg-slate-200":"", "rounded-full w-8 h-8 flex items-center justify-center hover:cursor-pointer")}>
                                    {page}
                                </div>
                            ))}
                        </div> : ""}
                    </div>
                </div>
                <div className="w-[40rem]">
                    <div className="sticky top-10">
                        {selectedJobId ? <JobDetail selectedJobId={selectedJobId} /> : <div className="text-gray-500">Select a job to see details</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
