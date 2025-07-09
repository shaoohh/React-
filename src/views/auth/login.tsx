import { FC } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, redirect } from "react-router-dom";
import { useSearchParams, useFetcher } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { loginApi } from "@/api/auth-api";
import to from "await-to-js";
import { setToken } from "@/store/app-store.ts";
const Login: FC = () => {
  //解析URL中的查询参数
  const [searchParams] = useSearchParams();
  const loginFetcher = useFetcher();
  //const navigation = useNavigation();
  //用usefetcher无法使用useNavigation，因为useFetcher返回的是一个fetcher对象，没有useNavigation的属性
  const onFinish = (values: LoginForm) => {
    loginFetcher.submit(values, { method: "POST" });
  };
  return (
    <Form
      initialValues={{ username: searchParams.get("uname") || "" }}
      size="large"
      name="login"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "请输入用户名" },
          {
            pattern: /^[0-9a-zA-Z]{1,10}$/,
            message: "用户名只能是1-10位的字母或数字!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码!" },
          { pattern: /^\S{6,15}$/, message: "密码只能是6-15位的非空字符!" },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Space direction="vertical">
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loginFetcher.state !== "idle" && { delay: 200 }}
          >
            Log in
          </Button>
          <div>
            Or <Link to="/reg">Register now!</Link>
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err, res] = await to(loginApi(fd));
  if (err) return null;
  console.log(res.message);
  //TODO   需要全局存储登录拿到的token值
  setToken(res.token);

  //提示用户登录成功
  message.success(res.message);
  return redirect("/"); //重定向到首页
};
export default Login;
