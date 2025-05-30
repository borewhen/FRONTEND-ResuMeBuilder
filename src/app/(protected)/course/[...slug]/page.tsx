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
    // Always call useParams unconditionally
    const params = useParams();

    // If params.slug is defined, cast it as a string array; otherwise use an empty array.
    const slug: string[] = Array.isArray(params?.slug)
        ? params.slug
        : params?.slug
        ? [params.slug]
        : [];

    // Check if we have at least three values.
    const hasValidSlug = slug.length >= 3;

    // Destructure the values (default to empty strings if invalid)
    const [courseId, unitIndexParam, chapterIndexParam] = hasValidSlug
        ? slug
        : ["", "", ""];

    // Always call hooks
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (courseId) {
            const fetchCourseDetail = async () => {
                setLoading(true);
                const courseDetail = await coursegetterapi.getById(parseInt(courseId));
                setCourse(courseDetail);
                setLoading(false);
            };

            fetchCourseDetail();
        }
    }, [courseId]);

    // Return an error if we don't have valid slug values.
    if (!hasValidSlug) {
        return <>Something went wrong</>;
    }

    // Convert parameters to numbers.
    const unitIndex = parseInt(unitIndexParam);
    const chapterIndex = parseInt(chapterIndexParam);

    const unit = course?.units[unitIndex];
    const chapter = unit?.chapters[chapterIndex];
    const currentChapterId = chapter?.chapter_id
        ? String(chapter.chapter_id)
        : null;

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
                    course={course}
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
        </>
    );
};

export default CourseDetail;
