import axios from "@/api/index.ts";

//注册的API接口
export const regApi = (data: FormData) =>
  axios.post<null, BaseResponse>("/api/reg", data);
//登录的API接口
export const loginApi = (data: FormData) =>
  axios.post<null, LoginResponse>("/api/login", data);
