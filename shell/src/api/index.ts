import axiosInstance from "../axios";

export const getApi = async (url: string) => {
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        throw error;
      }
      if (error.response && error.response.status === 404) {
        throw error;
      } else {
        throw error;
      }
    });
};

export const postApi = async (url: string, payload: any) => {
  return axiosInstance
    .post(url, { ...payload })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        throw error;
      }
      if (error.response && error.response.status === 404) {
        throw error;
      } else {
        throw error;
      }
    });
};
