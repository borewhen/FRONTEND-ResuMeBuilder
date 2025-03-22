import { useCompanyStore } from "@/store/useCompanyStore";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { TiMicrophoneOutline } from "react-icons/ti"
import interviewsessionapi from "@/lib/app/mock_interview/api/session";
import summaryapi from "@/lib/app/mock_interview/api/summary";
import { get } from "http";
import MoonLoader from "react-spinners/MoonLoader";

export default function InterviewCard({setShowPopup, subcategoryDetail}) {
    const {subcategoryId, categoryName, subcategoryName} = subcategoryDetail;
    const {companyName, positionName} = useCompanyStore();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [status, setStatus] = useState("not-attempted");
    const [transcript, setTranscript] = useState("");
    const [interviewSummary, setInterviewSummary] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const setDetails = (questions, answers, feedbacks, status) => {
        setQuestions(questions);
        setAnswers(answers);
        setFeedbacks(feedbacks);
        setStatus(status == true? questions.length == 0? "not-attempted" : "in-progress" : "completed");
    }

    const handleStartInterview = async () => {
        setIsLoading(true);
        await interviewsessionapi.post(subcategoryId)
        .then( async () => {
            const response = await interviewsessionapi.get(subcategoryId);
            const {questions, answers, feedbacks, status} = response;
            setDetails(questions, answers, feedbacks, status);
        })
        .catch((error) => console.error("Error starting interview:", error))
        .finally(() => setIsLoading(false));
    }

    const handleSubmit = async () => {
        setTranscript("");
        setIsLoading(true);
        await interviewsessionapi.put(subcategoryId, {answer: transcript})
        .then( async () => {
            const response = await interviewsessionapi.get(subcategoryId);
            const {questions, answers, feedbacks, status} = response;
            setDetails(questions, answers, feedbacks, status);
        })
        .catch((error) => console.error("Error submitting answer:", error))
        .finally(() => {
            setIsLoading(false);
            setIsListening(false);
        });
    }

    useEffect(() => {
        const initSpeechRecognition = async () => {
            if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
                const recognition = new window.webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = "en-US";

                recognition.onresult = (event) => {
                    let text = "";
                    for (let i = 0; i < event.results.length; i++) {
                        text += event.results[i][0].transcript + " ";
                    }
                    setTranscript(text);
                };

                recognition.onerror = (event) => console.error("Speech recognition error:", event);
                recognitionRef.current = recognition;
            }
        };

        const getSubcategoryDetails = async () => {
            const response = await interviewsessionapi.get(subcategoryId);
            const {questions, answers, feedbacks, status} = response;
            setDetails(questions, answers, feedbacks, status);
        }
        initSpeechRecognition();
        getSubcategoryDetails();
    }, []);

    useEffect(() => {
        const getSummary = async () => {
            setIsLoading(true);
            const summary = (await summaryapi.subcategoryGet(subcategoryId)).summary;
            setInterviewSummary(summary);
            setIsLoading(false);
        }
        if(status === "completed"){
            getSummary();
        }
    }, [status]);

    const startListening = () => {
        if (recognitionRef.current) {
            setTranscript("");
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };


    return (
        <div className="absolute flex items-center justify-center w-full h-full top-0 left-0">
            <div className="absolute w-full h-full top-0 left-0 bg-[#00000030] z-0" onClick={()=>setShowPopup(false)}></div>
            <div className="absolute w-4/5 h-4/5 bg-white rounded-lg px-8 py-8 flex flex-col " onClick={()=>{}}>
                <div className="w-full h-full overflow-y-scroll">
                    <div className="text-2xl font-bold">{categoryName}: {subcategoryName}</div>
                    { status === "not-attempted" && !isLoading &&
                        <div className="w-full bg-dip-blk text-white text-center rounded-lg py-5 mt-3">
                            <div className="text-xl font-bold mb-2">Not Attempted Yet</div>
                            <div className="mb-2 text-sm w-1/2 mx-auto italic">you will be given interview questions related to this topic. answer accordingly and we will give you feedbacks on how you answer our question</div>
                            <button className="rounded-full border-white border-[1px] px-4 py-1" onClick={() => {handleStartInterview()}}>Start Now!</button>
                        </div>
                    }
                    { isLoading && status === "not-attempted" && (
                        <div className="w-full h-full flex justify-center items-center">
                            <MoonLoader
                            color="#030510"
                            loading={true}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            />
                        </div>
                    
                        )
                    }
                    <div className="flex flex-col flex-1">
                        <div className="flex-1 overflow-y-auto py-5">
                        {  status !== "not-attempted" &&
                            questions.map((bubble, index) => {
                                return (
                                    <div className="w-full border-black border-2 rounded-lg px-4 py-2 mt-2 text-sm" key={index}>
                                        <div><div className="font-bold">Question: </div>{bubble}</div>
                                        {answers[index]? <div className="mt-8"><div className="font-bold">Your Response: </div>{answers[index]}</div> : isLoading &&  <div className="mt-8">Assessing your response...</div>}
                                        {feedbacks[index] && <div className="mt-8"><div className="font-bold">Feedback: </div>{feedbacks[index]}</div>}
                                    </div>
                                )
                            })
                        }
                        {   status === "completed" &&
                            <div className="w-full rounded-lg mt-12">
                                <div className="text-xl font-bold mb-2">Interview Completed</div>
                                <div>{isLoading? "Generating Summary..." : interviewSummary}</div>
                            </div>
                        }
                        </div>
                    
                        {   status === "in-progress" &&
                            <div className="bg-gray-50 rounded-lg p-4 shadow-md border border-dip-grey">
                            {/* Header & Submit Button */}
                            <div className="flex items-center justify-between">
                              <div className="font-semibold text-gray-800 text-lg">Answer</div>
                              <button
                                className="px-4 py-2 rounded-full text-white bg-gradient-to-r from-[#8D72E1] to-[#D66DDF] disabled:opacity-50 hover:opacity-90 transition font-bold"
                                onClick={handleSubmit}
                                disabled={transcript === "" || isListening}
                              >
                                Submit Answer
                              </button>
                            </div>
                    
                            <div className="flex items-center mt-4">
                              <div className="mr-4">
                                <TiMicrophoneOutline
                                  className={clsx(
                                    !isListening
                                      ? "bg-gradient-to-r from-[#6CA0D5] to-[#7764D5]"
                                      : "bg-gradient-to-r from-[#A788E3] to-[#C24FC2]",
                                    "h-16 w-16 p-4 rounded-full hover:scale-105 transition-all text-white shadow-lg"
                                  )}
                                  onClick={isListening ? stopListening : startListening}
                                />
                              </div>
                    
                                <div className="border border-gray-300 flex-1 h-11 rounded-md bg-[#E9E3FF] text-gray-700 flex items-center px-3">
                                    {transcript ? transcript : "Press and Speak to Answer"}
                                </div>
                            </div>
                          </div>
                    
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}