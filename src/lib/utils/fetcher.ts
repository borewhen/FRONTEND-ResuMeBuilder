import axios from 'axios';
import { AxiosRequestConfig } from "axios";

const FetchClient = {
    async get(url: string, config: AxiosRequestConfig = {}, includeAccessToken: boolean = true, includeCredentials: boolean = true) {
        const headers: Record<string, string> = {};
        if (includeAccessToken) {
            headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
        }

        return await axios.get(url, {
            ...config,
            headers,
            withCredentials: includeCredentials,
        });
    },

    async post(url: string, body: any, includeAccessToken: boolean = true, includeCredentials: boolean = true) {
        const headers: Record<string, string> = {};
        if (includeAccessToken) {
            headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
        }

        return await axios.post(url, body, {
            headers,
            withCredentials: includeCredentials,
        });
    },

    async put(url: string, body: any, includeAccessToken: boolean = true, includeCredentials: boolean = true) {
        const headers: Record<string, string> = {};
        if (includeAccessToken) {
            headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
        }

        return await axios.put(url, body, {
            headers,
            withCredentials: includeCredentials,
        });
    },

    async delete(url: string, includeAccessToken: boolean = true, includeCredentials: boolean = true) {
        const headers: Record<string, string> = {};
        if (includeAccessToken) {
            headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
        }

        return await axios.delete(url, {
            headers,
            withCredentials: includeCredentials,
        });
    }
};

export default FetchClient;
