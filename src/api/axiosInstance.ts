import { isDevelopment } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({});

// Interceptors in development used for debuggin purpose.
if (isDevelopment()) {
  // TODO Use request interceptor e.g for adding config option
  axiosInstance.interceptors.request.use(config => {
    console.log("Request intercepted, method:", config.method);
    if (config.headers.Authorization != null) {
      console.log("Request authorization header:", config.headers.Authorization);
    }
    return config;
  }, (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  });

  // TODO Use response interceptor e.g for handling response status
  axiosInstance.interceptors.response.use(response => {
    console.log("Response intercepted, status:", response.status);
    return response;
  }, (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  });
}

export { axiosInstance };
