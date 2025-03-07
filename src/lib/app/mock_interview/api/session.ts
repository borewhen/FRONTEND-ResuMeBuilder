import FetchClient from "@/lib/utils/fetcher";
import { InterviewSessionRequest, InterviewSessionResponse } from "@/lib/app/mock_interview/types";
import { MOCK_INTERVIEW_API_URL } from "@/lib/app/mock_interview/constants";
type FetchClientType = typeof FetchClient;

const dummyResponseGet: InterviewSessionResponse = {
    questions: [
        "What is your name?",
        "What is your age?",
        "What is your favorite color?",
    ],
    answers: [
        "My name is John Doe.",
        "I am 25 years old.",
        "My favorite color is blue.",
    ],
    feedbacks: [
        "Good job!",
        "Nice answer!",
        "Great!",
    ],
    status: "not-attempted",
};

const dummyResponsePost: InterviewSessionResponse = {
    questions: [
        "Explain the concept of OOP.",
    ],
    answers: [
    ],
    feedbacks: [
    ],
    status: "in-progress",
};

const dummyResponsePut: InterviewSessionResponse = {
    questions: [
        "Explain the concept of OOP.",
    ],
    answers: [
    ],
    feedbacks: [
        "Good job!",
    ],
    status: "completed",
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

class InterviewSessionApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = MOCK_INTERVIEW_API_URL;
    }

    async get(subcategory_id: string): Promise<InterviewSessionResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/session/${subcategory_id}`,
            );
            const data: InterviewSessionResponse = await response.data;
            console.log(data)
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

    async post(subcategory_id: string): Promise<InterviewSessionResponse> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/session/${subcategory_id}`,
                {},
            );
            const data: InterviewSessionResponse = await response.data;
            console.log(data)
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
    
    async put(subcategory_id: string, body: InterviewSessionRequest): Promise<InterviewSessionResponse> {
        try{
            const response = await this.httpClient.put(
                `${this.serverUrl}/session/${subcategory_id}`,
                body,
            );
            const data: InterviewSessionResponse = await response.data;
            console.log(data)
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

    async dummyGet(subcategory_id: string): Promise<InterviewSessionResponse> {
        await delay(2000);
        return dummyResponseGet;
    }

    async dummyPost(subcategory_id: string): Promise<InterviewSessionResponse> {
        await delay(2000);
        return dummyResponsePost;
    }

    async dummyPut(subcategory_id: string, body: InterviewSessionRequest): Promise<InterviewSessionResponse> {
        await delay(2000);
        const response = {...dummyResponsePut, answers: [...dummyResponsePut.answers, body.answer]};
        console.log(response)
        return response;
    }
}

const interviewsessionapi = new InterviewSessionApi(FetchClient);
export default interviewsessionapi;