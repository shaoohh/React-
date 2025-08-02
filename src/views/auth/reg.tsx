import { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message } from "antd";
import { Link, useSubmit, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { regApi } from "@/api/auth-api";
import to from "await-to-js";
import { useNavSubmitting } from "@/utils/hooks";
const Reg: FC = () => {
  const submit = useSubmit();
  const submitting = useNavSubmitting("POST");
  const onFinish = (values: RegForm) => {
    if (submitting) return;
    //参数1：要提交给action的数据
    //参数2：提交的指定的method和action的地址
    submit(values, {
      method: "POST",
    });
  };

  return (
    <Form size="large" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "请输入用户名！" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "用户名只能是1-10位的字母或数字！",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码！" },
          { pattern: /^\S{6,15}$/, message: "密码只能是6-15位的非空字符！" },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="repassword"
        dependencies={["password"]} // 依赖于password输入框
        validateFirst
        rules={[
          { required: true, message: "请确认密码！" },
          { pattern: /^\S{6,15}$/, message: "密码只能是6-15位的非空字符！" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              //value是当前输入框的值
              //getFieldValue是获取其他输入框的值
              if (value === getFieldValue("password")) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error("两次输入的密码不一致！"));
              }
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Space direction="vertical">
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={submitting && { delay: 200 }}
          >
            Register
          </Button>
          <div>
            or <Link to="/login">login now!</Link>
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
};

//定义并导出路由的action函数
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  //const data = Object.fromEntries(fd) as RegForm;
  // try {

  //   const res=await regApi(data)
  //   console.log('注册成功');
  //   console.log(res);
  // }catch(error){
  //     console.log('注册失败');
  //     console.log(e  rror);
  // }

  //to接口返回promise
  const [err] = await to(regApi(fd));
  if (err) {
    //注册失败
    //1.提示用户失败的原因
    //2.return出去，阻止后续逻辑的调用
    //message.error(err.response.data.message);
    return null;
  }
  //注册成功
  //1.提示用户注册成功
  //2.返回一个成功的结果，跳转到登录页面
  message.success("注册成功，请登录！");
  return redirect("/login?uname=" + fd.get("username"));
};
export default Reg;
