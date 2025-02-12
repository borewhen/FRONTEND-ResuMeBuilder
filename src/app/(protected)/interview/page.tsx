"use client";

import React from 'react';
import { RxUpload } from 'react-icons/rx'; // Import the upload icon
import { useState, useEffect } from 'react';
import uploadVideo from '@/lib/app/video/api/upload_video'; // Import the video upload API
import clsx from 'clsx';
import { Typewriter } from "react-simple-typewriter";

const InterviewPage: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoFile(file);
    }
  }

  const handleAnalyzeVideo = async () => {
    if (!videoFile) return;
    setIsSubmitted(true);
  }
 
  useEffect(() => {
    if (!videoFile || !isSubmitted) return;
    const analyzeVideo = async() => {
      setLoadingResponse(true);
      const formData = new FormData();
      formData.append('file', videoFile);

      try{
        const response = await uploadVideo.post(formData);
        if(response.success){
          setTranscript(response.transcript);
          setAnalysis(response.analysis);
        }
        else throw new Error(response.message);
      } catch (err) {
        console.log(err)
        throw new Error(err instanceof Error ? err.message : String(err));
      } finally {
        setLoadingResponse(false);
        setIsSubmitted(false);
      }
    }

    analyzeVideo();
  }, [isSubmitted, videoFile]);
  return (
    <div className="w-screen min-h-screen bg-[#f5f3ef] py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className='text-4xl font-bold text-dip-100 w-80 border-dip-60 border-b-4'>Interview</h1>
        <div className='italic'>
          This section is used to analyze your interview video. Please upload your video to get started.
        </div>
        {
          videoSrc? (
            <div className="space-y-6 w-full">
              <div className='w-full flex justify-center bg-dip-40 rounded-xl'>
                <video 
                  src={videoSrc} 
                  controls 
                  className="w-2/3 shadow-sm"
                />
              </div>
              {
                loadingResponse && (
                  <div>
                    Loading...
                  </div>
                )
              }
              {
                !transcript || !analysis || loadingResponse?
                (
                  <div className='flex justify-center'>
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      id="video-upload"
                      onChange={handleVideoUpload}
                      disabled={loadingResponse}
                    />
                    <label 
                      htmlFor="video-upload" 
                      className={clsx(loadingResponse? "bg-dip-60" : "bg-dip-80 hover:bg-dip-100"
                        ," inline-block text-white font-bold py-2 px-4 rounded-xl mr-6")}
                    >
                      <div className="flex items-center">
                        <RxUpload className="w-4 h-4 mr-2" />
                        <span>Reupload Interview</span>
                      </div>
                    </label>
                    <button 
                      className={clsx(loadingResponse? "bg-dip-60":"bg-dip-80 hover:bg-dip-100", "text-white font-bold py-2 px-4 rounded-xl")}
                      onClick={() => {handleAnalyzeVideo()}}
                      disabled={loadingResponse}
                    >
                      Analyze Video
                    </button>
                  </div>
                ):
                (
                  <div className='bg-white rounded-xl'>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Video Transcript</h2>
                      <p className="text-gray-600 leading-relaxed">
                        {transcript}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your AI Coach says...</h2>
                      <p className="text-gray-600 leading-relaxed">
                        <Typewriter
                          words={[analysis]}
                          loop={1}
                          cursor={false}
                          typeSpeed={40}
                          deleteSpeed={0}
                        />
                      </p>
                    </div>
                  </div>
                )
              }
            </div>
          )
          :(
            <div className="space-y-6 w-full">
              <input 
                type="file" 
                accept="video/*" 
                className="hidden" 
                id="video-upload"
                onChange={handleVideoUpload}
              />
              <label 
                htmlFor="video-upload" 
                className="bg-dip-60 flex justify-center items-center cursor-pointer text-dip-100 w-[56rem] h-[18rem] flex-col border-dip-100 border-4 rounded-xl border-dashed"
              >
                <RxUpload className="w-20 h-20 mb-2" />
                <h2 className="font-bold text-xl">Upload Interview</h2>
              </label>
            </div>
          )
        }
        {/* <div className="bg-dip-80 rounded-xl shadow-sm p-6 flex items-center">
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
        </div> */}

        {/* AI Output Card */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your AI Coach says...</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum something something try harder get better thanks.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default InterviewPage;
