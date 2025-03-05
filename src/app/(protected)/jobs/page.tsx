"use client";

import { link } from "fs";
import JobDisplay from "./(components)/jobdisplay";
import { useState } from "react";
interface Job {
    title: string;
    company: string;
    location: string;
    description: string;
    skills: string[];
    id: string;
}

const jobs: Job[] = [
    // {
    //     title: "Software Engineer",
    //     company: "TechNova Inc.",
    //     location: "San Francisco, CA",
    //     description: "Develop and maintain scalable web applications using modern frameworks.",
    //     skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    //     id: "1"
    // },
    // {
    //     title: "Data Scientist",
    //     company: "AI Solutions",
    //     location: "New York, NY",
    //     description: "Analyze large datasets and build predictive models to improve business decisions.",
    //     skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
    //     id: "2"
    // },
    // {
    //     title: "Cybersecurity Analyst",
    //     company: "SecureNet",
    //     location: "Austin, TX",
    //     description: "Monitor and secure network infrastructure against cyber threats and vulnerabilities.",
    //     skills: ["Network Security", "Penetration Testing", "Python", "SIEM"],
    //     id: "3"
    // },
    // {
    //     title: "Frontend Developer",
    //     company: "CreativeWeb",
    //     location: "Los Angeles, CA",
    //     description: "Design and develop interactive and responsive user interfaces.",
    //     skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
    //     id: "4"
    // },
    // {
    //     title: "Cloud Engineer",
    //     company: "CloudSphere",
    //     location: "Seattle, WA",
    //     description: "Deploy and manage cloud-based applications with high availability.",
    //     skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    //     id: "5"
    // },
    // {
    //     title: "Machine Learning Engineer",
    //     company: "DeepAI Labs",
    //     location: "Boston, MA",
    //     description: "Develop and optimize ML models for image and text processing applications.",
    //     skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision"],
    //     id: "6"
    // },
    // {
    //     title: "Backend Developer",
    //     company: "CodeForge",
    //     location: "Chicago, IL",
    //     description: "Design and implement server-side applications and APIs.",
    //     skills: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    //     id: "7"
    // },
    // {
    //     title: "Game Developer",
    //     company: "PixelPlay Studios",
    //     location: "Orlando, FL",
    //     description: "Create engaging 2D and 3D game experiences using Unity.",
    //     skills: ["C#", "Unity", "Game Physics", "Shader Programming"],
    //     id: "8"
    // },
    // {
    //     title: "DevOps Engineer",
    //     company: "FastDeploy",
    //     location: "Denver, CO",
    //     description: "Automate CI/CD pipelines and ensure system reliability.",
    //     skills: ["Jenkins", "Kubernetes", "Docker", "Linux"],
    //     id: "9"
    // },
    // {
    //     title: "Full Stack Developer",
    //     company: "InnovateTech",
    //     location: "Remote",
    //     description: "Work on both frontend and backend development for web applications.",
    //     skills: ["React", "Node.js", "GraphQL", "TypeScript"],
    //     id: "10"
    // }
];

// position
// link
// job_id
// company_name
// company_logo_url

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState<string>('');
    const [searchDisplay, setSearchDisplay] = useState<string>('');

    return (
        <div className="bg-dip-20 w-full min-h-screen py-8">
            <div className='w-[56rem] mx-auto flex justify-between'>
                <div className='w-64'>
                    <div className='w-full bg-white shadow-xl rounded-lg py-2 px-4'>
                        <h2 className='text-lg font-bold'>Your Applied Jobs</h2>
                        <div className='text-gray-600 italic text-sm mt-4'>No jobs applied</div>
                        <div className='w-full bg-dip-40 rounded-full text-center mt-4 mb-2 text-sm py-1 font-semibold text-dip-blk hover:bg-dip-60'>View All</div>
                    </div>
                    <div className='w-full bg-white shadow-xl rounded-lg mt-8 py-2 px-4 font-bold text-lg'>
                        <h2>Preferences</h2>
                    </div>
                </div>
                <div className='w-[36rem] bg-white shadow-xl rounded-xl py-4 px-4'>
                    <div className="flex justify-between">
                        <input type="text" placeholder="Search for jobs" className='w-4/5 bg-dip-20 rounded-full py-2 px-4 mb-4 focus:outline-none' onChange={(e)=>(setSearch(e.target.value))}/>
                        <button className=" bg-dip-100 rounded-full py-2 px-6 text-white font-bold h-10" onClick={()=>setSearchDisplay(search)}>Search</button>
                    </div>
                    <div>{searchDisplay && `Search for: ${searchDisplay}`}</div>
                    {jobs.map((job, index) => (<JobDisplay key={index} job={job} />))}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
