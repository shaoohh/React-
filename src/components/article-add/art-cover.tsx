import type { FC } from "react";
import { Space, Button, Avatar } from "antd";
import { setCurrent } from "@/store/art-add-store";
import { Move } from "@/store/art-add-store";
const ArticleCover: FC = () => {
  return (
    <>
      <Space direction="vertical">
        <Avatar size={300} shape="square">
          请选择文章封面
        </Avatar>
        <Space direction="horizontal">
          <Button type="primary" onClick={() => setCurrent(Move.prev)}>
            上一步
          </Button>
          <Button type="primary">选择</Button>
          <Button type="primary" onClick={() => setCurrent(Move.next)}>
            下一步
          </Button>
        </Space>
      </Space>
    </>
  );
};
export default ArticleCover;
