import type { FC } from "react";
import { Result, Button, Spin } from "antd";
import { useRevalidator, useAsyncError } from "react-router-dom";
import { useEffect, useState } from "react";
const LoaderErrorElement: FC = () => {
  const revalidator = useRevalidator();
  const [reload, setReload] = useState(false);
  const error = useAsyncError();
  const reloadHandler = () => {
    revalidator.revalidate();
    setReload(true);
  };
  useEffect(() => {
    if (error) {
      setReload(false);
    }
  }, [error]);
  return (
    <Spin spinning={reload} tip="加载数据中，请稍后...">
      <Result
        status="warning"
        title="数据加载失败，请稍后再试！"
        extra={
          <Button type="primary" key="reload" onClick={reloadHandler}>
            重新加载
          </Button>
        }
      />
    </Spin>
  );
};
export default LoaderErrorElement;
