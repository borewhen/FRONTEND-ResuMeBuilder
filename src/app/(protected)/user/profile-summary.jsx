import { MdOutlineModeEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

export default function ProfileSummary(){
    const name = "Seong Gi-Hun";
    return(
        <div className="w-64 h-[9.5rem] bg-dip-40 rounded-lg">
            <div className="w-full h-20 flex justify-end p-1 mb-2 text-3xl"><MdOutlineModeEdit className="p-1 hover:bg-dip-60 rounded-full cursor-pointer"/></div>
            <div className="w-full text-center mt-2 font-semibold">
            {name}
            </div>
            <div className="flex justify-center items-center text-sm">
                <div className="text-center text-dip-100 text-lg mr-1"><CiLocationOn/></div>
                <div className="text-center text-dip-100">Singapore, Singapore</div>
            </div>
        </div>
    )
}