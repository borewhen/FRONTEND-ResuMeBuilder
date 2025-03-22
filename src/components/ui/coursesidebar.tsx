"use client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Sidebar } from "flowbite-react";

const CourseSidebar: FunctionComponent<any> = ({
    course,
    currentChapterId,
}) => {
    return (
        <Sidebar className="sticky top-0 w-[350px] h-screen">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {
                        course?.units.map((unit, unitIndex) => {
                            return (
                                <div>
                                    <Sidebar.Collapse label={`Section ${unitIndex+1}: ${unit.unit_name}`} key={unit.unit_id} className="font-bold text-md border-b-2 py-3 rounded-none">
                                    {
                                        unit?.chapters.map((chapter, chapterIndex) => {
                                            return (
                                                <Link href={`/course/${course?.course_id}/${unitIndex}/${chapterIndex}`}>
                                                    <div
                                                        key={chapter.chapter_id}
                                                        className="text-sm py-2 pl-5 hover:bg-[#F3F4F6] cursor-pointer"
                                                        >
                                                        {chapterIndex + 1}. {chapter.chapter_name}
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                    </Sidebar.Collapse>
                                </div>
                                
                            )
                        })
                    }
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default CourseSidebar;