import FetchClient from "@/lib/utils/fetcher";
import { SubcategorySummaryResponse, MockInterviewSummaryResponse } from "@/lib/app/mock_interview/types";
import { MOCK_INTERVIEW_API_URL } from "@/lib/app/mock_interview/constants";
type FetchClientType = typeof FetchClient;

class InterviewSummaryApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = MOCK_INTERVIEW_API_URL;
    }

    async subcategoryGet(subcategory_id: string): Promise<SubcategorySummaryResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/${subcategory_id}/summary`,
            );
            const data: SubcategorySummaryResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

    async mockinterviewGet(mockinterview_id: string): Promise<MockInterviewSummaryResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/summary/${mockinterview_id}`,
            );
            const data: MockInterviewSummaryResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }

}

const summaryapi = new InterviewSummaryApi(FetchClient);
export default summaryapi;