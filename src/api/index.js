import axios from "axios";

import AuthService from "./services/auth.js";
import UserService from "./services/user.js"
import ConversationService from "./services/conversation.js"
import { h } from "vue";
import conversation from "./services/conversation.js";

const baseURL = "https://api-psicologo-ia.vercel.app"

const httpClient = axios.create({ baseURL });

let isRefreshing = false;

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token-auth");

  if (token) {
    config.headers["token-auth"] = token;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          localStorage.setItem("token-auth", response.data.user_token, {
            expires: 7,
            secure: true,
            sameSite: "lax",
          });

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.user_token}`;

          return axios(originalRequest);
        } catch (error) {
          localStorage.removeItem("token-auth");

          window.location.href = "/";

          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return axios(originalRequest);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient),
  conversation: ConversationService(httpClient)
};