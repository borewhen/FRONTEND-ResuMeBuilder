"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'


const tmpJob = {
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Remote",
    description: "Work on both frontend and backend development for web applications.",
    skills: ["React", "Node.js", "GraphQL", "TypeScript"],
    id: "10",
    link: 'https://www.innovatetech.com',
}

export default function JobItem() {
    const jobId = useParams().id;
    // request job detail to the backend
    return (
        <div className="bg-dip-20 w-full min-h-screen py-8">
            <div className='w-[48rem] mx-auto'>
                <div className='w-full shadow-xl bg-white rounded-lg px-4 py-2'>
                    <div className='flex items-center text-sm font-bold'>
                        <img src='/logo.avif' className='w-12 h-12 mr-2'/>
                        {tmpJob.company}
                    </div>
                    <div className='text-2xl font-bold mb-2 mt-2'>{tmpJob.title}</div>
                    <div className='text-sm text-gray-500'>{tmpJob.location}</div>
                    <div className='flex mt-2 mb-2'>
                        <Link href={tmpJob.link} target='_' className='border-2 rounded-full mr-2 px-4 py-2 text-sm hover:bg-dip-60 transition-all'>Apply Here</Link>
                        <Link href={`/jobs/${tmpJob.id}/prep`} className='border-2 rounded-full px-4 py-2 text-sm hover:bg-dip-60 transition-all'>Prepare</Link>
                    </div>
                    
                </div>
                <div className='w-full shadow-xl bg-white rounded-lg px-4 py-4 mt-8'>
                    <div className='text-2xl font-bold'>Description</div>
                    <div>{tmpJob.description}</div>
                </div>
            </div>
        </div>
    )
}