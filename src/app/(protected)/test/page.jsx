"use client";
import { useEffect, useRef, useState } from "react";

const WebSocketURL = "ws://localhost:8000/interview/ws"; // Adjust if deployed

export default function WebcamStream() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const wsRef = useRef(null);
    const [eyeContact, setEyeContact] = useState(true);

    useEffect(() => {
        // Request webcam access
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(console.error);

        // Establish WebSocket connection
        wsRef.current = new WebSocket(WebSocketURL);

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setEyeContact(data.eye_contact); // Update UI with received person count
        };

        return () => {
            if (wsRef.current) wsRef.current.close();
        };
    }, []);

    const sendFrameToBackend = () => {
        if (!videoRef.current || !canvasRef.current || !wsRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(blob => {
            if (wsRef.current.readyState === WebSocket.OPEN) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    wsRef.current.send(reader.result); // Send base64 image
                };
            }
        }, "image/jpeg", 0.5);
    };

    useEffect(() => {
        const interval = setInterval(sendFrameToBackend, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline className="w-96 h-72 scale-x-[-1]" />
            <canvas ref={canvasRef} width="224" height="224" style={{ display: "none" }} />
            <h2 className="text-3xl">is making eye contact?: {eyeContact?"yes": "no"}</h2>
        </div>
    );
}
