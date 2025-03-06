"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Prep {
    job_id: string;
    job_positon: string;
    company: string;
    status: "not-attempted" | "in-progress" | "completed";
    skills: string[];
}

const prepData: Prep[] = [
    {
        job_id: "1",
        job_positon: "Software Engineer",
        company: "Google",
        status: "in-progress",
        skills: ["C++", "Data Structures", "Algorithms"]
    },
    {
        job_id: "2",
        job_positon: "Machine Learning Engineer",
        company: "OpenAI",
        status: "completed",
        skills: ["Python", "PyTorch", "Deep Learning"]
    },
    {
        job_id: "3",
        job_positon: "Computer Vision Engineer",
        company: "Tesla",
        status: "not-attempted",
        skills: ["TensorFlow", "Image Processing", "CUDA"]
    },
    {
        job_id: "4",
        job_positon: "Full Stack Developer",
        company: "Amazon",
        status: "in-progress",
        skills: ["React.js", "Node.js", "MongoDB"]
    },
    {
       job_id: "5",
        job_positon: "Embedded Systems Engineer",
        company: "NVIDIA",
        status: "completed",
        skills: ["C", "Embedded Linux", "Microcontrollers"]
    },
    {
        job_id: "6",
        job_positon: "Data Scientist",
        company: "Meta",
        status: "not-attempted",
        skills: ["Python", "Pandas", "SQL"]
    },
    {
        job_id: "7",
        job_positon: "AI Research Scientist",
        company: "DeepMind",
        status: "in-progress",
        skills: ["Transformers", "Reinforcement Learning", "Mathematical Optimization"]
    },
    {
        job_id: "8",
        job_positon: "Security Engineer",
        company: "Palantir",
        status: "completed",
        skills: ["Cybersecurity", "Penetration Testing", "Cryptography"]
    },
    {
        job_id: "9",
        job_positon: "DevOps Engineer",
        company: "Netflix",
        status: "not-attempted",
        skills: ["AWS", "Kubernetes", "CI/CD"]
    },
    {
        job_id: "10",
        job_positon: "Robotics Engineer",
        company: "Boston Dynamics",
        status: "in-progress",
        skills: ["ROS", "Control Systems", "Computer Vision"]
    }
];


export default function ActivityPage(){
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchFilter, setSearchFilter] = useState("");

    return (
        <div className="py-8 w-full min-h-screen bg-dip-20">
            <div className="w-[56rem] mx-auto text-2xl font-bold mb-2">YOUR INTERVIEW PREPS</div>
            <div className="w-[56rem] mx-auto bg-white rounded-xl shadow-lg">
                <div className="px-4 py-4 w-full flex justify-between items-center">
                    <div className="text-sm border border-dip-60 rounded-md flex items-center">
                        <FaSearch className="mx-2 text-dip-100"/>
                        <input placeholder="Search" className="rounded-md px-2 py-1 w-96 focus:outline-none" value={searchFilter} onChange={(e)=>{setSearchFilter(e.target.value)}}/>
                    </div>
                    <div className="flex items-center">
                        <div className="mx-2 text-sm">Filter by: </div>
                        <select className="border border-dip-60 rounded-md px-2 py-1 w-56 text-sm" value={statusFilter} onChange={(e) => {setStatusFilter(e.target.value)}}>
                            <option className="" value="all">All</option>
                            <option className="" value="not-attempted">Not Attempted</option>
                            <option className="" value="in-progress">In Progress</option>
                            <option className="" value="completed">Completed</option>
                        </select>
                    </div>
                    
                </div>
                {
                    prepData
                        .filter((prep) => statusFilter === "all" ? true : prep.status === statusFilter)
                        .filter((prep) => prep.job_positon.toLowerCase().includes(searchFilter.toLowerCase()) || prep.company.toLowerCase().includes(searchFilter.toLowerCase()) || searchFilter === "")
                        .map((prep) => (
                            <Link href={`/jobs/${prep.job_id}/prep`} key={prep.job_id} className="mx-4 py-4 rounded-lg hover:bg-dip-20 transition-colors duration-300 flex flex-col">
                                <div className="flex items-center justify-between px-4">
                                    <div className="flex items-center">
                                        <div className="text-sm font-bold mr-1 flex-grow-0">{prep.job_positon}</div>
                                        <div className="text-sm flex-grow-0">{'- '+prep.company}</div>
                                    </div>
                                    <div className="flex-grow border border-dip-60 mx-2"></div>
                                    <div className="text-sm flex-grow-0">{prep.status === 'completed'? "Completed" : prep.status === 'in-progress'? "In Progress" : "Not Attempted"}</div>
                                </div>
                                <div className="flex px-4">
                                    {
                                        prep.skills.map((skill) => (
                                            <div key={skill} className="text-xs bg-dip-60 text-white rounded-md px-2 py-1 mx-1">{skill}</div>
                                        ))
                                    }
                                </div>
                            </Link>
                    ))
                }
                <div className="h-2"></div>
            </div>
        </div>
    )
}