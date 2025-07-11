import type { FC } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Avatar } from "antd";
import useAppStore, { selectCollapsed } from "@/store/app-store";
import { setCollapsed } from "@/store/app-store";
import styles from "./css/header.module.less";
import Logout from "@/components/root/logout.tsx";
import useUserStore, { selectAvatar, selectName } from "@/store/user-store.ts";
import RootBreadcrumb from "@/components/root/breadcrumb.tsx";
const { Header } = Layout;
const RootHeader: FC = () => {
  //从zustand中获取collapsed状态
  const collapsed = useAppStore(selectCollapsed);
  const name = useUserStore(selectName);
  const avatar = useUserStore(selectAvatar);
  return (
    <Header className={styles.container}>
      <div className={styles.boxLeft}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className={styles.btnCollapsed}
        />
        <span>欢迎：{name}，您当前的位置是</span>
        {/*  封装并实现面包屑 */}
        <RootBreadcrumb />
      </div>
      <div>
        {/*头像*/}

        {avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />}
        {/* 退出登录组件 */}
        <Logout />
      </div>
    </Header>
  );
};
export default RootHeader;
