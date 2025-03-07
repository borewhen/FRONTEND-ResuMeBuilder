import FetchClient from "@/lib/utils/fetcher";
import { InterviewSummaryResponse } from "@/lib/app/mock_interview/types";
import { MOCK_INTERVIEW_API_URL } from "@/lib/app/mock_interview/constants";
type FetchClientType = typeof FetchClient;

const dummyResponseGet: InterviewSummaryResponse = {
    summary: "This is a summary.",
};
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

class InterviewSummaryApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = MOCK_INTERVIEW_API_URL;
    }

    async get(subcategory_id: string): Promise<InterviewSummaryResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/summary/${subcategory_id}`,
            );
            const data: InterviewSummaryResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

    async dummyGet(subcategory_id: string): Promise<InterviewSummaryResponse> {
        await delay(2000);
        return dummyResponseGet;
    }
}

const summaryapi = new InterviewSummaryApi(FetchClient);
export default summaryapi;