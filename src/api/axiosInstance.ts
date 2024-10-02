import { isDevelopment } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true
});

// Interceptors in development used for debug purpose.
if (isDevelopment()) {
  axiosInstance.interceptors.request.use(config => {
    console.log("Request intercepted, method:", config.url);
    return config;
  }, (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(response => {
    console.log("Response intercepted, status:", response.status);
    return response;
  }, (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  });
}

export { axiosInstance };
