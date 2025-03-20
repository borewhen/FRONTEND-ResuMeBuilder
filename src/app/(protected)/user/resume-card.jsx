"use client";

import { useState, useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { MdOutlineEdit } from "react-icons/md";
import { RxUpload } from "react-icons/rx";
import { TbPaperclip } from "react-icons/tb";

export default function ResumeCard() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (file) {
      const renderPDF = async () => {
        const loadingTask = pdfjs.getDocument(file);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const viewport = page.getViewport({ scale: 1});
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
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleRemoveResume = () => {
    setFile(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Resume</h2>
        <label htmlFor="resume" className="cursor-pointer">
          <RxUpload className="w-6 h-6 text-dip-80 hover:text-dip-100" />
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          name="resume"
          id="resume"
          hidden
        />
      </div>
      
      {file ? (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TbPaperclip className="w-5 h-5 text-dip-80" />
              <span className="text-md font-medium">{fileName}</span>
            </div>
            <button 
              onClick={handleRemoveResume}
              className="text-dip-80 hover:text-dip-100 text-xl font-medium px-2"
            >
              ×
            </button>
          </div>
          <canvas ref={canvasRef} className="border rounded-lg shadow-md w-full" />
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-500 cursor-default">
          No resume uploaded yet. Click the upload icon to add your resume.
        </div>
      )}
    </div>
  );
}
