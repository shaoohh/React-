import { Menu } from "antd";
import type { FC } from "react";
import {
  HomeOutlined,
  ReadOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  FileAddOutlined,
  FileTextOutlined,
  UserOutlined,
  SolutionOutlined,
  PictureOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { useAsyncValue, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
const iconMap = {
  //键值对
  //icon的名字 ：要替换的图标
  HomeOutlined: <HomeOutlined />,
  ReadOutlined: <ReadOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  FileAddOutlined: <FileAddOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  UserOutlined: <UserOutlined />,
  SolutionOutlined: <SolutionOutlined />,
  PictureOutlined: <PictureOutlined />,
  KeyOutlined: <KeyOutlined />,
};
import type { MenuProps } from "antd";
import { useLocation } from "react-router-dom";
const rootSubmenuKeys = ["2", "3"];

const RootMenu: FC = () => {
  // const data = useLoaderData() as { menus: MenuItem[] };
  const [menuResult] = useAsyncValue() as [BaseResponse<MenuItem[]>, void];
  const menus = menuResult.data || [];
  //在函数式组件中不能按条件执行hook
  const navgiate = useNavigate();
  const location = useLocation();
  //默认被选中的菜单项
  const selectedKey = location.pathname === "/" ? "/home" : location.pathname;
  const [openKeys, setOpenKeys] = useState<string[]>([
    getOpenKey(menus, selectedKey),
  ]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // if (!data) return;
  // const { menus } = data;
  //递归处理每个菜单图标
  resolveMenuIcon(menus);
  const onMenuItemClick: MenuProps["onClick"] = ({ key }) => {
    //进行路由导航的跳转
    navgiate(key);
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      //defaultSelectedKeys={["1"]}
      items={menus}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={onMenuItemClick}
      selectedKeys={[selectedKey]}
    />
  );
};

//定义一个递归处理每个菜单图标的方法
const resolveMenuIcon = (menus: MenuItem[]) => {
  for (const menu of menus) {
    const iconName = menu.icon as keyof typeof iconMap;
    menu.icon = iconMap[iconName];
    if (menu.children) {
      resolveMenuIcon(menu.children);
    }
  }
};
//定义一个递归函数，递归查找当前选中的节点的父节点的key值并return
const getOpenKey = (
  menus: MenuItem[] | undefined,
  selectedKey: string,
  parentKey: string = ""
): string => {
  if (!menus) {
    return "";
  }
  for (const item of menus) {
    if (item.key === selectedKey) {
      return parentKey;
    }
    if (item.children) {
      const result = getOpenKey(item.children, selectedKey, item.key);
      if (result) {
        return result;
      }
    }
  }
  return "";
};
export default RootMenu;
