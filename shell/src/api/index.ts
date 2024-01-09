import axios, { AxiosError } from "axios";
import axiosInstance from "../axios";

export const getApi = async (url: string) => {
  try {
    const getResponse = await axiosInstance.get(url);
    return getResponse.data;
  } catch (error) {
    throw error;
  }
};

export const postApi = async (url: string, payload: any) => {
  try {
    const postResponse = await axiosInstance.post(url, { ...payload });
    return postResponse.data;
  } catch (error) {
    throw error;
  }
};

export const patchApi = async (url: string, payload: any) => {
  try {
    const patchResponse = await axiosInstance.patch(url, { ...payload });
    return patchResponse.data;
  } catch (error) {
    throw error;
  }
};

export const deleteApi = async (url: string, payload: any) => {
  try {
    const deleteResponse = await axiosInstance.patch(url, { ...payload });
    return deleteResponse.data;
  } catch (error) {
    throw error;
  }
};
