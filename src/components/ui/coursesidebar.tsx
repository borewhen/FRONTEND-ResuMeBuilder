"use client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Sidebar } from "flowbite-react";

const CourseSidebar: FunctionComponent<any> = ({
    course,
    currentChapterId,
}) => {
    return (
        <Sidebar className="sticky top-0 h-[calc(100vh-90px)] w-[500px]">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {
                        course?.units.map((unit, unitIndex) => {
                            return (
                                <div>
                                    <Sidebar.Collapse label={`Section ${unitIndex+1}: ${unit.unit_name}`} key={unit.unit_id} className="font-bold text-2xl border-b-2 py-3">
                                    {
                                        unit?.chapters.map((chapter, chapterIndex) => {
                                            return (
                                                <Link href={`/course/${course?.course_id}/${unitIndex}/${chapterIndex}`}>
                                                    <Sidebar.Item key={chapter.chapter_id} className="text-left">{chapterIndex+1}. {chapter.chapter_name}</Sidebar.Item>
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