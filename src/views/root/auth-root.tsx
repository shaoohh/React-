import type { FC } from "react";
import type { PropsWithChildren } from "react";
import useAppStore, { selectToken } from "@/store/app-store.ts";
import { Navigate, useNavigate } from "react-router-dom";
const AuthRoot: FC<PropsWithChildren> = ({ children }) => {
  //基于selector 选取派生的数据
  const token = useAppStore(selectToken);
  if (token) {
    //如果有token，说明已经登录了
    return <>{children}</>;
  } else {
    //没有token，说明没有登录，跳转到登录页面

    return <Navigate to="/login" replace />;
  }
};
export default AuthRoot;
