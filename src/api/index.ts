import axios from "axios";
import config from "@/config.json";
import qs from "qs";
import type { AxiosRequestTransformer, AxiosError } from "axios";
import { message } from "antd";
const instance = axios.create({
  baseURL: config.baseURL,
  //timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-api-key": "ab428ee8-c6ae-4bee-86ca-a5bd3437cff5",
  },
});

//请求拦截器
instance.interceptors.request.use(
  function (config) {
    //如何为当前请求，挂载请求体转换器呢

    const url = config.url;
    const method = config.method?.toUpperCase();

    if (
      (url === "/my/article/add" && method === "POST") ||
      (url === "/my/article/info" && method === "PUT")
    ) {
      config.transformRequest = [];
    } else {
      config.transformRequest = requetTransformer;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
//响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      //有响应体的情况
      return response.data;
    } else {
      //无响应体的情况，自定义一个标准响应体
      return { code: 0, message: response.statusText };
    }
  },
  function (error: AxiosError<{ code: number; message: string }>) {
    //判断error中是否包含response对象
    //如果包含按照response 中的data.message提示用户
    //如果不包含，说明是网络错误，提示用户网络异常
    if (error.response && error.response.data) {
      message.error(error.response.data.message);
      return Promise.reject(error.response.data);
    } else {
      //无响应体的错误
      let msg = "";
      switch (error.code) {
        case "ERR_NETWORK":
          msg = "网络异常，请检查网络连接！";
          break;
        case "ECONNABORTED":
          msg = "请求超时，请检查网络连接！";
          break;
        default:
          msg = error.message;
      }
      message.error(msg);
      return Promise.reject({ code: 1, message: error.message });
    }
  }
);
//请求体转换器函数

const requetTransformer: AxiosRequestTransformer = (data) => {
  if (data instanceof FormData) {
    const obj = Object.fromEntries(data);
    return qs.stringify(obj);
  } else {
    return qs.stringify(data);
  }
};
export default instance;
