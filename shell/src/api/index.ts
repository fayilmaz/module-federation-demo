import { AxiosError } from "axios";
import axiosInstance from "../axios";

export const getApi = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error: AxiosError | any) {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 404) {
        throw error;
      }
    } else {
      throw new Error("An error occured while fetching data");
    }
  }
};

export const postApi = async (url: string, payload: any) => {
  return axiosInstance
    .post(url, { ...payload })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 404) {
          throw error;
        }
      } else {
        throw new Error("An error occured while fetching data");
      }
    });
};
