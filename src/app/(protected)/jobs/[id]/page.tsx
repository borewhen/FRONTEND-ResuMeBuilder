"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import jobdetail from '@/lib/app/job/api/detail';
import { JobDetailResponse } from '@/lib/app/job/types';
import { useCompanyStore } from '@/store/useCompanyStore';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import './style.css';

export default function JobItem() {
    const { id } = useParams();
    const jobId: string = Array.isArray(id) ? id[0] : id || '';
    const [job, setJob] = useState<JobDetailResponse | null>(null);
    const {companyLogo, jobLink} = useCompanyStore();
    const [showAllDescription, setShowAllDescription] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchJobDetail = async () => {
            setLoading(true);
            const fetchedJob = await jobdetail.get(jobId);
            setJob(fetchedJob);
            
            setLoading(false);
        };
        fetchJobDetail();
    }, [])
    return (
        <div className="bg-dip-20 w-full min-h-screen py-8">
            {!loading && 
            <div className='w-[48rem] mx-auto'>
                <div className='w-full shadow-xl bg-white rounded-lg px-4 py-2'>
                    <div className='flex items-center text-sm font-bold'>
                        <img src={companyLogo} className='w-10 h-10 mr-2'/>
                        {job?.company_name}
                    </div>
                    <div className='text-2xl font-bold mb-2 mt-2'>{job?.job_position}</div>
                    <div className='text-sm text-gray-500'>{job?.job_location} • {job?.job_posting_time}</div>
                    <div className='flex mt-2 mb-2'>
                        <Link href={jobLink} target='_' className='border-2 border-dip-60 rounded-full mr-2 px-4 py-2 text-sm hover:bg-dip-60 transition-all'>Apply Here</Link>
                        <Link href={`/jobs/${jobId}/prep`} className='border-2 border-dip-60 rounded-full px-4 py-2 text-sm hover:bg-dip-60 transition-all'>Prepare</Link>
                    </div>
                </div>
                <div className={clsx(showAllDescription? '': 'max-h-72 overflow-hidden', 'relative w-full shadow-xl bg-white rounded-lg px-8 py-4 mt-8')}>
                    {!showAllDescription && <div className='absolute bg-white top-64 h-8 w-full px-0 left-0 text-center items pt-1 shadow-[0px_0px_10px_10px_#ffffff] hover:cursor-pointer font-bold' onClick={()=>setShowAllDescription(true)}>View More</div>}
                    <div className='text-2xl font-bold mb-2'>Description</div>
                    <div className='text-sm' dangerouslySetInnerHTML={{ __html: job?.job_description || ''}}></div>
                    <div className='h-4'></div>
                    {showAllDescription && <div className='absolute bg-dip-40 rounded-b-lg h-8 w-full px-0 left-0 text-center items pt-1 hover:cursor-pointer hover:bg-dip-60 font-bold' onClick={()=>setShowAllDescription(false)}>View Less</div>}
                </div>
                <div className='mt-4 text-2xl font-bold pl-2'>Similar Jobs</div>
                {
                    job?.similar_jobs.slice(0,5).map((j, index) => {
                        return <div key={index} className='w-full shadow-xl bg-white rounded-lg px-4 py-4 mt-2 hover:cursor-pointer' onClick={() => {router.push(`/jobs/${j.job_link.split('/')[5].split('-').slice(-1)[0].split('?')[0]}`); setJob(null)}}>
                            <div className='font-bold text-sm'>{j.job_position}</div>
                            <div className='text-xs'>{j.job_company}</div>
                            <div className='text-xs'>{j.job_location} • {j.job_posting_time}</div>
                        </div>
                    })
                }
            </div>}
        </div>
    )
}