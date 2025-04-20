"use client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Sidebar } from "flowbite-react";

interface CourseSidebarProps {
    course: any;
    currentChapterId: string | null;
}

const CourseSidebar: FunctionComponent<CourseSidebarProps> = ({
    course,
    currentChapterId,
}) => {
    return (
        <Sidebar className="sticky top-0 w-[350px] h-screen">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link href="/course">
                        <div className="flex items-center gap-2 p-3 hover:bg-[#F3F4F6] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            <span>Back to Courses</span>
                        </div>
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    {course?.units.map((unit: any, unitIndex: any) => {
                        return (
                            <div key={unit.unit_id}>
                                <Sidebar.Collapse
                                    label={`Section ${unitIndex + 1}: ${
                                        unit.unit_name.length > 20? unit.unit_name.slice(0, 20) + "..." : unit.unit_name
                                    }`}
                                    className="font-bold text-md text-dip-purple border-b-2 py-3 rounded-none"
                                >
                                    {unit?.chapters.map(
                                        (chapter: any, chapterIndex: any) => {
                                            const isActive = currentChapterId === String(chapter.chapter_id);
                                            return (
                                                <Link
                                                    href={`/course/${course?.course_id}/${unitIndex}/${chapterIndex}`}
                                                    key={chapter.chapter_id}
                                                >
                                                    <div
                                                        key={chapter.chapter_id}
                                                        className={`text-sm py-2 pl-5 hover:bg-[#F3F4F6] cursor-pointer ${
                                                            isActive ? "bg-[#E5E7EB] font-medium" : ""
                                                        }`}
                                                    >
                                                        {chapterIndex + 1}.{" "}
                                                        {chapter.chapter_name}
                                                    </div>
                                                </Link>
                                            );
                                        }
                                    )}
                                </Sidebar.Collapse>
                            </div>
                        );
                    })}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default CourseSidebar;
