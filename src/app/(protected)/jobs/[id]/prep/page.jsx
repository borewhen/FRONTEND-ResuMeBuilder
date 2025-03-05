"use client";
import { useState } from "react";
import InterviewCard from "./(components)/interview-card";
export default function JobPrepPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({});
  const handleClick = (category, item) => {
    setShowPopup(true);
    setInterviewDetails({category, item});
  }
  return (
    <div className="bg-dip-20 w-full min-h-screen py-8">
      <div className="w-[56rem] mx-auto text-center text-2xl font-bold">AI Preparation</div>
      <div className="w-[56rem] h-full mx-auto flex justify-between flex-wrap">
        {["FrontEnd", "BackEnd", "Machine Learning", "Data Science"].map((category, index) => {
          return (
            <div className="w-[27rem] h-72 mt-4 bg-white rounded-lg shadow-xl" key={index}>
              <div className="px-4 py-4 flex justify-between items-center">
                <div className="font-bold text-xl">{category}</div>
                <div className="text-sm">0% completed</div>
              </div>
              {
                [1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <div className="mx-4 px-2 py-2 border-gray-200 flex justify-between items-center rounded-lg bg-dip-80 mb-2 hover:bg-dip-100 hover:cursor-pointer" key={index} onClick={()=>handleClick(category, item)}>
                      <div className="font-bold text-sm">Task {item}</div>
                      <div className="text-sm">not completed</div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
        }

        {
          showPopup && <InterviewCard setShowPopup={setShowPopup} interviewDetails={interviewDetails}/>
        }
      </div>
    </div>
  );
}   