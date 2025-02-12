'use client'

import React, { useState, useRef } from 'react';
import { RxUpload } from 'react-icons/rx';
import { MdOutlineEdit, MdOutlineSave } from 'react-icons/md';
import { TbCancel, TbPaperclip } from 'react-icons/tb';
import { Button } from '@/components/ui/button';

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

interface ResumeFile {
  name: string;
  file: File;
}

const UserProfile: React.FC = () => {
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
  const [resume, setResume] = useState<ResumeFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    handleRemoveResume();
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    handleRemoveResume();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResume({ name: file.name, file: file });
      setIsEditing(true); // Automatically enter edit mode when file is uploaded
    }
  };

  const handleRemoveResume = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      {/* Edit Controls - Normal flow */}
      <div className="max-w-8xl mx-auto pt-4">
        <div className="flex justify-end px-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <MdOutlineEdit className="w-6 h-6 text-dip-80" />
              <h2 className="text-dip-80 text-md font-bold">Edit</h2>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <MdOutlineSave className="w-6 h-6 text-dip-80" />
                <h2 className="text-dip-80 text-md font-bold">Save</h2>
              </Button>
              <Button onClick={handleCancel} className="flex items-center gap-2">
                <TbCancel className="w-6 h-6 text-dip-80" />
                <h2 className="text-dip-80 text-md font-bold">Cancel</h2>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Rest of profile content */}
      <div className="max-w-4xl mx-auto space-y-6 pt-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="relative">
            {/* Banner */}
            <div className="h-32 bg-[#e6e0d4] rounded-t-lg" />
            
            {/* Profile Picture */}
            <div className="absolute left-6 -bottom-12">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Seong_Gi-hun_season_1.png/220px-Seong_Gi-hun_season_1.png" 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-16 space-y-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="font-bold text-gray-900 text-[2.5rem] w-full bg-transparent border-b focus:outline-none"
                />
                <input
                  type="text"
                  value={editedProfile.title}
                  onChange={(e) => setEditedProfile({...editedProfile, title: e.target.value})}
                  className="text-lg text-gray-600 w-full bg-transparent border-b focus:outline-none"
                />
              </>
            ) : (
              <>
                <h1 className="font-bold text-gray-900 text-[2.5rem]">{profile.name}</h1>
                <p className="text-lg text-gray-600">{profile.title}</p>
              </>
            )}
          </div>
        </div>

        {/* Upload Resume Button/Display */}
        <div className="bg-dip-80 rounded-xl shadow-sm p-6">
          {resume ? (
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <TbPaperclip className="w-6 h-6" />
                <span className="text-lg font-medium">{resume.name}</span>
              </div>
              <button 
                onClick={handleRemoveResume}
                className="text-white hover:text-gray-200 text-xl font-medium px-2"
              >
                ×
              </button>
            </div>
          ) : (
            <label 
              htmlFor="resume-upload" 
              className="flex items-center cursor-pointer text-white"
            >
              <RxUpload className="w-6 h-6 mr-2" />
              <h2 className="text-lg font-medium">Upload Resume</h2>
            </label>
          )}
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".pdf,.docx" 
            className="hidden" 
            id="resume-upload"
            onChange={handleFileChange}
          />
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
          {isEditing ? (
            <textarea
              value={editedProfile.about}
              onChange={(e) => setEditedProfile({...editedProfile, about: e.target.value})}
              className="w-full text-gray-600 leading-relaxed bg-transparent border rounded-md p-2 focus:outline-none"
              rows={4}
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">{profile.about}</p>
          )}
        </div>

        {/* Experience Card */}
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
                        className="w-8 text-center text-[#8b7355] font-semibold bg-transparent focus:outline-none"
                      />
                    ) : (
                      <span className="text-[#8b7355] font-semibold">{exp.initials}</span>
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
                        className="text-xl font-semibold text-gray-900 w-full bg-transparent border-b focus:outline-none"
                      />
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const newExperiences = [...editedProfile.experiences];
                          newExperiences[index] = {...exp, role: e.target.value};
                          setEditedProfile({...editedProfile, experiences: newExperiences});
                        }}
                        className="text-lg text-gray-700 w-full bg-transparent border-b focus:outline-none"
                      />
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const newExperiences = [...editedProfile.experiences];
                          newExperiences[index] = {...exp, period: e.target.value};
                          setEditedProfile({...editedProfile, experiences: newExperiences});
                        }}
                        className="text-sm text-gray-500 mt-1 w-full bg-transparent border-b focus:outline-none"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                      <p className="text-lg text-gray-700">{exp.role}</p>
                      <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;