import { Button, Modal, Form, Input } from "antd";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useSubmit, useActionData } from "react-router-dom";
import { useNavLoading, useNavSubmitting } from "@/utils/hooks.ts";
const ButtonAdd: FC = () => {
  //控制弹窗显示隐藏
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRef] = Form.useForm();
  const submit = useSubmit();
  const actionData = useActionData() as boolean | null;
  const loading = useNavLoading("POST");
  const submitting = useNavSubmitting("POST");
  useEffect(() => {
    if (actionData && loading) {
      //如果是提交状态，显示加载状态
      setIsModalOpen(false);
    }
  }, [loading, actionData]);
  //点击添加按钮，弹窗显示
  const handleOk = () => {
    //关闭对话框
    //setIsModalOpen(false);

    formRef
      .validateFields()
      .then((values: ArtCateAddForm) => {
        console.log("提交的值", values);
        submit(values, { method: "POST" });
      })
      .catch((err) => {
        console.log("校验失败", err);
      });
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        {" "}
        添加分类
      </Button>
      <Modal
        title="添加文章分类"
        cancelText="取消"
        okText="添加"
        okButtonProps={{
          loading: submitting && { delay: 200 },
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        afterClose={() => formRef.resetFields()}
      >
        <Form form={formRef} autoComplete="off" style={{ marginTop: 25 }}>
          <Form.Item
            label="分类名称"
            name="cate_name"
            rules={[
              { required: true, message: "请填写分类名称!" },
              {
                pattern: /^\S{1,10}$/,
                message: "分类名称必须是1-10位的非空字符",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="分类别名"
            name="cate_alias"
            rules={[
              { required: true, message: "请填写分类别名!" },
              {
                pattern: /^[a-zA-Z0-9]{1,15}$/,
                message: "分类别名必须是1-15位的字母或数字",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ButtonAdd;
