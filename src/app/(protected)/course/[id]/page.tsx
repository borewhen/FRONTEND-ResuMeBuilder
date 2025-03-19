"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import coursegetterapi from "@/lib/app/course/api/get";
import { Course } from "@/lib/app/course/types";

export default function CoursePage() {
    const {id} = useParams();
    const [course, setCourse] = useState<Course>({course_id: 0, image_url: "", mock_interview_id: 0, user_id: 0, units: []});

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCourse = await coursegetterapi.getById(Number(id));
            setCourse(fetchedCourse);
            console.log(fetchedCourse);
        };
        fetchData();
    }, [id]);

    return (
        <div className="w-full min-h-screen bg-dip-20">
            <div className="w-[56rem] mx-auto py-8">
                <div className="bg-white rounded-lg shadow-xl">
                    {
                        course.units.map((unit) => (
                            <div key={unit.unit_id} className="p-4 border-b">
                                <h2 className="text-lg font-bold">{unit.unit_name} course</h2>
                                {
                                    unit.chapters.map((chapter) => (
                                        <div key={chapter.chapter_id} className="p-4 border-b">
                                            <h3 className="text-lg font-bold">{chapter.video_title}</h3>
                                            <img src={chapter.video_thumbnail} alt="video thumbnail" className="w-20 h-20 object-cover rounded-lg" />
                                            <p className="text-sm">{chapter.video_transcript}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
    
}