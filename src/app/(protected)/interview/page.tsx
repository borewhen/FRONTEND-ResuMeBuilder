"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FaMicrophone } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";


const templateQnA = [
  {
    question: "In what way do you think you can contribute to our company?",
    answer: "I am good!"
  },
  {
    question: "Why do you want to join our company?",
    answer: "The building looks good from outside. Also I love the cai fan from the coffee shop near your office."
  },
  {
    question: "What did you do as a Middle-End Engineer at your previous company?",
    answer: "I integrate the API created on the backend side with the ui on the frontend side."
  },
  {
    question: "Have you done any internship previously?",
    answer: "Yes, I've previously done an internship as a Middle-End Engineer at TikTok as a part of my credit bearing internship"
  },
  {
    question: "Explain briefly about your Resume!",
    answer: "I am currently a 3rd Year Information Engineering Student from Nanyang Technological Univerisity"
  },
]
const InterviewPage: React.FC = () => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true)
  return (
    <div className='bg-white w-full min-h-screen py-8'>
      <div className='w-[80rem] ml-20 flex'>
        <div className='w-1/2 h-[40rem] border-r'>
          <div className='w-full h-96 bg-dip-blk items-center justify-center'>
            <div className='text-white'>Video</div>
            <div className='flex relative top-72 w-full items-center justify-center'>
              <FaMicrophone className={clsx('text-white h-12 w-12 rounded-full p-2 mx-2', micOn? "bg-gray-600":"bg-red-600")} onClick={()=>setMicOn(!micOn)}/>
              <FaVideo className={clsx('text-white h-12 w-12 rounded-full p-2 mx-2', videoOn? "bg-gray-600":"bg-red-600")} onClick={()=>setVideoOn(!videoOn)}/>
            </div>
          </div>
          <div className='mt-2 px-2'>
            <div className='font-bold'>Transcript</div>
            <div>omg!</div>
          </div>
        </div>
        <div className='w-1/2 max-h-[40rem] overflow-y-scroll'>
          <div className='absolute w-[40rem] h-12 flex items-center justify-end bg-white shadow-md'>
            <button className='bg-dip-purple hover:bg-dip-lightpurple px-6 py-1 rounded-lg mx-2 text-white'>More Question!</button>
            <button className='bg-dip-purple hover:bg-dip-lightpurple px-6 py-1 rounded-lg mx-2 text-white'>Finish</button>
          </div>
          <div className='mt-8 px-8 py-2 flex flex-col-reverse'>
            {
              templateQnA.map((data, index) => {
                const {question, answer} = data;
                return (
                  <div className='mt-4 w-full bg-purple-300 px-4 py-2 rounded-md' key={index}>
                    <div className=''>Q: {question}</div>
                    <div className=''>A: {answer}</div>
                  </div>
                )
              })
            }
          </div>
          
        </div>
      </div>
    </div>
  )
};

export default InterviewPage;
