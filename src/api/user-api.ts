import axios from "@/api/index.ts";

//获取用户的基本信息
export const getUserApi = () =>
  axios.get<null, BaseResponse<User>>("/my/userinfo");

//左侧菜单项的接口

export const getMenuApi = () =>
  axios.get<null, BaseResponse<MenuItem[]>>("/my/menus");

//更新用户的基本信息
export const updateUserInfoApi = (data: FormData) =>
  axios.put<null, BaseResponse>("/my/userinfo", data);

//修改密码的接口
export const updateUserPwdApi = (data: FormData) =>
  axios.patch<null, BaseResponse>("/my/updatepwd", data);
