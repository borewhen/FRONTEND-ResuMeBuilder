import FetchClient from "@/lib/utils/fetcher";
import { JobScraperField, JobScraperResponse } from "@/lib/app/job/types";
import { JOB_API_URL } from "@/lib/app/job/constants";
type FetchClientType = typeof FetchClient;

class JobScraperApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = JOB_API_URL;
    }

    async get(jobData: JobScraperField): Promise<JobScraperResponse> {
        try{
            const response = await this.httpClient.get(
                `${this.serverUrl}/`,
                { params: jobData }
            );

            const data: JobScraperResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response?.data;
        }
    }
}


const scraper = new JobScraperApi(FetchClient);
export default scraper;
