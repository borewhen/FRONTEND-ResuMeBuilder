"use client";

import JobDisplay from "./(components)/jobdisplay";
import { useState } from "react";
import scraper from '@/lib/app/job/api/scrape';
import { JobScraperResponse } from "@/lib/app/job/types";
import clsx from "clsx";

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<JobScraperResponse>([]);
    const [search, setSearch] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        const data = await scraper.get({
            field: search,
            page: pageNumber
        })
        setJobs(data);
        setLoading(false);
    }

    return (
        <div className="bg-dip-20 w-full min-h-screen py-8">
            <div className='w-[56rem] mx-auto flex justify-between'>
                <div className='w-64'>
                    <div className='w-full bg-white shadow-xl rounded-lg py-2 px-4'>
                        <h2 className='text-lg font-bold'>Your Applied Jobs</h2>
                        <div className='text-gray-600 italic text-sm mt-4'>No jobs applied</div>
                        <div className='w-full bg-dip-40 rounded-full text-center mt-4 mb-2 text-sm py-1 font-semibold text-dip-blk hover:bg-dip-60'>View All</div>
                    </div>
                    <div className='w-full bg-white shadow-xl rounded-lg mt-8 py-2 px-4 font-bold text-lg'>
                        <h2>Preferences</h2>
                    </div>
                </div>
                <div className='w-[36rem] bg-white shadow-xl rounded-xl py-4 px-4 min-h-0'>
                    <form className="flex justify-between" onSubmit={(e) => (e.preventDefault())}>
                        <input type="text" placeholder="Search for jobs" className='w-4/5 bg-dip-20 rounded-full py-2 px-4 mb-4 focus:outline-none' onChange={(e)=>(setSearch(e.target.value))}/>
                        <button className=" bg-dip-100 rounded-full py-2 px-6 text-white font-bold h-10" onClick={()=>{setPageNumber(1); handleSubmit()}}>Search</button>
                    </form>
                    {jobs.length && !loading? jobs.map((job, index) => (<JobDisplay key={index} job={job} />)) : loading? <div className="text-center">Loading...</div> : <div className="text-center">No jobs found</div>}
                    {jobs.length?<div className="flex w-36 mx-auto justify-between mt-4">
                        {[1,2,3,4,5].map((page, index) => (
                            <div key={index} onClick={()=>{if(page!==pageNumber){setPageNumber(page); handleSubmit()}}} className={clsx(page===pageNumber?"bg-slate-200":"", "rounded-full w-8 h-8 flex items-center justify-center hover:cursor-pointer")}>
                                {page}
                            </div>
                        ))}
                    </div> : ""}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
