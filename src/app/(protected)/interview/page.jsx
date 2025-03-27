"use client";

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import VideoPage from './(components)/video';
import UploadResumePage from './(components)/upload';

const InterviewPage = () => {
  const [resumeReady, setResumeReady] = useState(false);

  return (
    <div className='bg-white w-full min-h-screen py-8'>
      <div className='w-[80rem] ml-20 flex'>
        {
          resumeReady? <VideoPage/>: <UploadResumePage setResumeReady={setResumeReady}/>
        }
      </div>
    </div>
  )
};

export default InterviewPage;
