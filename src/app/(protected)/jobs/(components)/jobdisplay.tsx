"use client";
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/store/useCompanyStore";
import { Job } from "@/lib/app/job/types";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export default function JobDisplay({
    job,
    selectedJobId,
    setSelectedJobId,
}: {
    job: Job;
    selectedJobId: number | null;
    setSelectedJobId: (id: number | null) => void;
}) {
    const route = useRouter();
    const { setCompanyLogo, setJobLink, setCompanyName, setPositionName } =
        useCompanyStore();

    return (
        <div
            className={`flex items-center bg-white border rounded-xl py-3 px-3 shadow-md hover:shadow-lg transition cursor-pointer
        ${
            selectedJobId == job.job_id
                ? "border-2 border-purple-400"
                : "border-gray-200"
        }`}
            onClick={() => {
                setSelectedJobId(job.job_id);
                setCompanyLogo(job.company_logo_url);
                setJobLink(job.job_link);
                setCompanyName(job.company_name);
                setPositionName(job.job_position);
            }}
        >
            <img
                src={job.company_logo_url}
                alt="company logo"
                className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
                <div className="text-[16px] font-bold text-black p-0">
                    {job.job_position}
                </div>
                <div className="text-[12px] text-[#4b5563]">
                    {job.company_name}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.job_location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Deadline: {job.job_posting_date}</span>
                </div>
            </div>
        </div>
    );
}
