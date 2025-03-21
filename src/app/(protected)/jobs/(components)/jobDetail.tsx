"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import jobdetail from '@/lib/app/job/api/detail';
import { JobDetailResponse } from '@/lib/app/job/types';
import { useCompanyStore } from '@/store/useCompanyStore';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


export default function JobDetail({ selectedJobId } : { selectedJobId: number | null}) {
    console.log(selectedJobId)
    const [job, setJob] = useState<JobDetailResponse | null>(null);
    const {companyLogo, jobLink} = useCompanyStore();
    const [showAllDescription, setShowAllDescription] = useState(false);
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState<string | null>(null)
    const [descriptionLoading, setDescriptionLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchJobDetail = async () => {
            setLoading(true);
            const fetchedJob = await jobdetail.get(selectedJobId);
            setJob(fetchedJob);
            
            setLoading(false);
        };

        const fetchDescription = async () => {
            setDescriptionLoading(true);
            const description = await jobdetail.getDescription(selectedJobId);
            setDescription(description)
            setDescriptionLoading(false);
        }

        fetchJobDetail();
        fetchDescription();
    }, [selectedJobId])


    console.log(description)
    return (
        <div className="w-full min-h-screen">
            <div className='w-[48rem] mx-auto'>
                <div className='w-full shadow-xl bg-white rounded-lg px-4 py-2'>
                    {
                        !loading ? (
                            <>
                                <div className='flex items-center text-sm font-bold'>
                                    <img src={companyLogo} className='w-10 h-10 mr-2' alt='Company Logo' />
                                    {job?.company_name}
                                </div>
                                <div className='text-2xl font-bold mb-2 mt-2'>{job?.job_position}</div>
                                <div className='text-sm text-gray-500'>
                                    {job?.job_location} • {job?.job_posting_time}
                                </div>
                                <div className='flex mt-2 mb-2'>
                                    <Link href={jobLink} target='_blank' className='w-[105px] border-2 border-dip-grey rounded-full mr-2 px-4 py-2 text-sm hover:border-dip-purple transition-all text-center'>
                                        Apply Here
                                    </Link>
                                    <Link href={`/jobs/${selectedJobId}/prep`} className='w-[105px] border-2 border-dip-grey rounded-full px-4 py-2 text-sm hover:border-dip-purple transition-all text-center'>
                                        Prepare
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='flex items-center gap-3'>
                                    <Skeleton count={1} circle width={30} height={30}/>
                                    <Skeleton count={1} width={150} height={20}/>
                                </div>
                                
                                <div className='mb-2 mt-2'>
                                    <Skeleton count={1} height={30}/>
                                </div>
                                <div className='text-sm text-gray-500'>
                                    <Skeleton count={1} height={15} width={350}/>
                                </div>
                                <div className='flex mt-2 mb-2 gap-2'>
                                    <Skeleton count={1} height={35} width={105} borderRadius="0.95rem"/>
                                    <Skeleton count={1} height={35} width={105} borderRadius="0.95rem"/>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className={clsx(showAllDescription? '': 'max-h-[480px] overflow-hidden', 'relative w-full shadow-xl bg-white rounded-lg px-8 py-4 mt-8')}>
                    {!showAllDescription && <div className='absolute bg-white top-[440px] h-8 w-full px-0 left-0 text-center items pt-1 shadow-[0px_0px_10px_10px_#ffffff] hover:cursor-pointer font-bold' onClick={()=>setShowAllDescription(true)}>View More</div>}
                    <div className='text-2xl font-bold mb-2'>Description</div>
                    {
                        !descriptionLoading ? (
                            <div className='text-sm' dangerouslySetInnerHTML={{ __html: description || ''}}></div>
                        ): (
                            <div>
                                <Skeleton count={1} height={15} width={150}/>
                                <Skeleton count={1} height={15} />
                                <Skeleton count={1} height={15} width={400}/>
                                <Skeleton count={1} height={15} width={600}/>
                                <Skeleton count={2} height={15} />
                                <Skeleton count={1} height={15} width={300}/>
                            </div>
                        )
                    }   
                    <div className='h-4'></div>
                    {showAllDescription && <div className='absolute bg-[#e5e7eb] rounded-b-lg h-8 w-full px-0 left-0 text-center items pt-1 hover:cursor-pointer font-bold' onClick={()=>setShowAllDescription(false)}>View Less</div>}
                </div>
            </div>
        </div>
    )
}