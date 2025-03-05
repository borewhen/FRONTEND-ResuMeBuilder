import FetchClient from "@/lib/utils/fetcher";
import { MockInterviewTranscriptResponse } from "@/lib/app/mock_interview/types";
import { MOCK_INTERVIEW_API_URL } from "@/lib/app/mock_interview/constants";
type FetchClientType = typeof FetchClient;

class MockInterviewTranscriptApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = MOCK_INTERVIEW_API_URL;
    }

    async post(file: FormData): Promise<MockInterviewTranscriptResponse> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/transcript`,
                file,
            );
            const data: MockInterviewTranscriptResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
}

const transcriptapi = new MockInterviewTranscriptApi(FetchClient);
export default transcriptapi;