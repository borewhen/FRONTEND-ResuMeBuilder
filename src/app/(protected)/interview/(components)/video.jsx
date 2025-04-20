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
    const [isPressed, setIsPressed] = useState(false);
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
        if (videoRef.current) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
        setVideoOn(false);
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
                let text = "";
                for (let i = 0; i < event.results.length; i++) {
                    text += event.results[i][0].transcript + " ";
                }
                setTranscript(text);
            };

            recognition.onerror = (event) =>
                console.error("Speech recognition error:", event);
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
            "http://localhost:8000/generate_interview/get-question",
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

        wsRef.current = new WebSocket("ws://localhost:8000/interview/ws");

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setEyeContact(data.eye_contact);
        };

        getQuestion();
        setVideoOn(true);
        return () => {
            if (wsRef.current) wsRef.current.close();
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

    // useEffect(() => {
    //     const interval = setInterval(sendFrameToBackend, 100);
    //     return () => clearInterval(interval);
    // }, []);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                setIsPressed(true);
            }
            console.log("key pressed");
        };
        
        const handleKeyUp = (e) => {
            if (e.code === 'Space') {
                setIsPressed(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        setEyeContact(isPressed);
    }, [isPressed])

    const submitResponse = async (summary) => {
        setAnswers([...answers, transcript]);
        const userid = window.localStorage.getItem("user_id");
        const response = await axios.post(
            "http://localhost:8000/generate_interview/submit-answer",
            {
                user_id: Number(userid),
                answer: transcript,
                summary: summary,
            }
        );
        setTranscript("");
        await getQuestion();
    };

    const handleClickLeft = async () => {
        if (technicalSummary === "") {
            const userid = window.localStorage.getItem("user_id");
            const res = await axios.post(
                "http://localhost:8000/generate_interview/finish-interview",
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
                "http://localhost:8000/generate_interview/finish-interview",
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
        <div className="w-full flex">
            <div className="w-1/2 h-[42.5rem] pr-6">
                <div className="w-full h-96 items-center justify-center rounded-lg relative">
                    <video
                        ref={videoRef}
                        className="w-full h-full transform scale-x-[-1] object-cover rounded-lg"
                        autoPlay
                        playsInline
                    ></video>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white shadow-lg transition-opacity duration-300">
                        <div className="flex items-center">
                            {eyeContact ? (
                                <>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 576 512"
                                        className="text-green-400 mr-2"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                                    </svg>
                                    <span className="text-xs font-medium">
                                        Good Eye Contact
                                    </span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 640 512"
                                        className="text-red-400 mr-2"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
                                    </svg>
                                    <span className="text-xs font-medium">
                                        Poor eye contact
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <canvas
                        ref={canvasRef}
                        width="224"
                        height="224"
                        style={{ display: "none" }}
                    />
                    <div className="flex relative top-[-4rem] w-full items-center justify-center">
                        {micOn ? (
                            <BsFillMicFill
                                className={clsx(
                                    "text-white h-12 w-12 rounded-full p-3 mx-2",
                                    micOn ? "bg-gray-600" : "bg-red-600"
                                )}
                                onClick={micOn ? stopMic : startMic}
                            />
                        ) : (
                            <BsFillMicMuteFill
                                className={clsx(
                                    "text-white h-12 w-12 rounded-full p-3 mx-2",
                                    micOn ? "bg-gray-600" : "bg-red-600"
                                )}
                                onClick={micOn ? stopMic : startMic}
                            />
                        )}
                        {videoOn ? (
                            <BsCameraVideoFill
                                className={clsx(
                                    "text-white h-12 w-12 rounded-full p-3 mx-2",
                                    videoOn ? "bg-gray-600" : "bg-red-600"
                                )}
                                onClick={videoOn ? stopWebcam : startWebcam}
                            />
                        ) : (
                            <BsCameraVideoOffFill
                                className={clsx(
                                    "text-white h-12 w-12 rounded-full p-3 mx-2",
                                    videoOn ? "bg-gray-600" : "bg-red-600"
                                )}
                                onClick={videoOn ? stopWebcam : startWebcam}
                            />
                        )}
                    </div>
                </div>
                <div className="px-2 w-full">
                    <div className="font-bold text-lg mt-6 mb-2">
                        🧾 Your Response
                    </div>
                    <div className="w-full h-44 overflow-auto rounded-lg border border-gray-200 p-4 bg-white shadow-inner scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                        {transcript}
                    </div>
                    <div className="w-full flex justify-end mt-4">
                        <button
                            className={clsx(
                                "bg-gray-500/80 px-6 py-1 rounded-lg mx-2 text-white transition-all",
                                micOn ? "bg-opacity-30" : "hover:bg-gray-600/80"
                            )}
                            onClick={() => setTranscript("")}
                            disabled={micOn}
                        >
                            Clear Response
                        </button>
                        <button
                            className={clsx(
                                "bg-dip-darkpurple py-1 rounded-lg mx-2 text-white flex pr-8",
                                transcript == "" || technicalSummary !== ""
                                    ? "bg-opacity-30"
                                    : "hover:bg-dip-purple"
                            )}
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
            <div className="w-1/2 max-h-[40rem] overflow-y-scroll rounded-md border">
                <div className="h-12 flex justify-between items-center bg-[#F9F9F9] shadow-md">
                    <div className="font-bold ml-4 text-lg">
                        ⭐ AI Interview
                    </div>
                    <button
                        className={clsx(
                            "bg-dip-darkpurple rounded-lg mx-2 text-white flex w-32 hover:bg-dip-darkpurple"
                        )}
                    >
                        <div
                            className="text-dip-darkpurple pr-10 py-1"
                            onClick={handleClickLeft}
                        >
                            .
                        </div>
                        <div className="pr-8 pt-1" onClick={handleClickRight}>
                            Finish
                        </div>
                    </button>
                </div>
                <div className="mt-8 px-8 py-2 flex flex-col">
                    {technicalSummary && showSummary && (
                        <div
                            className="absolute w-[100vw] h-[calc(100vh+8rem)] top-0 left-0 bg-opacity-30 z-10 bg-black overflow"
                            onClick={() => setShowSummary(false)}
                        >
                            <div className="absolute bg-white w-1/2 h-1/2 top-1/4 left-1/4 rounded-lg shadow-lg px-8 py-8 z-20">
                                <div className="w-full text-center text-2xl font-bold mb-4">
                                    Interview Completed
                                </div>
                                <div className="w-full text-sm">
                                    <b>Technical Feedback</b>
                                    <br></br>
                                    <div className="mb-8 text-justify">
                                        {technicalSummary}
                                    </div>
                                    <b>Behavioral Feedback</b>
                                    <br></br>
                                    <div className="mb-8 text-justify">
                                        {eyeContactSummary}
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
                        </div>
                    )}
                    {questions.map((question, index) => {
                        return (
                            <div
                                className="mt-4 w-full bg-purple-100 px-4 py-2 rounded-md"
                                key={index}
                            >
                                <div className="">Q: {question}</div>
                                <div className="">
                                    A:{" "}
                                    {index < answers.length
                                        ? answers[index]
                                        : ""}
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
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
