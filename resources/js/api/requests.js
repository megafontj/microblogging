import http from "../api/http.js";
import {API_ROUTES} from "../api/api_routes.js";

export const getAccount = async (setAccountInfo) => {
    const response = await http.post(API_ROUTES.GET_ACCOUNT);
    setAccountInfo(response.data.data);
}

export const getAccountByUsername = async (username) => {
    return await http.get(`${API_ROUTES.USERS}/${username}`);
}

export const initialChatWithUser = async (user_id) => {
    return await http.post(API_ROUTES.INIT_CHAT, {user_id});
}

export const getMessages = async (request, setMessages) => {
    const res = await http.post(API_ROUTES.CHAT_SEARCH_MESSAGES, request);
    setMessages(res?.data?.data)
}
