import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { checkHaveToken, getToken } from "~/utils/token";
import { isProd } from "~/utils/env";
import Message from "~/components/Common/Message/useMessage";

export const baseURL = "http://localhost:3000";

export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  // if (checkHaveToken()) config.headers.Authorization = `Bearer ${getToken()}`;

  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    const { message } = error.response.data;

    httpStatusErrorHandler?.(message, error.response.status);
    Message.error(error.response.data.msg);

    return Promise.reject(error);
  }
);

type HttpStatusErrorHandler = (message: string, statusCode: number) => void;
let httpStatusErrorHandler: HttpStatusErrorHandler;
export function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler;
}
