"use client";
import coursegetterapi from "@/lib/app/course/api/get";
import { useEffect, useState } from "react";
import { Course } from "@/lib/app/course/types";
import Link from "next/link";
import Image from "next/image";

type Courses = Course[];
export default function CoursePage() {
    const [courses, setCourses] = useState<Courses>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCourses = await coursegetterapi.getAll();
            setCourses(fetchedCourses);
        };
        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen">
            <div className="w-[56rem] mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mt-5">Your Courses</h1>
                {
                    !courses.length ? (
                        <div className="flex justify-center mt-24 flex-col items-center"> 
                            <Image src="/no_data.png" width={350} height={350} alt="No Data"/>
                            <div className="font-semibold text-lg">No Courses generated yet!</div>
                            <div>Tip: Do mock interviews to generate courses based on your skill gap</div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-xl">
                        {
                            courses.map((course) => (
                                <Link href={`/course/${course.course_id}`} key={course.course_id} className="p-4 border-b">
                                    <div className="flex items-center">
                                        <img src={course.image_url} alt="course" className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="ml-4">
                                            <h2 className="text-lg font-bold">{course.course_id}</h2>
                                            <p className="text-sm">{course.mock_interview_id}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    )
                }
            </div>
        </div>
    );
}