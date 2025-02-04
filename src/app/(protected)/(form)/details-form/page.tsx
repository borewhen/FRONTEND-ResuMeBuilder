"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

export default function DetailsFormPage() {  
    const { setRole } = useUserStore();
    const [chosenRole, setChosenRole] = useState<"jobseeker" | "recruiter">("jobseeker");
    const router = useRouter();

    const handleClick = () => {
        setRole(chosenRole);
        router.push('/');
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-3/5 border rounded-md p-4 shadow-md">
                <div className="text-xl font-bold">Details Form</div>
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
                    <div>Register as Jobseeker</div>:
                    <div>Register as Recruiter</div>
                }
                <button onClick={handleClick} className="mt-2 bg-blue-400 py-2 px-6 text-sm rounded-lg text-white hover:bg-blue-500">Submit</button>
            </div>
        </div>
    );
}