"use client";

// import { useUserStore } from "@/store/useUserStore";
// import { useRouter } from "next/navigation";
import { useState } from "react";
// import { Input } from "@/components/ui/input"; // unused import
import JobSeekerForm from "@/app/(protected)/_components/details-form/job-seeker-form";
import clsx from "clsx";

export default function DetailsFormPage() {  
    // const { setRole } = useUserStore();
    const [chosenRole, setChosenRole] = useState<"jobseeker" | "recruiter">("jobseeker");
    // const router = useRouter();

    // Temporarily disabled
    // const handleClick = () => {
    //     setRole(chosenRole);
    //     router.push('/');
    // }

    // *** THIS FILE CONTAINS DECLARED & UNUSED VALUES, PLS OVERWRITE ONCE DONE

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-3/5 border rounded-lg p-4 shadow-md">
                <div className="flex w-full mt-2">
                    <button 
                        className={
                            clsx("h-8 flex-grow text-center hover:bg-gray-100 hover:translate-y-[-0.25rem] transition-all rounded-lg",
                                chosenRole === 'jobseeker'? 'bg-gray-300': 'font-normal')}
                        onClick={() => setChosenRole('jobseeker')}>Job Seeker</button>
                    <button 
                        className={
                            clsx("h-8 flex-grow text-center hover:bg-gray-100 hover:translate-y-[-0.25rem] transition-all rounded-lg",
                                chosenRole === 'recruiter'? 'bg-gray-300': 'font-normal')}
                        onClick={() => setChosenRole('recruiter')}>Recruiter</button>
                </div>
                { chosenRole == 'jobseeker'?
                    <div>
                        <JobSeekerForm />
                    </div>:
                    <div>Register as Recruiter</div>
                }
            </div>
        </div>
    );
}