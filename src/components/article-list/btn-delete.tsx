import type { FC } from "react";
import { useState, useEffect } from "react";
import { Button, Popconfirm } from "antd";
import type { PopconfirmProps } from "antd";
import { useSubmit, useActionData, useLocation } from "react-router-dom";
import { useNavSubmitting, useNavLoading } from "@/utils/hooks";
import { useLoaderData } from "react-router-dom";
const BtnDeleteArticle: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const submit = useSubmit();
  const location = useLocation();
  const submitting = useNavSubmitting(
    "DELETE",
    location.pathname + location.search
  );
  const loading = useNavLoading("DELETE", location.pathname + location.search);
  const actionData = useActionData() as boolean | null;
  const loaderData = useLoaderData() as {
    total: number;
    q: ArtListQuery;
    list: Article[];
  } | null;
  useEffect(() => {
    if (loading && actionData) {
      setOpen(false);
    }
  }, [loading, actionData]);
  const confirm = () => {
    //判断是否需要对页码值回退
    //1.当前页只剩下一条数据
    //2.当前页是最后一页
    //3.当前页不是第一页
    let needBack = false;
    if (loaderData) {
      const { list, q, total } = loaderData;
      needBack =
        list.length === 1 &&
        q.pagenum !== 1 &&
        q.pagenum === Math.ceil(total / q.pagesize);
    }
    submit({ id, needBack }, { method: "DELETE" });
  };
  const handleOpenChange: PopconfirmProps["onOpenChange"] = (isOpen, e) => {
    const btnType = e?.currentTarget.dataset.type;
    if (!isOpen && btnType !== "btn-ok") {
      setOpen(false);
    }
  };
  const cancel = () => {
    console.log("取消");
    setOpen(false);
  };

  return (
    <Popconfirm
      title="操作提示"
      description="您确认删除此文章吗?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="确认"
      cancelText="取消"
      open={open}
      onOpenChange={handleOpenChange}
      okButtonProps={{
        "data-type": "btn-ok",
        loading: submitting && { delay: 200 },
      }}
    >
      <Button type="link" size="small" onClick={() => setOpen(true)}>
        删除
      </Button>
    </Popconfirm>
  );
};

export default BtnDeleteArticle;
