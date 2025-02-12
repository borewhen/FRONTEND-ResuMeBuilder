import FetchClient from "@/lib/utils/fetcher";
import { VideoUploadResponse } from "@/lib/app/video/types";
import { VIDEO_API_URL } from "@/lib/app/video/constants";
type FetchClientType = typeof FetchClient;

class VideoUploadApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = VIDEO_API_URL;
    }

    async post(videoData: FormData): Promise<VideoUploadResponse> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/upload_video`,
                videoData,
                false
            );

            const data: VideoUploadResponse = await response.data;
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
}

const uploadVideo = new VideoUploadApi(FetchClient);
export default uploadVideo;