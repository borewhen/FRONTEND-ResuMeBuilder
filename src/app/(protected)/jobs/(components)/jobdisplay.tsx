"use client";
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/store/useCompanyStore";
import { Job } from "@/lib/app/job/types";


export default function JobDisplay({ job }: { job: Job }) {
    const route = useRouter();
    const {setCompanyLogo, setJobLink, setCompanyName, setPositionName} = useCompanyStore();
    return (
        <div className="w-full flex px-2 mt-10 hover:cursor-pointer" onClick={() => {
            setCompanyLogo(job.company_logo_url);
            setJobLink(job.job_link);
            setCompanyName(job.company_name);
            setPositionName(job.job_position);
            route.push(`jobs/${job.job_id}`)
        }}>
            <img src={job.company_logo_url} alt="company logo" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
                <div className="font-bold text-dip-100 p-0">{job.job_position}</div>
                <div className="p-0 text-sm">{job.company_name} • {job.job_location}</div>
                <div className="p-0 text-xs text-dip-blk">{job.job_posting_date}</div>
            </div>         
        </div>
    )
}