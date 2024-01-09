import useShellStore from "./store/shellStore";
import axios, { AxiosError } from "axios";
import { logError } from "./utils/utils";

interface ErrorResponseData {
  message?: string;
  [key: string]: any;
}

export interface StandardizedError {
  response?: any;
  message: string;
  statusCode?: number;
}

function processAxiosError(error: unknown): StandardizedError {
  let errorMessage = "An error occurred";
  let statusCode = null;
  let errorResponse = null;
  let errorResponseData: ErrorResponseData | null = null;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorResponse = error.response;
      errorResponseData = error.response.data as ErrorResponseData;
      errorMessage =
        errorResponseData?.message || "Server responded with an error";
      statusCode = error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from server";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || "Error setting up request";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  logError(error);
  return { message: errorMessage };
}

export function handleAxiosError(error: AxiosError) {
  const standardizedError = processAxiosError(error);
  return Promise.reject(standardizedError);
}

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("jwtToken") ||
      useShellStore.getState()?.userState?.loginData?.data?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => handleAxiosError(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

export default axiosInstance;
