import type { FC } from "react";
import { Breadcrumb } from "antd";

type BreadcrumbItem = {
  title: string;
};
const RootBreadcrumb: FC = () => {
  const items: BreadcrumbItem[] = [
    {
      title: "Home",
    },
    {
      title: "Application Center",
    },
    {
      title: "Application List",
    },
    {
      title: "An Application",
    },
  ];
  return <Breadcrumb items={items} />;
};
export default RootBreadcrumb;
