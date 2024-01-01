import { AxiosError } from "axios";
import { logError } from "../utils/utils";

export function handleRequestError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logError(error.response);
    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    logError(error.request);
    return Promise.reject(error);
  } else {
    // Something happened in setting up the request that triggered an Error
    logError(error);
    return Promise.reject(error);
  }
}

export function handleResponseError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logError(error.response);
    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    logError(error.request);
    return Promise.reject(error);
  } else {
    // Something happened in setting up the request that triggered an Error
    logError(error);
    return Promise.reject(error);
  }
}
