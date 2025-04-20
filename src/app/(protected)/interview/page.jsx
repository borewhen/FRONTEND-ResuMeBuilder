"use client";

import React from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { useState, useEffect, useRef } from "react";
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import VideoPage from "@/app/(protected)/interview/(components)/video";
import axios from "axios";

const UploadResumePage = () => {
    const [startInterview, setStartInterview] = useState(false);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [showFile, setShowFile] = useState(false);
    const [userid, setUserid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef(null);
    const [resumeLoading, setResumeLoading] = useState(false);

    useEffect(() => {
        if (fileUrl && showFile) {
            const renderPDF = async () => {
                const loadingTask = pdfjs.getDocument(fileUrl);
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                const viewport = page.getViewport({ scale: 0.9 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise;
            };

            renderPDF();
        }
    }, [fileUrl, showFile]);

    useEffect(() => {
        setUserid(window.localStorage.getItem("user_id"));
        const getQuestion = async () => {
            const userid = window.localStorage.getItem("user_id");
            const response = await axios.post(
                "http://localhost:8000/generate_interview/get-question",
                {
                    user_id: Number(userid),
                }
            );
            const data = await response.data.questions;
            setStartInterview(data.length > 0);
            setIsLoading(false);
        };
        getQuestion();
        return () => {
            setFile(null);
            setFileUrl(null);
            setFileName(null);
            setShowFile(false);
        };
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFileName(selectedFile.name);
            setFileUrl(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const submitResume = async () => {
        const formData = new FormData();
        formData.append("user_id", Number(userid));
        formData.append("resume", file);
        setResumeLoading(true);
        try {
            await axios
                .post(
                    "http://localhost:8000/generate_interview/start-interview",
                    formData
                )
                .then((response) => {
                    console.log(response);
                    setStartInterview(true);
                })
                .catch((error) => {
                    console.log(error);
                });
            setFile(null);
            setFileUrl(null);
            setFileName(null);
            setShowFile(false);
            setResumeLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return isLoading ? (
        <></>
    ) : (
        <div className="w-full flex min-h-screen">
            <div className="w-full flex items-center justify-center flex-col px-6">
                {startInterview ? (
                    <VideoPage setStartInterview={setStartInterview} />
                ) : (
                    <div>
                        <div className="hover:bg-dip-greyishwhite">
                            <label
                                className="font-bold border px-20 py-16 rounded-md border-dashed border-dip-blk text-sm flex flex-col items-center"
                                htmlFor="resume"
                            >
                                <FaCloudUploadAlt className="w-12 h-12" />
                                Drag & drop a file here, or click to select one
                            </label>
                            <input
                                type="file"
                                accept="application/pdf"
                                id="resume"
                                hidden
                                onChange={handleFileChange}
                            />
                            {showFile && (
                                <div
                                    className="fixed w-screen h-screen bg-black bg-opacity-30 top-0 left-0 mx-auto flex justify-center items-center"
                                    onClick={() => setShowFile(false)}
                                >
                                    <canvas
                                        ref={canvasRef}
                                        className="border rounded-lg shadow-md mx-auto overflow-scroll"
                                    />
                                </div>
                            )}
                        </div>
                        {file ? (
                            <div className="w-[29rem] mt-2 px-4 py-4 rounded-md  bg-dip-purple flex items-center justify-between hover:bg-dip-lightpurple">
                                <button
                                    className=" text-white text-left hover:underline"
                                    onClick={() => setShowFile(true)}
                                >
                                    {fileName}
                                </button>
                                <FaRegTrashAlt
                                    className="w-8 h-8 p-2 rounded-full text-white hover:cursor-pointer hover:bg-black"
                                    onClick={() => setFileUrl(null)}
                                />
                            </div>
                        ) : (
                            <div>
                                Please upload your resume to start the
                                interview.
                            </div>
                        )}
                        <div>
                            <button
                                className="bg-dip-purple text-white px-8 py-4 mt-2 rounded-md w-full disabled:bg-opacity-50 hover:bg-dip-lightpurple flex justify-center gap-2 items-center"
                                disabled={file === null}
                                onClick={submitResume}
                            >
                                {resumeLoading ? (
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
                                ) : (
                                    <></>
                                )}
                                Start Interview
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadResumePage;
