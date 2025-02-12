"use client";

import React from 'react';
import { Typewriter } from "react-simple-typewriter";

interface InterviewAnalysisProps {
    transcript: string;
    analysis: string;
}

export default function InterviewAnalysis({transcript, analysis}: InterviewAnalysisProps) {
    return (
        <div className='bg-white rounded-xl text-sm'>
            <div className="px-8 py-6 border-b-8 border-b-dip-20 text-justify">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Video Transcript</h2>
                <p className="text-gray-600 leading-relaxed max-h-48 overflow-scroll pr-8">
                {transcript}
                </p>
            </div>
            <div className="bg-white rounded-xl px-8 py-6 text-justify">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your AI Coach says...</h2>
                <p className="text-gray-600 leading-relaxed">
                <Typewriter
                    words={[analysis]}
                    loop={1}
                    cursor={false}
                    typeSpeed={40}
                    deleteSpeed={0}
                />
                </p>
            </div>
        </div>
    )
}