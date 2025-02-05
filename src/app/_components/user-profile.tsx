"use client";

import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import withAuth from '../_components/withAuth';

const UserProfile: React.FC = () => {
  const { username } = useUserStore();

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-8">
      <div className="max-w-4xl mx-auto space-y-6">
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
            <h1 className="font-bold text-gray-900 text-[2.5rem]">{ username }</h1>
            <p className="text-lg text-gray-600">Software Engineer</p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">
            Experienced software engineer with a passion for developing innovative programs...
          </p>
        </div>

        {/* Experience Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experience</h2>
          <div className="space-y-6">
            {/* Experience Item 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#e6e0d4] rounded-lg flex items-center justify-center">
                  <span className="text-[#8b7355] font-semibold">CA</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Company A</h3>
                <p className="text-lg text-gray-700">Software Engineer</p>
                <p className="text-sm text-gray-500 mt-1">Jan 2020 - Present</p>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#e6e0d4] rounded-lg flex items-center justify-center">
                  <span className="text-[#8b7355] font-semibold">CB</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Company B</h3>
                <p className="text-lg text-gray-700">Junior Developer</p>
                <p className="text-sm text-gray-500 mt-1">Jan 2018 - Dec 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserProfile);