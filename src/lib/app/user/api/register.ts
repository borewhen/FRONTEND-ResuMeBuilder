import FetchClient from "@/lib/utils/fetcher";
import { UserRegister, UserRegisterResponse } from "@/lib/app/user/types";
import { USER_API_URL } from "@/lib/app/user/constants";

type FetchClientType = typeof FetchClient;

class UserRegisterApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = USER_API_URL;
    }

    async post(userData: UserRegister): Promise<UserRegisterResponse> {
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/register`,
                userData,
                false
            );

            const data = await response.data
            
            return data;
        }
        catch(error: unknown){
            throw error;
        }
    }
}


const register = new UserRegisterApi(FetchClient);
export default register;
