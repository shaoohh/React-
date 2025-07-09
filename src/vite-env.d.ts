/// <reference types="vite/client" />

//----------请求体的数据类型----------
type RegForm = {
  username: string;
  password: string;
  repassword: string;
};

type LoginForm = Omit<RegForm, "repassword">;

//----------接口返回的数据类型--------------------
interface BaseResponse {
  code: number;
  message: string;
}

interface LoginResponse extends BaseResponse {
  token: string; // 登录成功后返回的token
}
