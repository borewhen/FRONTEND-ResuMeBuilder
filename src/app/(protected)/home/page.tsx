'use client'

import React, {useEffect, useState } from 'react';
import Link from 'next/link';
import { Job } from '@/lib/app/job/types';

interface MiniProfileData {
  name: string;
  profile_picture_url?: string;
  summary: string;
}

interface VideoInterview {
    mock_interview_id: string;
    question: string; 
}

interface SkillInterview {
    mock_interview_id: string;  
    skill_name: string;
    question: string; 
}

const HomePage: React.FC = () => {
const miniProfile: MiniProfileData = {
    name: "Full Name",
    // profile_picture_url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Seong_Gi-hun_season_1.png/220px-Seong_Gi-hun_season_1.png"
    profile_picture_url: "",
    summary: "Student at Nanyang Technological University"
};
const jobs: Job[] = [
    {
      job_position: "Intern, Software Development",
      job_link: "https://www.linkedin.com/jobs/view/4159063084",
      job_id: "1",
      company_name: "Grab",
      company_logo_url: "https://media.licdn.com/dms/image/v2/C510BAQGDlPEJILPXbw/company-logo_100_100/company-logo_100_100/0/1630575649647/grabapp_logo?e=1747872000&v=beta&t=86sEmTqIPwzUmoobYltZc-FF8ghTfjYzh9bXlHYGNmM"
    },
    {
      job_position: "R&D Intern - Software Engineering",
      job_link: "https://www.linkedin.com/jobs/view/4180988586",
      job_id: "2",
      company_name: "Rapsodo",
      company_logo_url: "https://media.licdn.com/dms/image/v2/D560BAQF6xcoSUHkrEQ/company-logo_100_100/company-logo_100_100/0/1692980075384/rapsodo_logo?e=1747872000&v=beta&t=L6qRhfICzpI8t68UFwXSHe-DEn3RnpohyAapzbj2UfA"
    }
];
const videoInterview: VideoInterview[] = [
    {
        mock_interview_id: 1,
        question: "What are your strengths and weaknesses?" // Retrieve latest question
    },
    {
        mock_interview_id: 2,
        question: "What are your salary expectations?" // Retrieve latest question
    }
];

const skillInterview: SkillInterview[] = [
    {
        mock_interview_id: 1,
        skill_name: "Data Structures and Algorithms",
        question: "You are given a list of integers. Write a function to find the two numbers that add up to a specific target value." // Retrieve latest question
    },
    {
        mock_interview_id: 2,
        skill_name: "Digital Signal Processing",
        question: "Compute the z-transform of x(t)." // Retrieve latest question
    }
];

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex justify-center p-6">
      <div className="max-w-screen-lg w-full flex gap-6 items-start">
        {/* Mini Profile Card */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
          <Link href="/user/profile" className="inline-block">
            <img
            src={miniProfile.profile_picture_url || "/pp.jpg"}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
          </Link>
          <p className="mt-2 text-lg font-semibold text-gray-800">{miniProfile.name}</p>
          <p className="text-gray-500 text-xs">{miniProfile.summary}</p>
        </div>

        {/* Job Section Card */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-dip-80 text-md font-bold">New jobs you might be interested in</h2>
          <div className="mt-4 space-y-4">
            {jobs.map((job) => (
              <div key={job.job_id} className="p-4 bg-gray-100 rounded-lg flex items-center">
                <img src={job.company_logo_url} alt={`${job.company_name} Logo`} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <Link href={job.job_link} className="text-blue-500 hover:underline" target="_blank">
                    <h3 className="font-semibold">{job.job_position}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm">{job.company_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Interview Prep Cards */}
        <div className="w-1/3 flex flex-col gap-6">
            {/* Video Interview Prep Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-dip-80 text-md font-bold">Video Interviews</h2>
              <div className="mt-4 space-y-4">
                <ul className="space-y-2">
                  {videoInterview.map((videoInterview) => (
                    <div key={videoInterview.mock_interview_id} className="p-4 bg-gray-100 rounded-lg">
                      <p className="text-gray-700 text-sm">{videoInterview.question}</p>
                      <Link href="interview" className="hover:underline">
                        <p className="text-gray-500 text-xs text-right mt-2">
                        continue answering
                        <span className="ml-2 text-gray-500">&#8594;</span>
                        </p>
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills Interview Prep Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-dip-80 text-md font-bold">Skill Interviews</h2>
              <div className="mt-4 space-y-4">
                <ul className="space-y-2">
                  {skillInterview.map((skillInterview) => (
                    <div key={skillInterview.mock_interview_id} className="p-4 bg-gray-100 rounded-lg">
                      <h3 className="text-sm font-bold">{skillInterview.skill_name}</h3>
                        <p className="text-gray-700 text-sm">{skillInterview.question}</p>
                      <Link href="interview" className="hover:underline">
                        <p className="text-gray-500 text-xs text-right mt-2">
                        continue answering
                        <span className="ml-2 text-gray-500">&#8594;</span> {/* right arrow */}
                        </p>
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;