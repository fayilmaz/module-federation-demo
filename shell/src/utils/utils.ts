import { AxiosError, AxiosResponse } from "axios";

export const logError = (error: AxiosError | AxiosResponse) => {
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;
    console.warn("Error", axiosError);
  } else {
    const response = error as AxiosResponse;
    console.warn("Error", response.status, response);
  }
};
