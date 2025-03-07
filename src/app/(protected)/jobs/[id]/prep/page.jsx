"use client";
import { useEffect, useState } from "react";
import InterviewCard from "./(components)/interview-card";
import { useParams } from "next/navigation";
import topicsapi from "@/lib/app/mock_interview/api/getInterviewTopics";
import { set } from "zod";

export default function JobPrepPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleClick = (subcategory_id) => {
    setShowPopup(true);
    setSelectedInterview(subcategory_id);
  }

  useEffect(() => {
    const getInterviewList = async () => {
      setIsLoading(true);
      const response = await topicsapi.post(id);
      setInterviewList(response);
      setIsLoading(false);
    }
    getInterviewList();
  }, []);

  return (
    <div className="bg-dip-20 w-full min-h-screen py-8">
      <div className="w-[56rem] mx-auto text-center text-2xl font-bold">AI Preparation</div>
      <div className="w-[56rem] h-full mx-auto flex justify-between flex-wrap">
        {!isLoading && interviewList.map((category, index) => {
          return (
            <div className="w-[27rem] h-72 mt-4 bg-white rounded-lg shadow-xl" key={index}>
              <div className="px-4 py-4 flex justify-between items-center">
                <div className="font-bold text-xl">{category.category_name}</div>
                <div className="text-sm">0% completed</div>
              </div>
              {
                category.subcategories.map((subcategory, index) => {
                  return (
                    <div className="mx-4 px-2 py-2 border-gray-200 flex justify-between items-center rounded-lg bg-dip-80 mb-2 hover:bg-dip-100 hover:cursor-pointer" key={index} onClick={()=>handleClick(subcategory.subcategory_id)}>
                      <div className="font-bold text-sm">{subcategory.subcategory_name}</div>
                      <div className="text-sm">{subcategory.status? "Completed": "Not Started"}</div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
        }

        {
          showPopup && <InterviewCard setShowPopup={setShowPopup} selectedInterview={selectedInterview} />
        }
      </div>
    </div>
  );
}   