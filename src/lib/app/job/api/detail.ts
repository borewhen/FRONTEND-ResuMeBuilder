import FetchClient from "@/lib/utils/fetcher";
import { JobDetailResponse } from "@/lib/app/job/types";
import { JOB_API_URL } from "@/lib/app/job/constants";
type FetchClientType = typeof FetchClient;

class JobDetailsApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = JOB_API_URL;
    }

    async get(jobId: string): Promise<JobDetailResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/${jobId}`,
            );

            const data: JobDetailResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response?.data;
        }
    }

    async getDescription(jobId: string): Promise<string> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/${jobId}/description`,
            );

            const data: string = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response?.data;
        }
    }
}

const jobdetail = new JobDetailsApi(FetchClient);
export default jobdetail;
