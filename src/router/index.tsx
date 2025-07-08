import {createBrowserRouter} from "react-router-dom";
//导入路由组件
import Reg from "@/views/auth/reg.tsx";
import Login from "@/views/auth/login.tsx";
import Root from "@/views/root/root.tsx";
import AuthLayout from "@/views/auth/auth-layout.tsx";
const router = createBrowserRouter([
    {path: '/reg',element: <AuthLayout><Reg /></AuthLayout>},
    {path: '/login',element: <AuthLayout><Login /></AuthLayout>},
    {path: '/',element: <Root />},
])

export default router;