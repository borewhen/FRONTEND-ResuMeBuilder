"use client";
import coursegetterapi from "@/lib/app/course/api/get";
import { useEffect, useState } from "react";
import { Course } from "@/lib/app/course/types";
import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Courses = Course[];
export default function CoursePage() {
    const [courses, setCourses] = useState<Courses>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedCourses = await coursegetterapi.getAll();
                setCourses(fetchedCourses);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen">
            <div className="w-[56rem] mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mt-5">
                    Your Courses ({courses.length})
                </h1>
                
                {isLoading ? (
                    <div className="flex justify-center mt-24">
                        <div className="animate-pulse text-lg">Loading courses...</div>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="flex justify-center mt-24 flex-col items-center">
                        <Image
                            src="/no_data.png"
                            width={350}
                            height={350}
                            alt="No Data"
                        />
                        <div className="font-semibold text-lg">
                            No Courses generated yet!
                        </div>
                        <div>
                            Tip: Do mock interviews to generate courses based on
                            your skill gap
                        </div>
                    </div>
                ) : (
                    <div className="mt-12 flex gap-5 flex-wrap">
                        {courses.map((course, courseIndex) => (
                            <Link
                                href={`/course/${course.course_id}/0/0`}
                                key={course.course_id}
                            >
                                <Card className="w-[250px] h-[280px] flex flex-col items-center justify-between text-center shadow-sm hover:shadow-xl hover:scale-[1.03] transition duration-300 rounded-xl bg-dip-greyishwhite hover:cursor-pointer">
                                    <CardHeader className="flex items-center justify-center pt-6 h-25 bg-white w-full rounded-t-xl">
                                        <div className="absolute top-2 right-2 bg-dip-purple text-white text-xs px-2 py-1 rounded-full">
                                            #{courseIndex + 1}
                                        </div>
                                        <img
                                            src={course.image_url}
                                            alt={`${course.company_name} Logo`}
                                            className="w-20 h-20 object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder-logo.png";
                                            }}
                                        />
                                    </CardHeader>

                                    <CardContent className="flex flex-col items-center flex-1 pt-5">
                                        <CardTitle className="font-bold text-lg text-indigo-700">
                                            {course.company_name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 text-sm leading-tight mt-1">
                                            {course.job_position}
                                        </CardDescription>
                                    </CardContent>
                                    
                                    <CardFooter className="w-full pb-4">
                                        <div className="w-full text-gray-500 text-xs">
                                            {course.units.length} units • {course.units.reduce((total, unit) => total + unit.chapters.length, 0)} lessons
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
