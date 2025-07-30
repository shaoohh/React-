import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { RouterProvider, matchPath } from "react-router-dom";
import router from "@/router";
// 全局样式表
import "@/index.less";
//第一个参数 是pattern模式，可以是路由的path地址
//第二个参数，是实际的URL地址
const result = matchPath("/art-edit/:id", "/art-edit/123");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
