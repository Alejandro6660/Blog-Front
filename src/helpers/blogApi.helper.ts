import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";

export const API = axios.create({
  baseURL: getEnvVariables().VITE_API_URL,
});

API.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return {
      ...config,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);
