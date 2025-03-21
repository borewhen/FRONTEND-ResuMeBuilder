"use client";
import clsx from "clsx";
import { useState } from "react";
import ResumeCard from "@/app/(protected)/user/resume-card";
import ProfileSummary from "@/app/(protected)/user/profile-summary";

const HomePage = () => {
  const [chosen, setChosen] = useState("profile");
  const name = "Seong Gi-hun";
  return (
    <div className="w-full min-h-screen bg-dip-20 py-8">
        <div className="w-[56rem] mx-auto">
          <div className="w-full h-36 rounded-lg bg-[url(https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467_1280.jpg)]"></div>
          <div className="rounded-full w-48 h-48 bg-dip-20 absolute left-[calc((100%-56rem)/2+2rem)] top-20 flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Seong_Gi-hun_season_1.png/220px-Seong_Gi-hun_season_1.png" alt="logo" className="w-48 h-48 rounded-full p-2 object-fill" />
          </div>
          <div className="flex w-full mt-4">
            <ProfileSummary />
            <div className="flex-1 ml-4 rounded-lg">
              <div className="flex justify-evenly pt-2 w-full bg-dip-40 rounded-lg">
                <div className={clsx(chosen==="profile"? "border-b-4 border-dip-100":"", "w-48 text-center text-dip-blk font-bold")} onClick={()=>setChosen("profile")}>Profile</div>
                <div className={clsx(chosen==="resume"? "border-b-4 border-dip-100":"", "w-48 text-center text-dip-blk font-bold")} onClick={()=>setChosen("resume")}>Resume</div>
              </div>

              {
                chosen === "resume" && <ResumeCard />
              }
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomePage;