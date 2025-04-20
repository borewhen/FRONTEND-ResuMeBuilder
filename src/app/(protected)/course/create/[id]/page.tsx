"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import coursegetterapi from "@/lib/app/course/api/get";
import coursegeneratorapi from "@/lib/app/course/api/generate";
import MoonLoader from "react-spinners/MoonLoader";
import { Course } from "@/lib/app/course/types";

interface Props {}

const CreateSubTopicsPage: FunctionComponent<Props> = () => {
    const params = useParams();
    const router = useRouter();

    const id = typeof params?.id === "string" ? params.id : undefined;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);
    const [isCourseLoading, setCourseLoading] = useState(false);

    useEffect(() => {
        if (id) {
            console.log("Course create page, id =", id);
            const getCourseDetail = async () => {
                setCourseLoading(true)
                const course_details = await coursegetterapi.getById(Number(id));
                setCourse(course_details)
                setCourseLoading(false)
            }

            getCourseDetail();
        }
    }, [id])

    if (!id) {
        return <div>Something went wrong — missing course id.</div>;
    }

    const generateSubTopicContent = async () => {
        try {
            setLoading(true);
            await coursegeneratorapi.update(Number(id));
            router.push(`/course/${id}/0/0`);
            setLoading(false);
            toast.success('Course generated successfully', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (err) {
            toast.error('Error has occured', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        isCourseLoading ? (
            <div className="w-full h-full flex justify-center items-center">
                <MoonLoader
                color="#030510"
                loading={true}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
            </div>
        ) : (
            <div className="py-28 flex justify-center items-center">
            <div>
                <p className="text-lg">COURSE</p>
                <h1 className="font-bold text-black text-4xl">
                    {course?.company_name}
                </h1>
                <h1 className="text-gray-700 text-xl">
                    {course?.job_position}
                </h1>
                <div className="bg-[#F5F5F4] rounded-full shadow-md px-4 py-5 mt-5 flex gap-3 items-center">
                    <AlertCircle className="text-[#5FA5F9]" size={35} />
                    <p className="text-md italic">
                        We suggest the following topics for you to sharpen your technical skills. <br />
                        Click on the &quot;Generate&quot; button below and sit back while we generate a useful course!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[2000px]">
                    {course?.units &&
                        course?.units.map((unit, index) => (
                        <div className="mt-8" key={index}>
                            <p className="text-[#767574] font-semibold">UNIT {index + 1}</p>
                            <h2 className="text-2xl font-bold">{unit?.unit_name}</h2>
                            <div className="mt-2 flex flex-col gap-2">
                            {unit?.chapters &&
                                unit?.chapters.map((chapter, index) => (
                                <div className="bg-[#F5F5F4] py-3 px-5 rounded-full shadow-md" key={index}>
                                    {chapter?.chapter_name}
                                </div>
                                ))}
                            </div>
                        </div>
                        ))}
                </div>


                <div className="mt-12 flex items-center gap-5 justify-center">
                    <div className="flex gap-2">
                        <Button
                            className={`rounded-full px-6 py-2.5 font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg
                                ${loading 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-dip-purple text-white hover:translate-y-[-2px]"}
                            `}
                            onClick={generateSubTopicContent}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <span>Generate</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </div>
        )   
    );
};

export default CreateSubTopicsPage;
