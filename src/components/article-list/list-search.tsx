import { useEffect, type FC } from "react";
import { Button, Form, Select } from "antd";
import {
  useLoaderData,
  useSearchParams,
  useAsyncValue,
} from "react-router-dom";
const ArticleListSearch: FC = () => {
  //注意：通过异步等待获取到的数据不要在嵌套的子组件中使用useLoaderDate来进行获取
  //因为，useLoaderData只能拿到那些非异步的数据 比如q
  const loaderData = useLoaderData() as {
    q: ArtListQuery;
  };
  const [formRef] = Form.useForm();
  const [, setSearchParams] = useSearchParams();
  //通过异步等待获取到的数据可以在子组件中使用 useSyncValue这个Hook进行获取和使用
  const [artCateResult] = useAsyncValue() as [BaseResponse<CateItem[]>];
  useEffect(() => {
    formRef.setFieldsValue(loaderData?.q);
  }, [formRef, loaderData?.q]);
  const onFinish = (values: Pick<ArtListQuery, "cate_id" | "state">) => {
    console.log("Success:", values);
    const params = { ...loaderData?.q, ...values, pagenum: 1 } as unknown as {
      [x: string]: string;
    };
    setSearchParams(params);
  };
  return (
    <Form form={formRef} layout="inline" onFinish={onFinish} autoComplete="off">
      <Form.Item label="分类" name="cate_id">
        <Select
          placeholder="请选择"
          style={{ width: 180 }}
          options={[
            { cate_name: "请选择", id: "" },
            ...(artCateResult.data || []),
          ]}
          fieldNames={{ label: "cate_name", value: "id" }}
        />
      </Form.Item>

      <Form.Item label="状态" name="state">
        <Select
          placeholder="请选择"
          style={{ width: 180 }}
          options={[
            { value: "", label: "请选择" },
            { value: "草稿", label: "草稿" },
            { value: "已发布", label: "已发布" },
          ]}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
      <Form.Item label={null}>
        <Button onClick={() => setSearchParams()}>重置</Button>
      </Form.Item>
    </Form>
  );
};
export default ArticleListSearch;
