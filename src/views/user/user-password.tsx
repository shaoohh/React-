import type { FC } from "react";
import { Button, Form, Input, message, Space, Spin } from "antd";
import { useSubmit, useActionData, useNavigation } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { updateUserPwdApi } from "@/api/user-api";
import to from "await-to-js";
const UserPassword: FC = () => {
  const [formRef] = Form.useForm();
  const submit = useSubmit();
  const actionData = useActionData() as { result: boolean } | null;
  const navigation = useNavigation();
  if (actionData?.result) {
    //如果actionData有result属性且为true，重置表单
    formRef.resetFields();
  }
  // 提交表单的处理函数
  const onFinish = (values: ResetPwdForm) => {
    submit(values, { method: "PATCH" });
  };
  return (
    <Form
      form={formRef}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Spin spinning={navigation.state !== "idle"} delay={200}>
        <Form.Item
          label="原密码"
          name="old_pwd"
          validateFirst
          rules={[
            { required: true, message: "请填写原密码" },
            { pattern: /^\S{6,15}$/, message: "密码是长度为6-15的非空字符串" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="new_pwd"
          dependencies={["old_pwd"]}
          validateFirst={true}
          rules={[
            { required: true, message: "请填写新密码" },
            { pattern: /^\S{6,15}$/, message: "密码是长度为6-15的非空字符串" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                //校验通过 return Promise.resolve();
                if (value !== getFieldValue("old_pwd")) {
                  return Promise.resolve();
                }
                //校验不通过 return Promise.reject("错误信息");
                return Promise.reject(new Error("新密码不能与原密码相同"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="re_pwd"
          dependencies={["new_pwd"]}
          validateFirst
          rules={[
            { required: true, message: "请在此确认新密码" },
            { pattern: /^\S{6,15}$/, message: "密码是长度为6-15的非空字符串" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                //校验通过 return Promise.resolve();
                if (value === getFieldValue("new_pwd")) {
                  return Promise.resolve();
                }
                //校验不通过 return Promise.reject("错误信息");
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} wrapperCol={{ offset: 4, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button type="default" onClick={() => formRef.resetFields()}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Spin>
    </Form>
  );
};
export default UserPassword;
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err] = await to(updateUserPwdApi(fd));
  if (err) return null;
  message.success("密码修改成功");
  return { result: true };
};
