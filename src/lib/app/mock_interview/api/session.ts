import FetchClient from "@/lib/utils/fetcher";
import { InterviewSessionRequest, InterviewSessionGetResponse } from "@/lib/app/mock_interview/types";
import { MOCK_INTERVIEW_API_URL } from "@/lib/app/mock_interview/constants";
type FetchClientType = typeof FetchClient;

// not currently used, uncomment to implement
// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));


class InterviewSessionApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = MOCK_INTERVIEW_API_URL;
    }

    async get(subcategory_id: string): Promise<InterviewSessionGetResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/session/${subcategory_id}`,
            );
            const data: InterviewSessionGetResponse = await response.data;
            console.log(data)
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

    async post(subcategory_id: string): Promise<null> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/session/${subcategory_id}`,
                {},
            );
            const data = await response.data;
            console.log(data)
            return null
        } 
        catch(error: any){
            return error.response.data;
        }
    }
    
    async put(subcategory_id: string, body: InterviewSessionRequest): Promise<null> {
        try{
            const response = await this.httpClient.put(
                `${this.serverUrl}/session/${subcategory_id}`,
                body,
            );
            const data = await response.data;
            console.log(data)
            return null
        } 
        catch(error: any){
            return error.response.data;
        }
    }
}

const interviewsessionapi = new InterviewSessionApi(FetchClient);
export default interviewsessionapi;