import type { FC } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { useLoaderData } from "react-router-dom";
import useArtAddStore, { setCurrent } from "@/store/art-add-store";
import { Move, selectArticleBase } from "@/store/art-add-store";
import { useLayoutEffect } from "react";
const ArticleBase: FC = () => {
  const loaderData = useLoaderData() as { cates: CateItem[] } | null;
  const [formRef] = Form.useForm();
  const baseForm = useArtAddStore(selectArticleBase);
  useLayoutEffect(() => {
    formRef.setFieldsValue(baseForm);
  }, [formRef, baseForm]);
  const onFinish = (values: unknown) => {
    console.log("Success:", values);
    setCurrent(Move.next);
  };
  return (
    <>
      <Form
        form={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: "请填写文章标题!" }]}
        >
          <Input
            placeholder="请输入文章标题"
            maxLength={30}
            showCount
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="文章分类"
          name="cate_id"
          rules={[{ required: true, message: "请选择文章分类!" }]}
        >
          <Select
            placeholder="请选择文章分类"
            allowClear
            options={loaderData ? loaderData.cates : []}
            fieldNames={{ label: "cate_name", value: "id" }}
          />
        </Form.Item>

        <Form.Item label={null} wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ArticleBase;
