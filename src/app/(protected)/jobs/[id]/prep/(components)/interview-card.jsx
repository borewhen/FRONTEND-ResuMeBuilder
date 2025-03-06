import { useCompanyStore } from "@/store/useCompanyStore";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import transcriptapi from "@/lib/app/mock_interview/api/transcript";

export default function InterviewCard({setShowPopup, interviewDetails}) {
    const {category, item} = interviewDetails;
    const {companyName, positionName} = useCompanyStore();
    const [interviewBubble, setInterviewBubble] = useState(["Explain about yourself!"]);
    const [isRecording, setIsRecording] = useState(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async() => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const mediaRecorder = new MediaRecorder(stream, {mimeType: "audio/webm"});
            audioChunksRef.current = [];
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            }
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, {type: "audio/webm"});
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                setAudioBlob(audioBlob);
                setIsAudioLoaded(true);
            };
            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.log("Error accessing microphone:", err);
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
        if (mediaRecorderRef.current?.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    }

    const handleSubmit = () => {
        setInterviewBubble([...interviewBubble, transcript]);
        setIsRecording(false);
        setIsAudioLoaded(false);
        setTranscript("");
        setAudioUrl("");
        setAudioBlob(null);
    }

    useEffect(() => {
        if (!isAudioLoaded || !audioBlob) return;
        const fetchData = async() => {
            setIsLoading(true);
            try{
                const formData = new FormData();
                formData.append("file", audioBlob, "recording.webm");
                const response = await transcriptapi.post(formData);
                setTranscript(response.transcript.transcript);
                console.log("Transcript:", response);
            } catch(err) {
                console.log("Error getting transcript:", err);
            } finally {
                setIsLoading(false);
                setIsAudioLoaded(false);
            }
        }
        fetchData();
    }, [isAudioLoaded, audioBlob])


    return (
        <div className="absolute flex items-center justify-center w-full h-full top-0 left-0">
            <div className="absolute w-full h-full top-0 left-0 bg-[#00000030] z-0" onClick={()=>setShowPopup(false)}></div>
            <div className="absolute w-4/5 h-4/5 bg-white rounded-lg px-8 py-4 overflow-y-scroll" onClick={()=>{}}>
                <div className="text-2xl font-bold">{category}: {item}</div>
                <div className="text-sm">{positionName} @ {companyName}</div>
                <div className="w-full bg-dip-blk text-white text-center rounded-lg py-2">
                    <div className="text-xl font-bold mb-2">Not Attempted Yet</div>
                    <div className="mb-2 text-sm w-1/2 mx-auto italic">you will be given interview questions related to this topic. answer accordingly and we will give you feedbacks on how you answer our question</div>
                    <button className="rounded-full border-white border-[1px] px-4 py-1 ">Start Now!</button>
                </div>
                {
                    interviewBubble.map((bubble, index) => {
                        if (index%3 === 0 || index%3 === 1) return;
                        return (
                            <div className="w-full border-black border-2 rounded-lg px-4 py-2 mt-2 text-sm" key={index}>
                                {bubble}
                                {interviewBubble[index+1] && <div className="mt-8"><div className="font-bold">Your Response: </div>{interviewBubble[index+1]}</div>}
                                {interviewBubble[index+2] && <div className="mt-8"><div className="font-bold">Feedback: </div>{interviewBubble[index+2]}</div>}
                            </div>
                    )
                    })
                }                            
                
                <div className="flex items-center mt-4">
                    <div className="mr-4"><FaMicrophone className={clsx(isRecording? "bg-dip-80" : "", "h-20 w-20 p-4 rounded-full border-black border-2 hover:cursor-pointer")} onClick={()=> {isRecording? stopRecording(): startRecording()}}/></div>
                    {isRecording? <div>Listening ...</div> : transcript? <div>{transcript}</div> : isLoading? <div>Loading...</div> : <div>Press and Speak to Answer</div>}
                </div>
                <button className="border-2 font-bold px-4 py-2 rounded-full mt-2 border-black disabled:text-gray-300 disabled:border-gray-300" onClick={handleSubmit} disabled={transcript===""}>Submit Answer</button>
            </div>
        </div>
    )
}