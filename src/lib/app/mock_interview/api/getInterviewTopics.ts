import FetchClient from "@/lib/utils/fetcher";
import { MockInterviewInterviewTopicList } from "@/lib/app/mock_interview/types";
import { MOCK_INTERVIEW_API_URL } from "@/lib/app/mock_interview/constants";
type FetchClientType = typeof FetchClient;

class GetInterviewTopicsApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = MOCK_INTERVIEW_API_URL;
    }

    async post(job_id: string): Promise<MockInterviewInterviewTopicList> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/${job_id}`,
                {},
            );
            const data: MockInterviewInterviewTopicList = await response.data;
            console.log(data)
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
}

const topicsapi = new GetInterviewTopicsApi(FetchClient);
export default topicsapi;