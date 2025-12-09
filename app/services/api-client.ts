import axios, { AxiosError, CanceledError } from "axios";

export interface ErrorResponse {
  responseCode: number;
  responseMessage: string;
}

export interface APIResponse<T> {
  responseCode: number;
  responseMessage: string;
  data: T;
}

export default axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { AxiosError, CanceledError };
