import FetchClient from "@/lib/utils/fetcher";
import { Course } from "@/lib/app/course/types";
import { COURSE_API_URL } from "@/lib/app/course/constants";
type FetchClientType = typeof FetchClient;

type Courses = Course[];

class CourseGetter {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = COURSE_API_URL;
    }

    async getAll(): Promise<Courses> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}`,
                {},
            );
            const data: Courses = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

    async getById(courseId: number): Promise<Course> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/${courseId}`,
                {},
            );
            console.log(response);
            const data: Course = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
        
}

const coursegetterapi = new CourseGetter(FetchClient);
export default coursegetterapi;