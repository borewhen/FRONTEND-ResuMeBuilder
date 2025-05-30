import FetchClient from "@/lib/utils/fetcher";
import { UserLogin, UserLoginResponse } from "@/lib/app/user/types";
import { USER_API_URL } from "@/lib/app/user/constants";
type FetchClientType = typeof FetchClient;

class UserLoginApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = USER_API_URL;
    }

    async post(userData: UserLogin): Promise<UserLoginResponse> {
        try{
            const response = await this.httpClient.post(
                // `${this.serverUrl}/login`,
                `/api/login`,
                userData,
                false
            );
            const data: UserLoginResponse = await response.data;
            if (data?.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_id', data.user.id.toString());
                localStorage.setItem('user_email', data.user.email);
            }
            return data;
        } 
        catch(error: any){
            return error.response.data;
        }
    }
}


const login = new UserLoginApi(FetchClient);
export default login;
