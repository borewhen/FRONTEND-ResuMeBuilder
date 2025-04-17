// get
export interface Chapter {
    chapter_id: number;
    chapter_name: string;
    video_thumbnail: string;
    video_title: string;
    video_transcript: string;
    video_id: string;
}

export interface Unit {
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
    company_name: string;
    job_position: string;
}

// generate
export interface GenerateCourseResponse {
    course_id: number;
    message: string;
}
export interface UpdateCourseResponse {
    message: string;
}