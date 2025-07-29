import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

console.log("NEXT_PUBLIC_API_BASE_URL =", process.env.NEXT_PUBLIC_API_BASE_URL);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("➡️ API request:", config.baseURL, config.url);
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
