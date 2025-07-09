import { createBrowserRouter } from "react-router-dom";
//导入路由组件
import Reg, { action as regAction } from "@/views/auth/reg.tsx";
import Login, { action as loginAction } from "@/views/auth/login.tsx";
import Root from "@/views/root/root.tsx";
import AuthLayout from "@/views/auth/auth-layout.tsx";
const router = createBrowserRouter([
  {
    path: "/reg",
    action: regAction,
    element: (
      <AuthLayout>
        <Reg />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    action: loginAction,
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  { path: "/", element: <Root /> },
]);

export default router;
