import useShellStore from "shell/shellStore";
import axios from "axios";
import { handleRequestError, handleResponseError } from "./api/errorHandling";

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
  (error) => handleRequestError(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleResponseError(error)
);

export default axiosInstance;
