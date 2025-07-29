import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "";
const baseURL = apiBase + "/api";

console.log("Axios baseURL =", baseURL);

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("➡️ API request:", config.baseURL, config.url);
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
