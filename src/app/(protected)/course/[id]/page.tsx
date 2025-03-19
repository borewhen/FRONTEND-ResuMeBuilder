"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import coursegetterapi from "@/lib/app/course/api/get";
import { Course, Unit } from "@/lib/app/course/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import clsx from "clsx";

export default function CoursePage() {
    const {id} = useParams();
    const [course, setCourse] = useState<Course>({course_id: 0, image_url: "", mock_interview_id: 0, user_id: 0, units: []});
    const [selectedUnit, setSelectedUnit] = useState<Unit>({unit_id: 0, unit_name: "", chapters: [], course_id: 0});

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCourse = await coursegetterapi.getById(Number(id));
            setCourse(fetchedCourse);
            setSelectedUnit(fetchedCourse.units[0]);
            console.log(fetchedCourse);
        };
        fetchData();
    }, [id]);

    const capitalize = (s: string) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return (
        <div className="w-full min-h-screen bg-dip-20">
            <div className="w-[56rem] mx-auto py-8 flex justify-between">
                <div className="w-64 h-56 bg-white flex-0 px-4 py-2 font-bold rounded-lg shadow-xl">
                    <div className="">Course Material</div>
                    {
                        course.units.map((unit) => (
                            <div className={clsx("text-sm px-4 py-2 overflow hover:bg-gray-100 hover:underline border-l-4 font-normal overflow-x-hidden", selectedUnit.unit_id === unit.unit_id? "border-l-blue-500 bg-gray-100": "border-transparent bg-transparent")}
                                onClick={() => {setSelectedUnit(unit);}}
                                key={unit.unit_id}>
                                {capitalize(unit.unit_name)}
                            </div>
                        ))  
                    }
                </div>
                <div className="w-[38rem] px-4 py-2 bg-white rounded-xl shadow-xl">
                    <h1 className="text-xl font-bold">{capitalize(selectedUnit.unit_name)}</h1>
                    <Accordion type="single" collapsible className="w-full">
                        {
                            selectedUnit.chapters.map((chapter) => chapter.video_title && (
                                <AccordionItem value={String(chapter.chapter_id)} key={chapter.chapter_id} className="mb-4 ">
                                    <AccordionTrigger className="hover:bg-gray-100 px-4">{capitalize(chapter.chapter_name)}</AccordionTrigger>
                                    <AccordionContent className="">
                                        <img src={chapter.video_thumbnail} className="w-1/2 mx-auto"/>
                                        <div className="mx-auto text-center text-xs w-1/2 mt-2 mb-4">{chapter.video_title}</div>
                                        <div className="text-sm text-justify">{chapter.video_transcript}</div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>

                </div>
            </div>
        </div>
    );
    
}