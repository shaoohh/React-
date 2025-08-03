import type { FC } from "react";
import { Button, Form, Input, message, Space } from "antd";
import useUserStore from "@/store/user-store";
import { selectUserInfo } from "@/store/user-store";
import { useSubmit } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { updateUserInfoApi } from "@/api/user-api";
import to from "await-to-js";
import { useNavSubmitting } from "@/utils/hooks";
const UserInfo: FC = () => {
  const submitting = useNavSubmitting("PUT");
  const UserInfo = useUserStore(selectUserInfo);
  const [formRef] = Form.useForm();
  const submit = useSubmit();
  const onFinish = (values: UserInfoForm) => {
    if (submitting) return;
    submit(values, { method: "PUT" });
  };
  return (
    <Form
      form={formRef}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={UserInfo}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="id" name="id" hidden>
        <Input readOnly />
      </Form.Item>
      <Form.Item
        label="昵称"
        name="nickname"
        rules={[
          { required: true, message: "请填写昵称!" },
          { pattern: /^\S{1,10}$/, message: "昵称是长度为1-10的非空字符串" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: "请填写邮箱!" },
          {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "邮箱格式不正确",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Space>
        <Form.Item wrapperCol={{ offset: 20, span: 16 }} label={null}>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting && { delay: 200 }}
          >
            保存
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 16 }} label={null}>
          <Button
            type="default"
            onClick={() => formRef.setFieldsValue(UserInfo)}
          >
            还原
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
export default UserInfo;

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err, res] = await to(updateUserInfoApi(fd));
  if (err) {
    return null;
  }
  // if (res.code !== 0) {
  //   //失败
  //   message.error("操作失败请稍后重试");
  // } else {
  //   //成功
  //   message.success("操作成功");
  // }
  message.success("操作成功");
  return null;
};
