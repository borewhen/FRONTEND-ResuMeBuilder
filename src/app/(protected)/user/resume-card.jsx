"use client";

import { useState, useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { MdOutlineEdit } from "react-icons/md";

export default function ResumeCard() {
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const canvasRef = useRef(null);

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
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="w-full mt-4 bg-dip-40 rounded-lg mx-auto">
        <div className="flex justify-between border-b border-b-dip-100 items-center">
            <h2 className="text-lg font-semibold py-1 mx-4">Your Resume</h2>
            <label htmlFor="resume" className="flex justify-center items-center">
                <MdOutlineEdit className="text-3xl text-dip-blk cursor-pointer mx-4 rounded-full hover:bg-dip-60 p-1"/>
            </label>
            
        </div>
      
      <div className="w-full px-4 py-4">
        <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            name="resume"
            id="resume"
            hidden
        />
        {file? (
            <div className="mt-2">
                <canvas ref={canvasRef} className="border rounded-lg shadow-md" />
            </div>
        ):
        <div className="mt-2 text-sm">No resume uploaded yet.</div>
        }
      </div>       
    </div>
  );
}
