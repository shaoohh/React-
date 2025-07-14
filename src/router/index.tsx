import { createBrowserRouter } from "react-router-dom";
//导入路由组件
import Reg, { action as regAction } from "@/views/auth/reg.tsx";
import Login, { action as loginAction } from "@/views/auth/login.tsx";

import Root, { loader as rootLoader } from "@/views/root/root.tsx";

import AuthLayout from "@/views/auth/auth-layout.tsx";
import AuthRoot from "@/views/root/auth-root.tsx";
import Home from "@/views/home/home.tsx";
import UserAvatar from "@/views/user/user-avatar";
import UserInfo, { action as userInfoAction } from "@/views/user/user-info";
import UserPassword, {
  action as userPwdAction,
} from "@/views/user/user-password";
import ArticleAdd from "@/views/article/article-add";
import ArticleCate from "@/views/article/article-cate";
import ArticleEdit from "@/views/article/article-edit";
import ArticleList from "@/views/article/article-list";
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

  {
    path: "/",
    element: (
      <AuthRoot>
        <Root />
      </AuthRoot>
    ),
    loader: rootLoader,
    children: [
      //索引路由
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user-info",
        element: <UserInfo />,
        action: userInfoAction,
      },
      {
        path: "user-avatar",
        element: <UserAvatar />,
      },
      {
        path: "user-pwd",
        element: <UserPassword />,
        action: userPwdAction,
      },
      {
        path: "art-cate",
        element: <ArticleCate />,
      },
      {
        path: "art-add",
        element: <ArticleAdd />,
      },
      {
        path: "art-edit/:id",
        element: <ArticleEdit />,
      },
      {
        path: "art-list",
        element: <ArticleList />,
      },
    ],
  },
]);

export default router;
