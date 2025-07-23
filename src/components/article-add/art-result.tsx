import type { FC } from "react";
import { Button, Result } from "antd";
import { useActionData, useNavigate } from "react-router-dom";
import { resetCurrent } from "@/store/art-add-store";
export const ArticleResult: FC = () => {
  const actionData = useActionData() as { msg: string } | null;
  const navigate = useNavigate();
  const gotoList = () => {
    //1.跳转文章列表界面
    navigate("/art-list");
    //2.重置current
    resetCurrent();
  };
  return (
    <Result
      status="success"
      title={actionData ? actionData.msg : "发布成功"}
      subTitle=""
      extra={[
        <Button type="primary" key="list" onClick={gotoList}>
          去文章列表
        </Button>,
        <Button key="rewrite" onClick={() => resetCurrent()}>
          再写一篇
        </Button>,
      ]}
    />
  );
};

export default ArticleResult;
