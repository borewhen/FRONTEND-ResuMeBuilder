"use client";
import { useParams } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import CourseSidebar from "@/components/ui/coursesidebar";
import MainVideoSummary from "@/components/ui/mainvideosummary";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { MoonLoader } from "react-spinners";
import coursegetterapi from "@/lib/app/course/api/get";
import { Chapter, Course, Unit } from "@/lib/app/course/types";

interface Props {}

const CourseDetail: FunctionComponent<Props> = () => {
    const { slug } = useParams();
    const [courseId, unitIndexParam, chapterIndexParam] = Array.isArray(slug) ? slug : [];
    const [course, setCourse] = useState<Course | null>(null);
    // const [loading, setLoading] = useState(false);
    const [loading] = useState(false);
    
    useEffect(() => {
        const fetchCourseDetail = async () => {
            const courseDetail = await coursegetterapi.getById(parseInt(courseId));
            setCourse(courseDetail)
        }

        fetchCourseDetail();
    }, [courseId]);

    if (!unitIndexParam || !chapterIndexParam) {
        return <>Something went wrong</>;
    }
    const unitIndex = parseInt(unitIndexParam);
    const chapterIndex = parseInt(chapterIndexParam);

    const unit = course?.units[unitIndex];
    const chapter = unit?.chapters[chapterIndex];
    const currentChapterId = chapter?.chapter_id ? String(chapter.chapter_id) : null;

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-5">
                <MoonLoader
                    color="#000"
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <>
            <div className="flex">
                <CourseSidebar
                    course={course || null}
                    currentChapterId={currentChapterId}
                />
                <div className="flex flex-1">
                    <MainVideoSummary
                        chapter={chapter as Chapter}
                        chapterIndex={chapterIndex}
                        unit={unit as Unit}
                        unitIndex={unitIndex}
                        currentChapterId={currentChapterId}
                    />
                </div>
            </div>
            
            {currentChapterId && (
                <div className="text-center mt-4 text-gray-500">
                    Current Chapter ID: {currentChapterId}
                </div>
            )}
        </>
    );
};

export default CourseDetail;