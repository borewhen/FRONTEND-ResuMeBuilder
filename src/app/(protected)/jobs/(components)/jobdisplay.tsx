"use client";
import { useRouter } from "next/navigation";

interface Job {
    title: string;
    company: string;
    location: string;
    description: string;
    skills: string[];
    id: string;
}

export default function JobDisplay({ job }: { job: Job }) {
    const route = useRouter();
    return (
        <div className="w-full flex px-2 mt-10" onClick={() => route.push(`jobs/${job.id}`)}>
            <div className="w-12 bg-dip-100 h-12"></div>   
            <div className="ml-2">
                <div className="font-bold text-dip-100 p-0">{job.title}</div>
                <div className="p-0 text-sm">{job.company}</div>
            </div>         
        </div>
    )
}