"use client";
import { useEffect, useState } from "react";
import InterviewCard from "./(components)/interview-card";
import { useParams } from "next/navigation";
import topicsapi from "@/lib/app/mock_interview/api/getInterviewTopics";
import summaryapi from "@/lib/app/mock_interview/api/summary";
import coursegeneratorapi from "@/lib/app/course/api/generate";
import clsx from "clsx";
import { JobDetailResponse } from "@/lib/app/job/types";
import jobdetail from "@/lib/app/job/api/detail";
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

export default function JobPrepPage() {
  const [job, setJob] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [subcategoryDetail, setSubcategoryDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [summary, setSummary] = useState();
  const [failedTopics, setFailed] = useState("");
  const [courseId, setCourseId] = useState(-1);
  const [startUpdatingCourse, setStartUpdatingCourse] = useState(false);
  const { id } = useParams();
  const [count, setCount] = useState({
    "total": 0,
    "todo": 0,
    "completed": 0
  });
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [isGenerateCourseLoading, setIsGenerateCourseLoading] = useState(false);
  const router = useRouter()

  const handleClick = (subcategoryId, categoryName, subcategoryName) => {
    setShowPopup(true);
    setSubcategoryDetail({
      categoryName,
      subcategoryName,
      subcategoryId
    })
  }

  useEffect(() => {
    setIsLoading(false);
    
    // Check if interviewList exists, is an array, and has items
    if (!interviewList || !Array.isArray(interviewList) || interviewList.length === 0) return;
    
    // Now we can safely use array methods
    const completed = interviewList.every(category => {
      // Also check if category.subcategories is an array
      return category && category.subcategories && Array.isArray(category.subcategories) && 
        category.subcategories.every(subcategory => !subcategory.status);
    });

    const getSummary = async () => {
      const response = await summaryapi.mockinterviewGet(id);
      setSummary(response.summary);
      setFailed(response.failed_topics);  
    }
  
    if (completed) {
      setIsSummaryLoading(true);
      setIsCompleted(true);
      getSummary();
      setIsSummaryLoading(false);
    }
  }, [interviewList]);

  useEffect(() => {
    const getInterviewList = async () => {
      setIsLoading(true);
      try {
        const response = await topicsapi.post(id);
        setInterviewList(response);
      } catch (error) {
        console.error("Error fetching interview topics:", error);
        toast.error('Failed to load interview topics', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchJobDetail = async () => {
      setIsLoadingJob(true);
      try {
        const fetchedJob = await jobdetail.get(id);
        setJob(fetchedJob);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setIsLoadingJob(false);
      }
    };

    getInterviewList();
    fetchJobDetail();
  }, [showPopup]);

  useEffect(() => {
    if(!startUpdatingCourse || courseId === -1) return;
    const updateCourse = async () => {
      await coursegeneratorapi.update(courseId);
      setStartUpdatingCourse(false);
    }
    updateCourse();
  }, [courseId, startUpdatingCourse]);

  const generateCourse = async() => {
    try {
      const mockInterviewId = interviewList[0]?.mock_interview_id;
      setIsGenerateCourseLoading(true)
      const generatedCourseId = (await coursegeneratorapi.generate(mockInterviewId)).course_id;
      setIsGenerateCourseLoading(false)

      toast.success('Course generated successfully', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      router.push(`/course/create/${generatedCourseId}`)
    } catch (error) {
      toast.error('Error has occured', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    let total = 0;
    let completed = 0;
    let todo = 0;

    if (interviewList && Array.isArray(interviewList)) {
      interviewList.forEach((el) => {
        if (el && el.subcategories && Array.isArray(el.subcategories)) {
          el.subcategories.forEach((el) => {
            total += 1;
            if (el.status) {
              todo += 1;
            } else {
              completed += 1
            }
          });
        }
      });
      
      setCount({
        total,
        completed,
        todo
      });
    }
  }, [interviewList]);

  return (
    <div className="w-full min-h-screen py-12">
      <div className="flex flex-col items-center">
        <div className="w-[56rem]">
          <div>
            {isLoadingJob ? (
              <>
                <Skeleton width={300} height={20}/>
                <Skeleton width={150} height={15}/>
              </>
            ) : (
              <>
                <p className="font-bold text-2xl text-dip-purple">{job?.company_name}</p>
                <div className="text-xl font-bold">{job?.job_position}</div>
              </>
            )}
          </div>
          <div className="w-[60rem] mx-auto rounded-lg py-[50px] mt-8 bg-dip-greyishwhite">
            <div className="text-3xl text-black font-bold text-center">
              Interview Preparation
            </div>

            <div className="flex mx-[40px] my-5">
              <div className="text-center flex-1 flex flex-col">
                <div className="text-xl font-medium">Total</div>
                <div className="text-3xl font-bold text-dip-lightpurple">{count?.total}</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-xl font-medium">Todo</div>
                <div className="text-3xl font-bold text-dip-lightpurple">{count?.todo}</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-xl font-medium">Completed</div>
                <div className="text-3xl font-bold text-dip-lightpurple">{count?.completed}</div>
              </div>
            </div>
            <div className="w-[56rem] h-full mx-auto flex flex-wrap gap-8">
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <div
                    className="w-[27rem] h-72 mt-4 rounded-lg shadow-xl bg-white border border-[#E0E0E0]"
                    key={index}
                  >
                    <div className="px-4 py-4 flex justify-between items-center">
                      <Skeleton width={120} height={20}/>
                      <div className="text-sm italic font-bold">% Completed</div>
                    </div>

                    {/* Subcategories */}
                    {[...Array(3)].map((_, subIndex) => (
                      <div key={subIndex} className="px-4 py-2 border-t border-gray-200">
                        <Skeleton height={30}/>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                Array.isArray(interviewList) && interviewList.length > 0 ? (
                  interviewList.map((category, index) => {
                    if (!category) return null;
                    
                    const { category_name, subcategories } = category;
                    
                    // Check if subcategories exists and is an array
                    if (!subcategories || !Array.isArray(subcategories)) return null;
                    
                    const percentage = 100 - (subcategories.reduce((sum, subcategory) => 
                      sum + (subcategory && subcategory.status ? subcategory.status : 0), 0) / subcategories.length) * 100;
                    
                    return (
                      <div className="w-[27rem] h-72 mt-4 rounded-lg shadow-xl bg-white border border-[#E0E0E0]" key={index}>
                        <div className="px-4 py-4 flex justify-between items-center">
                          <div className="font-bold text-xl">{category_name}</div>
                          <div className="text-sm italic font-bold">{percentage.toFixed(1)}% Completed</div>
                        </div>
                        {subcategories.map((subcategory, index) => {
                          if (!subcategory) return null;
                          
                          const { subcategory_id, subcategory_name, status } = subcategory;
                          return (
                            <div 
                              className={clsx(
                                "mx-4 px-2 py-2 border-gray-200 flex justify-between items-center rounded-full mb-2 hover:cursor-pointer", 
                                status ? "bg-red-200 hover:bg-red-400" : "bg-green-200 hover:bg-green-400"
                              )} 
                              key={index} 
                              onClick={() => handleClick(subcategory_id, category_name, subcategory_name)}
                            >
                              <div className="ml-4 font-bold text-sm">{subcategory_name}</div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full flex justify-center items-center py-8">
                    <MoonLoader
                      color="#030510"
                      loading={true}
                      size={40}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )
              )}

              {showPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed inset-0"
                >
                  <InterviewCard setShowPopup={setShowPopup} subcategoryDetail={subcategoryDetail} />
                </motion.div>
              )}
            </div>
          </div>
          {isCompleted ? (
            isSummaryLoading ? (
              <div>
                <div className="font-bold mt-12 text-xl">Interview Result</div>
                <Skeleton height={20} width={500} className="mt-5" />
                <Skeleton height={20} width={800} />
                <Skeleton height={20} width={650} />
              </div>
            ) : (
              <div>
                <div className="font-bold mt-12 text-xl text-center">Interview Result</div>
                <div className="w-[56rem] mx-auto mt-3 text-md">
                  {summary}
                </div>
                <div className="w-[56rem] mx-auto mt-3 text-md text-center">
                  <span className="font-bold text-dip-purple">Skill Gaps:</span>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {failedTopics && typeof failedTopics === 'string' && failedTopics.split(",").map((topic, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium">
                        {topic.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full flex justify-center mt-5">
                  <button
                    className={`rounded-full px-6 py-2.5 font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg
                      ${isGenerateCourseLoading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-dip-purple text-white hover:translate-y-[-2px]"}
                    `}
                    disabled={isGenerateCourseLoading}
                    onClick={generateCourse}
                  >
                    {isGenerateCourseLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Learn More!</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}   