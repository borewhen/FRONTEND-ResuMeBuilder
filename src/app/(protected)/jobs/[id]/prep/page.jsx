"use client";
import { useEffect, useState } from "react";
import InterviewCard from "./(components)/interview-card";
import { useParams } from "next/navigation";
import topicsapi from "@/lib/app/mock_interview/api/getInterviewTopics";
import summaryapi from "@/lib/app/mock_interview/api/summary";
import coursegeneratorapi from "@/lib/app/course/api/generate";
import clsx from "clsx";

export default function JobPrepPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [subcategoryDetail, setSubcategoryDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [summary, setSummary] = useState();
  const [failedTopics, setFailed] = useState([]);
  const [courseId, setCourseId] = useState(-1);
  const [startUpdatingCourse, setStartUpdatingCourse] = useState(false);
  const { id } = useParams();

  const handleClick = (subcategoryId, categoryName, subcategoryName) => {
    setShowPopup(true);
    setSubcategoryDetail({
      categoryName,
      subcategoryName,
      subcategoryId
    })
  }

  useEffect(() => {
    if(interviewList.length === 0) return;
    const completed = interviewList.every(category => category.subcategories.every(subcategory => !subcategory.status));

    const getSummary = async () => {
      const response = await summaryapi.mockinterviewGet(id);
      setSummary(response.summary);
      setFailed(response.failed_topics);  
    }

    const generateCourse = async() => {
      const mockInterviewId = interviewList[0].mock_interview_id;
      const generatedCourseId = (await coursegeneratorapi.generate(mockInterviewId)).course_id;
      setStartUpdatingCourse(true);
      setCourseId(generatedCourseId);
    }
 
    if(completed){
      setIsCompleted(true);
      getSummary();
      generateCourse();
    }
  }, [interviewList]);

  useEffect(() => {
    const getInterviewList = async () => {
      setIsLoading(true);
      const response = await topicsapi.post(id)
      setInterviewList(response);
      setIsLoading(false);
    }
    getInterviewList();
  }, []);

  useEffect(() => {
    if(!startUpdatingCourse || courseId === -1) return;
    const updateCourse = async () => {
      await coursegeneratorapi.update(courseId);
      setStartUpdatingCourse(false);
    }
    updateCourse();
  }, [courseId, startUpdatingCourse]);

  return (
    <div className="bg-dip-20 w-full min-h-screen py-8">
      <div className="w-[56rem] mx-auto text-center text-2xl font-bold">AI Preparation</div>
      <div className="w-[56rem] h-full mx-auto flex justify-between flex-wrap">
        {!isLoading && interviewList.map((category, index) => {
          const { category_name, subcategories } = category;
          const percentage = 100 - (subcategories.reduce((sum, subcategory) => sum + subcategory.status, 0) / subcategories.length) * 100;
          return (
            <div className="w-[27rem] h-72 mt-4 bg-white rounded-lg shadow-xl" key={index}>
              <div className="px-4 py-4 flex justify-between items-center">
                <div className="font-bold text-xl">{category_name}</div>
                <div className="text-sm italic font-bold">{percentage.toFixed(1)}% Completed</div>
              </div>
              {
                subcategories.map((subcategory, index) => {
                  const { subcategory_id, subcategory_name, status } = subcategory;
                  return (
                    <div className={clsx("mx-4 px-2 py-2 border-gray-200 flex justify-between items-center rounded-lg mb-2 hover:cursor-pointer", status? "bg-red-200 hover:bg-red-400": "bg-green-200 hover:bg-green-400")} key={index} onClick={()=>handleClick(subcategory_id, category_name, subcategory_name)}>
                      <div className="font-bold text-sm">{subcategory_name}</div>
                      <div className="text-sm italic">{!status? "Completed": "Not Completed"}</div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
        }
        {
          showPopup && <InterviewCard setShowPopup={setShowPopup} subcategoryDetail={subcategoryDetail} />
        }
      </div>
      {isCompleted && <div className="w-[56rem] mx-auto mt-8 text-center text-2xl font-bold"> {summary} </div>}
    </div>
  );
}   