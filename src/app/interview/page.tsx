import React from 'react';
import { RxUpload } from 'react-icons/rx'; // Import the upload icon

const InterviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f3ef] py-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Upload Video Button */}
        <div className="bg-dip-80 rounded-xl shadow-sm p-6 flex items-center">
          <input 
            type="file" 
            accept="video/*" 
            className="hidden" 
            id="video-upload" 
          />
          <label 
            htmlFor="video-upload" 
            className="flex items-center cursor-pointer text-white"
          >
            <RxUpload className="w-6 h-6 mr-2" />
            <h2 className="font-bold">Upload Video</h2>
          </label>
        </div>

        {/* AI Output Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your AI Coach says...</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum something something try harder get better thanks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
