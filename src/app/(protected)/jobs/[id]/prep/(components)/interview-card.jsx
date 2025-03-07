import { useCompanyStore } from "@/store/useCompanyStore";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";

const getResponse = async (subCategoryid, questions, answers, feedbacks) => {
    return {
        questions: ["Explain more about yourself"],
        feedbacks: ["Looks good. You can add more details about your experience and projects."],
        answers: ["I am a software engineer with 5 years of experience in web development. I have worked on multiple projects and have experience in both frontend and backend technologies. I am proficient in JavaScript, React, Node.js, and MongoDB. I have a strong understanding of data structures and algorithms and have worked on multiple projects that require problem-solving skills. I am a quick learner and can adapt to new technologies quickly. I am passionate about coding and always looking for new challenges to improve my skills."],
        status: "in-progress"
    }
}

export default function InterviewCard({setShowPopup, interviewDetails, subCategoryid}) {
    const {category, item} = interviewDetails;
    const {companyName, positionName} = useCompanyStore();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [transcript, setTranscript] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const handleSubmit = async () => {
        setAnswers([...answers, transcript]);
        setIsListening(false);
        setTranscript("");

        const response = await getResponse(subCategoryid, questions, answers, feedbacks);
        setQuestions(response.questions);
        setAnswers(response.answers);
        setFeedbacks(response.feedbacks);
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
            const response = await getResponse(subCategoryid, [], [], []);
            setQuestions(response.questions);
            setAnswers(response.answers);
            setFeedbacks(response.feedbacks);
        }

        initSpeechRecognition();
        getSubcategoryDetails();

    }, []);

    useEffect(() => {

    }, [])

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
                <div className="text-2xl font-bold">{category}: {item}</div>
                <div className="text-sm">{positionName} @ {companyName}</div>
                <div className="w-full bg-dip-blk text-white text-center rounded-lg py-2">
                    <div className="text-xl font-bold mb-2">Not Attempted Yet</div>
                    <div className="mb-2 text-sm w-1/2 mx-auto italic">you will be given interview questions related to this topic. answer accordingly and we will give you feedbacks on how you answer our question</div>
                    <button className="rounded-full border-white border-[1px] px-4 py-1 ">Start Now!</button>
                </div>
                {
                    questions.map((bubble, index) => {
                        return (
                            <div className="w-full border-black border-2 rounded-lg px-4 py-2 mt-2 text-sm" key={index}>
                                {bubble}
                                {answers[index] && <div className="mt-8"><div className="font-bold">Your Response: </div>{answers[index]}</div>}
                                {feedbacks[index] && <div className="mt-8"><div className="font-bold">Feedback: </div>{feedbacks[index]}</div>}
                            </div>
                    )
                    })
                }                            
                
                <div className="flex items-center mt-4">
                    <div className="mr-4"><FaMicrophone className={clsx(isListening? "bg-dip-80" : "", "h-20 w-20 p-4 rounded-full border-black border-2 hover:cursor-pointer")} onClick={isListening? stopListening: startListening}/></div>
                    {/* {isListening? <div>Listening ...</div> : transcript? <div>{transcript}</div> : isLoading? <div>Loading...</div> : <div>Press and Speak to Answer</div>} */}
                    {transcript}
                </div>
                <button className="border-2 font-bold px-4 py-2 rounded-full mt-2 border-black disabled:text-gray-300 disabled:border-gray-300" onClick={handleSubmit} disabled={transcript===""}>Submit Answer</button>
            </div>
        </div>
    )
}