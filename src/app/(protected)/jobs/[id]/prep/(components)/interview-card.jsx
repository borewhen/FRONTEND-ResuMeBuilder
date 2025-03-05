import { useCompanyStore } from "@/store/useCompanyStore";

export default function InterviewCard({setShowPopup, interviewDetails}) {
    const {category, item} = interviewDetails;
    const {companyName, positionName} = useCompanyStore();
    return (
        <div className="absolute flex items-center justify-center w-full h-full top-0 left-0">
            <div className="absolute w-full h-full top-0 left-0 bg-[#00000030] z-0" onClick={()=>setShowPopup(false)}></div>
            <div className="absolute z w-4/5 h-4/5 bg-white rounded-lg px-8 py-4" onClick={()=>{}}>
                <div className="text-2xl font-bold">{category}: {item}</div>
                <div className="text-sm">{positionName} @ {companyName}</div>
                <div className="w-full bg-dip-blk text-white text-center rounded-lg py-2">
                    <div className="text-xl font-bold mb-2">Not Attempted Yet</div>
                    <div className="mb-2 text-sm w-1/2 mx-auto italic">you will be given interview questions related to this topic. answer accordingly and we will give you feedbacks on how you answer our question</div>
                    <button className="rounded-full border-white border-[1px] px-4 py-1 ">Start Now!</button>
                </div>
            </div>
        </div>
    )
}