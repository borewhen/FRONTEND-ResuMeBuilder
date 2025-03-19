import FetchClient from "@/lib/utils/fetcher";
import { GenerateCourseResponse, UpdateCourseResponse } from "@/lib/app/course/types";
import { COURSE_API_URL } from "@/lib/app/course/constants";
type FetchClientType = typeof FetchClient;


class CourseGenerator {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = COURSE_API_URL;
    }

    async generate(mockInterviewId: number): Promise<GenerateCourseResponse> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/${mockInterviewId}`,
                {},
            );
            const data: GenerateCourseResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
    
    async update(courseId: number): Promise<UpdateCourseResponse> {
        try{
            const response = await this.httpClient.put(
                `${this.serverUrl}/${courseId}`,
                {},
            );
            const data: UpdateCourseResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
}

const coursegeneratorapi = new CourseGenerator(FetchClient);
export default coursegeneratorapi;