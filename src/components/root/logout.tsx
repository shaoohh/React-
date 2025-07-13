import { Button, message, Popconfirm } from "antd";
import type { FC } from "react";
import { resetAllStore } from "@/store/resetters.ts";
import { useNavigate } from "react-router-dom";
const Logout: FC = () => {
  const navigate = useNavigate();
  const confirm = () => {
    // 清除所有store数据
    resetAllStore();
    // 提示用户
    message.success("退出登录成功");
    // 刷新页面
    navigate("/login");
  };
  return (
    <Popconfirm
      title="退出登录"
      description="您确定退出登录吗?"
      onConfirm={confirm}
      okText="确定"
      cancelText="取消"
    >
      <Button type="link">Logout</Button>;
    </Popconfirm>
  );
};
export default Logout;
