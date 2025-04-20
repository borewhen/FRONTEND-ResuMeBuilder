"use client";

import React, { use } from "react";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsCameraVideoFill,
    BsCameraVideoOffFill,
} from "react-icons/bs";
import axios from "axios";
import { useRouter, usePathname } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const VideoPage = ({ setStartInterview }) => {
    // Video
    const [videoOn, setVideoOn] = useState(true);
    const videoRef = useRef(null);

    // Mic
    const [micOn, setMicOn] = useState(false);
    const [transcript, setTranscript] = useState("");
    const micRef = useRef(null);

    // QnA
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    // Eye Tracking
    const canvasRef = useRef(null);
    const wsRef = useRef(null);
    const [eyeContact, setEyeContact] = useState(false);

    // Summary
    const [showSummary, setShowSummary] = useState(false);
    const [technicalSummary, setTechnicalSummary] = useState("");
    const [eyeContactSummary, setEyeContactSummary] = useState("");


    const fullTranscriptRef = useRef("");
    const baselineOffsetRef = useRef(0);

    // state for storing previous answers
    const [storedAnswers, setStoredAnswers] = useState("");

    // Add this state at the top of your component
    const [isReviewing, setIsReviewing] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            setVideoOn(true);
        } catch (err) {
            console.error(err);
        }
    };

    const stopWebcam = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            
            // Stop all tracks (both video and audio)
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                console.log(`Stopping track: ${track.kind}`);
                track.stop();
            });
            
            // Clear the srcObject
            videoRef.current.srcObject = null;
        }
        
        setVideoOn(false);
        console.log("Webcam cleanup completed");
    };

    const initMic = async () => {
        if (
            typeof window !== "undefined" &&
            "webkitSpeechRecognition" in window
        ) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event) => {
                let fullText = "";
                for (let i = 0; i < event.results.length; i++) {
                    fullText += event.results[i][0].transcript + " ";
                }
                
                fullTranscriptRef.current = fullText;
                
                const newText = fullText.substring(baselineOffsetRef.current);
                setTranscript(newText);
            };

            recognition.onerror = (event) => {
                if (event.error === "no-speech") {
                    console.warn("No speech detected, restarting recognition.");
                    recognition.stop();
                    recognition.start();
                } else {
                    console.error("Speech recognition error:", event);
                }
            };
            micRef.current = recognition;
        }
    };

    const startMic = async () => {
        if (micRef.current) {
            setTranscript("");
            micRef.current.start();
            setMicOn(true);
        }
        setMicOn(true);
    };

    const stopMic = async () => {
        if (micRef.current) {
            micRef.current.stop();
        }
        setMicOn(false);
    };

    const handleAudioPlay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    const getQuestion = async () => {
        const userid = window.localStorage.getItem("user_id");
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/generate_interview/get-question`,
            {
                user_id: Number(userid),
            }
        );
        const data = await response.data;
        setQuestions(data.questions);
        setAnswers(data.answers);
        setFeedbacks(data.feedbacks);
    };

    useEffect(() => {
        initMic();

        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(console.error);

        // If the environment variable is not set, fallback to localhost for development.
        const wsUrl =
            process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
            "ws://localhost:8000/interview/ws";
        
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
            console.log("WebSocket connection opened:", wsUrl);
        };

        wsRef.current.onmessage = (event) => {
            console.log("Received WebSocket message:", event.data);
            const data = JSON.parse(event.data);
            setEyeContact(data.eye_contact);
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error observed:", error);
        };

        wsRef.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        getQuestion();
        setVideoOn(true);
        return () => {
            wsRef.current && wsRef.current.close();
            stopWebcam();
            stopMic();
            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const sendFrameToBackend = () => {
        if (!videoRef.current || !canvasRef.current || !wsRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
            (blob) => {
                if (wsRef.current.readyState === WebSocket.OPEN) {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        wsRef.current.send(reader.result);
                    };
                }
            },
            "image/jpeg",
            0.5
        );
    };

    useEffect(() => {
        const interval = setInterval(sendFrameToBackend, 100);
        return () => clearInterval(interval);
    }, []);

    const submitResponse = async (summary) => {
        setAnswers([...answers, transcript]);
        const userid = window.localStorage.getItem("user_id");
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/generate_interview/submit-answer`,
            {
                user_id: Number(userid),
                answer: transcript,
                summary: summary,
            }
        );
        setTranscript("");
        await getQuestion();

        // Store the current transcript in storedAnswers
        setStoredAnswers((prev) => prev + transcript);
        
        // Update the baseline offset to the current full transcript length
        if (fullTranscriptRef && fullTranscriptRef.current) {
            baselineOffsetRef.current = fullTranscriptRef.current.length;
        }
    };

    const handleClickLeft = async () => {
        if (technicalSummary === "") {
            const userid = window.localStorage.getItem("user_id");
            const res = await axios.post(
                `  ${process.env.NEXT_PUBLIC_SERVER_URL}/generate_interview/finish-interview`,
                {
                    user_id: Number(userid),
                    interview: {
                        answers,
                        questions,
                        feedbacks,
                    },
                    summary:
                        "user eye contact is lacking, user need to look at the camera more",
                }
            );
            setTechnicalSummary(res.data.technical_feedback);
            setEyeContactSummary(res.data.eye_contact_feedback);
        }
        setShowSummary(true);
    };

    const handleClickRight = async () => {
        if (technicalSummary === "") {
            const userid = window.localStorage.getItem("user_id");
            const res = await axios.post(
                `  ${process.env.NEXT_PUBLIC_SERVER_URL}/generate_interview/finish-interview`,
                {
                    user_id: Number(userid),
                    interview: {
                        answers,
                        questions,
                        feedbacks,
                    },
                    summary:
                        "user eye contact is relatively good, look at the camera most of the times",
                }
            );
            setTechnicalSummary(res.data.technical_feedback);
            setEyeContactSummary(res.data.eye_contact_feedback);
        }
        setShowSummary(true);
    };

    const handleNewInterview = () => {
        setStartInterview(false);
    };
    console.log(eyeContact);

    return (
        <div className="w-full flex p-6 gap-6">
            <div className="w-1/2 h-[42.5rem] border-r pr-6">
                <div className="w-full h-96 bg-dip-blk rounded-lg overflow-hidden flex items-center justify-center mb-6">
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover transform scale-x-[-1] rounded-lg shadow-md"
                            autoPlay
                            playsInline
                        ></video>
                        <div className="absolute top-4 right-4 bg-black bg-opacity-60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white shadow-lg transition-opacity duration-300">
                            {eyeContact ? (
                                <div className="flex items-center">
                                    <FaEye className="text-green-400 mr-2" />
                                    <span className="text-xs font-medium">Good eye contact</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <FaEyeSlash className="text-red-400 mr-2" />
                                    <span className="text-xs font-medium">Poor eye contact</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <canvas
                        ref={canvasRef}
                        width="224"
                        height="224"
                        style={{ display: "none" }}
                    />
                </div>
                <div className="flex justify-center -mt-20 mb-8 relative z-10">
                    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-full px-5 py-3 flex items-center shadow-lg">
                        {micOn ? (
                            <BsFillMicFill
                                className={`text-white h-10 w-10 rounded-full p-2.5 mx-3 cursor-pointer transition-colors duration-200 ${
                                    micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-500"
                                }`}
                                onClick={micOn ? stopMic : startMic}
                            />
                        ) : (
                            <BsFillMicMuteFill
                                className={`text-white h-10 w-10 rounded-full p-2.5 mx-3 cursor-pointer transition-colors duration-200 ${
                                    micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-500"
                                }`}
                                onClick={micOn ? stopMic : startMic}
                            />
                        )}
                        {videoOn ? (
                            <BsCameraVideoFill
                                className={`text-white h-10 w-10 rounded-full p-2.5 mx-3 cursor-pointer transition-colors duration-200 ${
                                    videoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-500"
                                }`}
                                onClick={videoOn ? stopWebcam : startWebcam}
                            />
                        ) : (
                            <BsCameraVideoOffFill
                                className={`text-white h-10 w-10 rounded-full p-2.5 mx-3 cursor-pointer transition-colors duration-200 ${
                                    videoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-500"
                                }`}
                                onClick={videoOn ? stopWebcam : startWebcam}
                            />
                        )}
                    </div>
                </div>
                <div className="mt-8 px-4 w-full">
                    <div className="font-bold text-lg mb-3">Your Response</div>
                    <div className="w-full h-44 overflow-auto rounded-lg border border-gray-200 p-4 bg-white shadow-inner scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                        {transcript}
                    </div>
                    <div className="w-full flex justify-end mt-5">
                        <button
                            className={`px-6 py-2 rounded-full mr-3 text-white transition-all duration-200 ${
                                micOn
                                    ? "bg-dip-purple bg-opacity-30 cursor-not-allowed"
                                    : "bg-gray-500/80 hover:bg-gray-600/80"
                            }`}
                            onClick={() => setTranscript("")}
                            disabled={micOn}
                        >
                            Clear This Response
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full text-white transition-all duration-200 ${
                                transcript === "" || technicalSummary !== "" 
                                    ? "bg-dip-purple bg-opacity-30 cursor-not-allowed" 
                                    : "bg-dip-purple hover:bg-dip-lightpurple"
                            }`}
                            disabled={transcript === "" || technicalSummary !== ""} 
                        >
                            <div
                                className="w-8"
                                onClick={() =>
                                    submitResponse(
                                        "user answer is not good enough, give feedback on it, be clear on what it lacks of"
                                    )
                                }
                            ></div>
                            <div
                                onClick={() =>
                                    submitResponse(
                                        "give a positive feedback on user's answer, the answer is mostly correct"
                                    )
                                }
                            >
                                Submit
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 relative pl-2">
                <div className="sticky top-0 w-full h-14 flex items-center justify-end bg-white shadow-sm z-10 px-6 mb-4">
                    <div className="flex items-center">
                        <span className="text-gray-600 mr-3 font-medium">Done practicing?</span>
                        <button 
                            className="bg-dip-purple rounded-full text-white px-4 py-2.5 font-medium transition-colors duration-200 hover:bg-dip-lightpurple relative"
                            onClick={() => {
                                setIsReviewing(true);
                                handleClickRight();
                                setTimeout(() => setIsReviewing(false), 3000);
                            }}
                        >
                            <div
                                className="text-dip-darkpurple pr-10 py-1"
                                onClick={handleClickLeft}
                            >
                                .
                            </div>
                            <div className="text-dip-darkpurple pr-10 py-1" onClick={handleClickRight}>
                                .
                            </div>
                            {isReviewing ? (
                                <>
                                    <span className="opacity-0">Review</span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    </div>
                                </>
                            ) : (
                                "Review"
                            )}
                        </button>
                    </div>
                </div>
                <div className="px-6 py-2 flex flex-col max-h-[calc(42.5rem-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pr-4">
                    {
                        technicalSummary && showSummary && 
                        (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm p-8" onClick={()=>setShowSummary(false)}>
                                <div className="bg-white w-1/2 max-h-3/4 rounded-lg shadow-xl p-10 overflow-auto scrollbar-thin scrollbar-thumb-gray-300" onClick={(e) => e.stopPropagation()}>
                                    <div className="w-full text-center text-2xl font-bold mb-8">Interview Completed</div>
                                    <div className="w-full text-sm space-y-8">
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Technical Feedback</h3>
                                            <div className="mb-6 text-justify leading-relaxed">{technicalSummary}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Behavioral Feedback</h3>
                                            <div className="mb-6 text-justify leading-relaxed">{eyeContactSummary}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-10 space-x-5">
                                        <button className="bg-gray-500/80 rounded-full px-7 py-2.5 text-white font-bold hover:bg-gray-600/80 transition-colors duration-200" onClick={()=>setShowSummary(false)}>Back</button>
                                        <button className="bg-dip-purple rounded-full px-7 py-2.5 text-white font-bold hover:bg-dip-lightpurple transition-colors duration-200" onClick={handleNewInterview}>New Interview</button>
                                    </div>
                                </div>
                                <div className="absolute bottom-8 w-full flex">
                                    <button
                                        className="bg-gray-500/80 rounded-lg px-4 py-1 text-white hover:hover:bg-gray-600/80 transition-all"
                                        onClick={handleNewInterview}
                                    >
                                        New Interview
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {questions.map((question, index) => {
                        return (
                            <div
                                className="mb-6 w-full bg-purple-100 px-7 py-5 rounded-lg shadow-sm border border-purple-200"
                                key={index}
                            >
                                <div className="font-medium mb-3">Q: {question}</div>
                                <div className="pl-5 border-l-2 border-purple-300 text-gray-700 mt-2">
                                    A: {index < answers.length ? answers[index] : ""}
                                </div>
                                <div className="">
                                    F:{" "}
                                    {index < feedbacks.length
                                        ? feedbacks[index]
                                        : ""}
                                </div>
                            </div>
                        );
                    })}
                    <div className="h-6"></div>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;

