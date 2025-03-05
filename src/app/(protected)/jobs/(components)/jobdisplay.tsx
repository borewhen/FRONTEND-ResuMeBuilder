"use client";
import { useRouter } from "next/navigation";
import { Job } from "@/lib/app/job/types";

export default function JobDisplay({ job }: { job: Job }) {
    const route = useRouter();
    return (
        <div className="w-full flex px-2 mt-10 hover:cursor-pointer" onClick={() => route.push(`jobs/${job.job_id}`)}>
            <img src={job.company_logo_url} alt="company logo" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
                <div className="font-bold text-dip-100 p-0">{job.job_position}</div>
                <div className="p-0 text-sm">{job.company_name} • {job.job_location}</div>
                <div className="p-0 text-xs text-dip-blk">{job.job_posting_date}</div>
            </div>         
        </div>
    )
}