"use client";
import React from 'react';
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

const UploadResumePage = ({setResumeReady}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [showFile, setShowFile] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (file && showFile) {
          const renderPDF = async () => {
            const loadingTask = pdfjs.getDocument(file);
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
      }, [file, showFile]);
    
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFileName(selectedFile.name);
            setFile(URL.createObjectURL(selectedFile));
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const submitResume = async() => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post('http://localhost:8000/interview_questions/manage-interview', formData)
            .then((response) => {
                console.log(response);
                setResumeReady(true);
            })
            .catch((error) => {
                console.log(error);
            });

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full flex min-h-screen'>
            <div className='w-[80rem] ml-20 flex items-center justify-center flex-col'>
                <div className='hover:bg-dip-greyishwhite'>
                    <label className='font-bold border px-20 py-16 rounded-md border-dashed border-dip-blk text-sm flex flex-col items-center' htmlFor='resume'>
                        <FaCloudUploadAlt className='w-12 h-12'/>
                        Drag & drop a file here, or click to select one
                    </label>
                    <input type='file' accept="application/pdf" id='resume' hidden onChange={handleFileChange}/>
                    {
                        showFile &&
                        <div className='fixed w-screen h-screen bg-black bg-opacity-30 top-0 left-0 mx-auto flex justify-center items-center' onClick={()=>setShowFile(false)}>
                            <canvas ref={canvasRef} className="border rounded-lg shadow-md mx-auto overflow-scroll" />
                        </div>
                        
                    }
                </div>
                {
                    file?
                    <div className='w-[29rem] mt-2 px-4 py-4 rounded-md  bg-dip-purple flex items-center justify-between hover:bg-dip-lightpurple'>
                        <button className=' text-white text-left hover:underline'  onClick={()=>setShowFile(true)}>
                            {fileName}
                        </button>
                        <FaRegTrashAlt className='w-8 h-8 p-2 rounded-full text-white hover:cursor-pointer hover:bg-black' onClick={()=>setFile(null)}/>
                    </div>:
                    <div>
                        Please upload your resume to start the interview.
                    </div>
                }
                <div>
                    <button className='bg-dip-purple text-white px-8 py-4 mt-2 rounded-md w-full disabled:bg-opacity-50 hover:bg-dip-lightpurple' disabled={file===null} onClick={submitResume}>Start Interview</button>
                </div>
            </div>
        </div>
    )
}

export default UploadResumePage;