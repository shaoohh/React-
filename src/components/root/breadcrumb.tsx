import type { FC } from "react";
import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import { useLocation, matchPath, useAsyncValue } from "react-router-dom";
import { useMemo } from "react";
type BreadcrumbItem = {
  title: string;
};
const RootBreadcrumb: FC = () => {
  // const loaderData = useLoaderData() as { menus: MenuItem[] } | null;
  const [menuResult] = useAsyncValue() as [BaseResponse<MenuItem[]>];
  const menus = useMemo(() => menuResult.data || [], [menuResult]);
  const location = useLocation();
  const nowPath = location.pathname === "/" ? "/home" : location.pathname;
  //递归处理面包屑 只有loaderData，nowPath发生变化时才重新计算
  //useMemo 用于缓存计算结果，只有依赖项发生变化时才重新
  const items = useMemo(
    () => resolveBreadcrumbItems(menus, nowPath),
    [menus, nowPath]
  );
  return <Breadcrumb items={items} />;
};

const resolveBreadcrumbItems = (
  menus: MenuItem[] | undefined,
  nowPath: string,
  breadcrumbItems: BreadcrumbItem[] = []
): BreadcrumbItem[] | undefined => {
  if (!menus) {
    return undefined;
  }
  for (const item of menus) {
    const matchResult = matchPath(item.key, nowPath);
    if (matchResult) {
      breadcrumbItems.unshift({ title: item.label });
      return breadcrumbItems;
    }
    if (item.children) {
      const result = resolveBreadcrumbItems(
        item.children,
        nowPath,
        breadcrumbItems
      );
      //result 有两种结果
      //1. result 是一个数组，说明找到了
      //2. result 是 undefined，说明没有找到
      if (result) {
        //找到了追加父节点
        breadcrumbItems.unshift({ title: item.label });
        return breadcrumbItems;
      }
    }
  }
};
export default RootBreadcrumb;
