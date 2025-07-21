import type { FC } from "react";
import { Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import type { PopconfirmProps } from "antd";
import { useActionData, useSubmit } from "react-router-dom";
import { useNavSubmitting, useNavLoading } from "@/utils/hooks";
const ButtonDelete: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const submit = useSubmit();
  const submitting = useNavSubmitting("DELETE");
  const loading = useNavLoading("DELETE");
  const actionData = useActionData() as boolean | null;
  useEffect(() => {
    if (loading && actionData) {
      setOpen(false);
    }
  }, [loading, actionData]);
  const handleDelete = () => {
    if (id === 1 || id === 2) {
      return message.error("默认分类不能删除");
    }
    setOpen(true);
    console.log(id);
  };
  const confirm = () => {
    submit(
      { id },
      {
        method: "DELETE",
      }
    );
    setOpen(false);
  };
  const cancel = () => {
    setOpen(false);
  };
  const handleOpenChange: PopconfirmProps["onOpenChange"] = (isOpen, e) => {
    console.log(e);
    const btnType = e?.currentTarget.dataset.type;
    if (!isOpen && btnType !== "btn-ok") {
      setOpen(false);
    }
  };
  return (
    <>
      <Popconfirm
        onOpenChange={handleOpenChange}
        open={open}
        title=" 操作提示"
        description="您确定删除此文章分类吗?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="确认"
        okButtonProps={{
          "data-type": "btn-ok",
          loading: submitting && { delay: 200 },
        }}
        cancelText="取消"
      >
        <Button type="link" size="small" onClick={handleDelete}>
          删除
        </Button>
      </Popconfirm>
    </>
  );
};
export default ButtonDelete;
