import axios from 'axios';

const FetchClient = {
    async get(url:string, includeAccessToken:boolean = true, includeCredentials:boolean = true) {
        if (includeAccessToken) {
            return await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                withCredentials: includeCredentials,
            });
        } else {
            return await axios.get(url, {withCredentials: includeCredentials});
        }
    },
    async post(url:string, body: any, includeAccessToken = true, includeCredentials:boolean = true) {
        if (includeAccessToken) {
            return await axios.post(url, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                withCredentials: includeCredentials,
            });
        } else {
            return await axios.post(url, body, {withCredentials: includeCredentials});
        }
    },
    async put(url:string, includeAccessToken = true, includeCredentials:boolean = true) {
        if (includeAccessToken) {
            return await axios.put(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                withCredentials: includeCredentials,
            });
        } else {
            return await axios.put(url, null, {withCredentials: includeCredentials});
        }
    },
    async delete(url: string, includeAccessToken = true, includeCredentials:boolean = true) {
        if (includeAccessToken) {
            return await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                withCredentials: includeCredentials,
            });
        } else {
            return await axios.delete(url, {withCredentials: includeCredentials});
        }
    }
};

export default FetchClient;