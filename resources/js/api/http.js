import axios from 'axios';

import {getToken, removeTokenFromStorage, setTokenToStorage} from "../utils/token.js";
import {API_ROUTES} from "./api_routes.js";

const http = axios.create({
    baseURL: `/api/v1/`,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Change request data/error here
http.interceptors.request.use(
    (config) => {
        const token = getToken();
        config.headers.Authorization = `Bearer ${token ? token : ''}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use((res) => {
    return res;
},
    async function (error) {
        const {response} = error;
        if (response.status === 401 && response.data?.message == 'Unauthenticated.') {
            removeTokenFromStorage();
        }
        return Promise.reject(error);
    })
export default http;
