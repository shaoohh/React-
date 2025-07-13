import React from "react";
import RootMenu from "@/components/root/menu";
import { Layout } from "antd";
import styles from "./css/root.module.less";
import logo from "@/assets/images/logo.svg";
import RootHeader from "@/components/root/header";
import useAppStore, { selectCollapsed } from "@/store/app-store";
import { initUser } from "@/store/user-store.ts";
import { getMenuApi } from "@/api/user-api";
import to from "await-to-js";
import { Outlet } from "react-router-dom";
const { Sider, Content, Footer } = Layout;

const Root: React.FC = () => {
  //从zustand中获取collapsed状态
  const collapsed = useAppStore(selectCollapsed);
  return (
    <Layout className={styles.container}>
      {/*  侧边栏    */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/*  logo    */}
        <div className={styles.boxLogo}>
          <img src={logo} alt="logo" className={styles.logo} />
          {/*按需展示文字*/}
          {!collapsed && <span className={styles.logoText}>文章管理系统</span>}
        </div>
        {/*  左侧菜单    */}
        <RootMenu />
      </Sider>
      <Layout>
        {/*  头部区    */}
        <RootHeader />
        {/*  内容区    */}
        <Content className={styles.content}>
          <Outlet />
        </Content>
        {/*  底部区    */}
        <Footer className={styles.footer}>Powered by 云烟成雨</Footer>
      </Layout>
    </Layout>
  );
};

export default Root;

export const loader = async () => {
  //在路由匹配成功后将要渲染root组件前先调用, 先调用下边的函数
  initUser();
  //获取左侧菜单的列表数据
  const [err, res] = await to(getMenuApi());
  if (err) {
    return null;
  }
  return { menus: res.data };
};
