import { useCompanyStore } from "@/store/useCompanyStore";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import interviewsessionapi from "@/lib/app/mock_interview/api/session";
import summaryapi from "@/lib/app/mock_interview/api/summary";

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
    const maxQuestions = 5;

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

        if (status === "completed") {
            setIsLoading(true);
            const summary = (await summaryapi.dummyGet(subcategoryId)).summary;
            setInterviewSummary(summary);
            setIsLoading(false);
        }
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
            <div className="absolute w-4/5 h-4/5 bg-white rounded-lg px-8 py-4 overflow-y-scroll" onClick={()=>{}}>
                <div className="text-2xl font-bold">{categoryName}: {subcategoryName}</div>
                { status === "not-attempted" && !isLoading &&
                    <div className="w-full bg-dip-blk text-white text-center rounded-lg py-2">
                        <div className="text-xl font-bold mb-2">Not Attempted Yet</div>
                        <div className="mb-2 text-sm w-1/2 mx-auto italic">you will be given interview questions related to this topic. answer accordingly and we will give you feedbacks on how you answer our question</div>
                        <button className="rounded-full border-white border-[1px] px-4 py-1" onClick={() => {handleStartInterview()}}>Start Now!</button>
                    </div>
                }
                { isLoading && status === "not-attempted" && <div className="italic flex w-full items-center justify-center h-16">Preparing your Interview...</div>}
                {  status !== "not-attempted" &&
                    questions.map((bubble, index) => {
                        return (
                            <div className="w-full border-black border-2 rounded-lg px-4 py-2 mt-2 text-sm" key={index}>
                                {bubble}
                                {answers[index]? <div className="mt-8"><div className="font-bold">Your Response: </div>{answers[index]}</div> : isLoading &&  <div className="mt-8">Assessing your response...</div>}
                                {feedbacks[index] && <div className="mt-8"><div className="font-bold">Feedback: </div>{feedbacks[index]}</div>}
                            </div>
               )       
                    })
                }                            
                
                {   status === "in-progress" &&
                    <>
                        <div className="flex items-center mt-4">
                            <div className="mr-4"><FaMicrophone className={clsx(isListening? "bg-dip-80" : "", "h-20 w-20 p-4 rounded-full border-black border-2 hover:cursor-pointer")} onClick={isListening? stopListening: startListening}/></div>
                            {transcript? <div>{transcript}</div> : isLoading? <div>Loading...</div> : <div>Press and Speak to Answer</div>}
                        </div>
                        <button className="border-2 font-bold px-4 py-2 rounded-full mt-2 border-black disabled:text-gray-300 disabled:border-gray-300" onClick={handleSubmit} disabled={transcript==="" || isListening}>Submit Answer</button>
                    </>
                }
                {   status === "completed" && 
                    <div className="w-full rounded-lg mt-2">
                        <div className="text-xl font-bold mb-2">Interview Completed</div>
                        <div>{isLoading? "Generating Summary..." : interviewSummary}</div>
                    </div>
                }
            </div>
        </div>
    )
}