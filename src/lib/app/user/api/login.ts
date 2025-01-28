import FetchClient from "@/lib/utils/fetcher";
import { UserData } from "@/lib/app/user/types";
import { USER_API_URL } from "@/lib/app/user/constants";

type FetchClientType = typeof FetchClient;

class UserLoginApi {
    httpClient: FetchClientType;
    serverUrl: string;

    constructor(httpClient: FetchClientType) {
        this.httpClient = httpClient;
        this.serverUrl = USER_API_URL;
    }

    async post(userData: UserData){
        try{
            const response = await this.httpClient.post(
                `${this.serverUrl}/login`,
                userData,
                false
            );

            const data = await response.data
            localStorage.setItem("email", data?.email);
            localStorage.setItem("username", data?.name);
            document.cookie = `access_token=${data?.token}; path=/; max-age=1800`;

            return data;
        }
        catch(error: unknown){
            throw error;
        }
    }

    async test(userData: UserData){
        try{
            
            localStorage.setItem("email", userData.email);
            localStorage.setItem("username", "test");
            document.cookie = "access_token=test; path=/; max-age=900";

            return {
                email: userData.email,
                username: "test",
                token: "test"
            };
        }
        catch(error: unknown){
            throw error;
        }
    }
}


const login = new UserLoginApi(FetchClient);
export default login;
