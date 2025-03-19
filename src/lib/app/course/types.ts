// get
interface Chapter {
    chapter_id: number;
    chapter_name: string;
    video_thumbnail: string;
    video_title: string;
    video_transcript: string;
}

interface Unit {
    unit_id: number;
    course_id: number;
    unit_name: string;
    chapters: Chapter[];
}

export interface Course {
    course_id: number;
    image_url: string;
    mock_interview_id: number;
    user_id: number;
    units: Unit[];
}

// generate
export interface GenerateCourseResponse {
    course_id: number;
    message: string;
}
export interface UpdateCourseResponse {
    message: string;
}