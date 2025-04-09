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

    // Eye Tracking
    const canvasRef = useRef(null);
    const wsRef = useRef(null);
    const [eyeContact, setEyeContact] = useState(true);

    // Summary
    const [summaryClicked, setSummaryClicked] = useState(false);
    const [summary, setSummary] = useState("");

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

    useEffect(() => {
        const interval = setInterval(sendFrameToBackend, 100);
        return () => clearInterval(interval);
    }, []);

    const submitResponse = async () => {
        setAnswers([...answers, transcript]);
        const userid = window.localStorage.getItem("user_id");
        const response = await axios.post(
            "http://localhost:8000/generate_interview/submit-answer",
            {
                user_id: Number(userid),
                answer: transcript,
            }
        );
        setTranscript("");
        await getQuestion();
    };

    const handleClickLeft = async () => {
        const userid = window.localStorage.getItem("user_id");
        const res = await axios.post(
            "  http://localhost:8000/generate_interview/finish-interview",
            {
                user_id: Number(userid),
                interview: {
                    answers,
                    questions,
                },
                summary:
                    "user eye contact is lacking, user need to look at the camera more",
            }
        );
        setSummary(res.data.technical_feedback + res.data.eye_contact_feedback);
    };

    const handleClickRight = async () => {
        const userid = window.localStorage.getItem("user_id");
        const res = await axios.post(
            "  http://localhost:8000/generate_interview/finish-interview",
            {
                user_id: Number(userid),
                interview: {
                    answers,
                    questions,
                },
                summary:
                    "user eye contact is relatively good, look at the camera most of the times",
            }
        );
        setSummary(res.data.technical_feedback + res.data.eye_contact_feedback);
    };

    const handleNewInterview = () => {
        setStartInterview(false);
    }

    return (
        <div className="w-full flex">
            <div className="w-1/2 h-[42.5rem] border-r">
                <div className="w-full h-96 bg-dip-blk items-center justify-center">
                    <video
                        ref={videoRef}
                        className="w-full h-full transform scale-x-[-1]"
                        autoPlay
                        playsInline
                    ></video>
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
                <div className="mt-2 px-2 w-full">
                    <div className="font-bold">Response</div>
                    <div className="w-full h-44 overflow-scroll">
                        {transcript}
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <button
                            className={clsx(
                                "bg-dip-purple  px-6 py-1 rounded-lg mx-2 text-white",
                                micOn
                                    ? "bg-opacity-30"
                                    : "hover:bg-dip-lightpurple"
                            )}
                            onClick={() => setTranscript("")}
                            disabled={micOn}
                        >
                            Restart
                        </button>
                        <button
                            className={clsx("bg-dip-purple px-6 py-1 rounded-lg mx-2 text-white", transcript == "" || summary !== "" ? "bg-opacity-30" : "hover:bg-dip-lightpurple")}
                            onClick={submitResponse}
                            disabled={transcript === "" || summary !== ""} 
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 max-h-[40rem] overflow-y-scroll">
                <div className="absolute w-[40rem] h-12 flex items-center justify-end bg-white shadow-md">
                    <button className={clsx("bg-dip-purple rounded-lg mx-2 text-white flex w-32", summary? "bg-opacity-30": "hover:bg-dip-lightpurple")}>
                        <div
                            className="w-1/2 text-dip-purple px-[0.8rem] py-1"
                            onClick={handleClickLeft}
                        >
                            .
                        </div>
                        <div className="pr-16 pt-1" onClick={handleClickRight}>
                            Summary
                        </div>
                    </button>
                    {
                        summary && <button className={clsx("bg-dip-purple rounded-lg mx-2 px-4 py-1 text-center text-white flex hover:bg-dip-lightpurple")} onClick={handleNewInterview}>New Interview</button>
                    }
                </div>
                <div className="mt-8 px-8 py-2 flex flex-col">
                    {
                        summary && <div className="mt-4"><b>Summary:</b><br></br>{summary}</div>
                    }
                    {questions.map((question, index) => {
                        return (
                            <div
                                className="mt-4 w-full bg-purple-300 px-4 py-2 rounded-md"
                                key={index}
                            >
                                <div className="">Q: {question}</div>
                                <div className="">
                                    A:{" "}
                                    {index < answers.length
                                        ? answers[index]
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
