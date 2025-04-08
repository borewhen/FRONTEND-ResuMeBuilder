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
                    {course?.units.map((unit: any, unitIndex: any) => {
                        return (
                            <div key={unit.unit_id}>
                                <Sidebar.Collapse
                                    label={`Section ${unitIndex + 1}: ${
                                        unit.unit_name
                                    }`}
                                    className="font-bold text-md border-b-2 py-3 rounded-none"
                                >
                                    {unit?.chapters.map(
                                        (chapter: any, chapterIndex: any) => {
                                            return (
                                                <Link
                                                    href={`/course/${course?.course_id}/${unitIndex}/${chapterIndex}`}
                                                    key={chapter.chapter_id}
                                                >
                                                    <div
                                                        key={chapter.chapter_id}
                                                        className="text-sm py-2 pl-5 hover:bg-[#F3F4F6] cursor-pointer"
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
