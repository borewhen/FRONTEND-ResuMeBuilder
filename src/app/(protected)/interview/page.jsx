"use client";

import React from 'react';
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import VideoPage from '@/app/(protected)/interview/(components)/video';
import axios from 'axios';

const UploadResumePage = () => {
    const [startInterview, setStartInterview] = useState(false);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [showFile, setShowFile] = useState(false);
    const [userid, setUserid] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setUserid(window.localStorage.getItem('user_id'));
    }, []);

    useEffect(() => {
        if (fileUrl && showFile) {
          const renderPDF = async () => {
            const loadingTask = pdfjs.getDocument(fileUrl);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
    
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
    
            const viewport = page.getViewport({ scale: 0.9});
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

    const submitResume = async() => {
        setIsSubmitting(true);
        if (!file || !userid) return;

        const formData = new FormData();
        formData.append('user_id', Number(userid));
        formData.append('resume', file);

        try {
            const startResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/generate_interview/start-interview`, formData);
            console.log("Start interview response:", startResponse);

            const questionResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/generate_interview/get-question`, {
                user_id: Number(userid)
            });
            
            const questions = questionResponse.data.questions;
            setStartInterview(questions.length > 0);
        } catch (error) {
            console.error("Error submitting resume:", error);
        } finally {
            setIsSubmitting(false);
        }
        
        setFile(null);
        setFileUrl(null);
        setFileName(null);
        setShowFile(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
    }

    return (
        isLoading ? 
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-dip-purple"></div>
            </div>
         : 
            <div className='w-full flex min-h-screen'>
            <div className='w-full flex items-center justify-center flex-col'>
              { startInterview ? <VideoPage setStartInterview={setStartInterview}/>: 
                <div className="flex flex-col items-center justify-center w-full">
                  <div className='hover:scale-103 transition-all duration-300 items-center w-full flex justify-center'>
                      <label className='font-bold border px-20 py-16 rounded-lg border-dashed border-dip-blk text-sm hover:cursor-pointer flex flex-col items-center justify-center' htmlFor='resume'>
                          <FaCloudUploadAlt className='w-12 h-12 mb-2'/>
                          Drag & drop your resume here, or click to browse your files.
                      </label>
                      <input 
                        type='file' 
                        accept="application/pdf" 
                        id='resume' 
                        hidden 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      {
                          showFile &&
                          <div className='fixed w-screen h-screen bg-black bg-opacity-30 top-0 left-0 mx-auto flex justify-center items-center' onClick={()=>setShowFile(false)}>
                              <canvas ref={canvasRef} className="border rounded-lg shadow-md mx-auto overflow-scroll" />
                          </div>
                          
                      }
                  </div>
                  {
                      file?
                      <div className='w-[29rem] mt-8 px-4 py-4 rounded-full border-2 border-dip-purple flex items-center justify-between'>
                          <button className='ml-4 text-dip-purple font-bold text-left hover:underline' onClick={()=>setShowFile(true)}>
                              {fileName}
                          </button>
                          <FaRegTrashAlt 
                            className='w-8 h-8 p-2 rounded-full text-dip-purple hover:cursor-pointer hover:bg-black' 
                            onClick={() => {
                              setFileUrl(null);
                              setFile(null);
                              setFileName('');
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                          />
                      </div>
                      :
                      <div className='text-dip-purple/80 text-sm text-center mt-4 w-full'>
                          <i>No file uploaded.</i>
                      </div>
                  }
                  <div className='mt-8 w-[29rem] flex justify-center'>
                    <button 
                      className='bg-dip-purple text-white font-bold px-8 py-4 rounded-full w-full disabled:bg-opacity-50 hover:bg-dip-lightpurple relative'
                      disabled={file===null || isSubmitting}
                      onClick={submitResume}>
                        {isSubmitting ? (
                          <>
                            <span className="opacity-0">Start Interview</span>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                            </div>
                          </>
                        ) : (
                          "Start Interview"
                        )}
                    </button>
                  </div>
                </div>
            }
            </div>
        </div>
    )
}

export default UploadResumePage;