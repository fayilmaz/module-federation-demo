import { AxiosError } from "axios";

export function handleRequestError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    console.warn("Error", error.response);
    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    console.warn("Error", error.request);
    return Promise.reject(error);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.warn("Error", error.message);
    return Promise.reject(error);
  }
}

export function handleResponseError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    console.warn("Error", error.response);
    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    console.warn("Error", error.request);
    return Promise.reject(error);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.warn("Error", error.message);
    return Promise.reject(error);
  }
}
