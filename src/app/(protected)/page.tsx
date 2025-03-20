"use client";
import React, { useState } from 'react';
import { MdOutlineEdit, MdOutlineSave } from 'react-icons/md';
import { TbCancel } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import ProfileSummary from "@/app/(protected)/user/profile-summary";
import clsx from "clsx";
import ResumeCard from "@/app/(protected)/user/resume-card";

interface Experience {
  company: string;
  role: string;
  period: string;
  initials: string;
}

interface ProfileData {
  name: string;
  title: string;
  about: string;
  experiences: Experience[];
}

// interface ResumeFile {
//   name: string;
//   file: File;
// }

const HomePage = () => {
  const [chosen, setChosen] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Seong Gi-hun',
    title: 'Freelance Squid',
    about: 'I have played these games beforeee',
    experiences: [
      {
        company: 'Squid Game',
        role: 'Player',
        period: 'Jan 2020 - Present',
        initials: 'SG'
      },
      {
        company: 'Crippling Debt',
        role: 'From gambling',
        period: 'Jan 2018 - Dec 2019',
        initials: 'CD'
      }
    ]
  });
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen bg-dip-20 py-8">
      <div className="w-[56rem] mx-auto">
        <div className="w-full h-36 rounded-lg bg-dip-80"></div>
        <div className="rounded-full w-48 h-48 bg-dip-20 absolute left-[calc((100%-56rem)/2+2rem)] top-20 flex items-center justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Seong_Gi-hun_season_1.png/220px-Seong_Gi-hun_season_1.png" alt="logo" className="w-48 h-48 rounded-full p-2 object-fill" />
        </div>
        <div className="flex w-full mt-4">
          <ProfileSummary />
          <div className="flex-1 ml-4 rounded-lg">
            <div className="flex border-2 border-dip-100 rounded-lg overflow-hidden">
              <div 
                className={clsx(
                  "w-1/2 py-2 text-center font-bold transition-colors duration-200 cursor-pointer",
                  chosen === "profile" 
                    ? "bg-dip-100 text-dip-20" 
                    : "bg-dip-20 text-dip-100"
                )}
                onClick={() => setChosen("profile")}
              >
                Profile
              </div>
              <div 
                className={clsx(
                  "w-1/2 py-2 text-center font-bold transition-colors duration-200 cursor-pointer",
                  chosen === "resume" 
                    ? "bg-dip-100 text-dip-20" 
                    : "bg-dip-20 text-dip-100"
                )}
                onClick={() => setChosen("resume")}
              >
                Resume
              </div>
            </div>
            
            {chosen === "profile" && (
              <div className="space-y-6 mt-4">
                {/* About Section with Edit Button */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">About</h2>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                        <MdOutlineEdit className="w-5 h-5 text-dip-80" />
                        <span className="text-dip-80 text-sm font-bold">Edit</span>
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="flex items-center gap-2">
                          <MdOutlineSave className="w-5 h-5 text-dip-80" />
                          <span className="text-dip-80 text-sm font-bold">Save</span>
                        </Button>
                        <Button onClick={handleCancel} className="flex items-center gap-2">
                          <TbCancel className="w-5 h-5 text-dip-80" />
                          <span className="text-dip-80 text-sm font-bold">Cancel</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.about}
                      onChange={(e) => setEditedProfile({...editedProfile, about: e.target.value})}
                      className="w-full text-gray-600 leading-relaxed bg-transparent border rounded-md p-2 focus:outline-none cursor-text"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed cursor-default">{profile.about}</p>
                  )}
                </div>

                {/* Experience Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experience</h2>
                  <div className="space-y-6">
                    {editedProfile.experiences.map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#e6e0d4] rounded-lg flex items-center justify-center">
                            {isEditing ? (
                              <input
                                type="text"
                                value={exp.initials}
                                onChange={(e) => {
                                  const newExperiences = [...editedProfile.experiences];
                                  newExperiences[index] = {...exp, initials: e.target.value};
                                  setEditedProfile({...editedProfile, experiences: newExperiences});
                                }}
                                className="w-8 text-center text-[#8b7355] font-semibold bg-transparent focus:outline-none cursor-text"
                              />
                            ) : (
                              <span className="text-[#8b7355] font-semibold cursor-default">{exp.initials}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const newExperiences = [...editedProfile.experiences];
                                  newExperiences[index] = {...exp, company: e.target.value};
                                  setEditedProfile({...editedProfile, experiences: newExperiences});
                                }}
                                className="text-xl font-semibold text-gray-900 w-full bg-transparent border-b focus:outline-none cursor-text"
                              />
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const newExperiences = [...editedProfile.experiences];
                                  newExperiences[index] = {...exp, role: e.target.value};
                                  setEditedProfile({...editedProfile, experiences: newExperiences});
                                }}
                                className="text-lg text-gray-700 w-full bg-transparent border-b focus:outline-none cursor-text"
                              />
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => {
                                  const newExperiences = [...editedProfile.experiences];
                                  newExperiences[index] = {...exp, period: e.target.value};
                                  setEditedProfile({...editedProfile, experiences: newExperiences});
                                }}
                                className="text-sm text-gray-500 mt-1 w-full bg-transparent border-b focus:outline-none cursor-text"
                              />
                            </>
                          ) : (
                            <>
                              <h3 className="text-xl font-semibold text-gray-900 cursor-default">{exp.company}</h3>
                              <p className="text-lg text-gray-700 cursor-default">{exp.role}</p>
                              <p className="text-sm text-gray-500 mt-1 cursor-default">{exp.period}</p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {chosen === "resume" && <ResumeCard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;