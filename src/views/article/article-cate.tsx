import type { FC } from "react";
import {
  getCateListApi,
  postCateApi,
  editCateApi,
  delCateApi,
} from "@/api/cate-api";
import to from "await-to-js";
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { Table, Space, message } from "antd";
import type { TableProps } from "antd";
import ButtonAdd from "@/components/article-cate/btn-add";
import ButtonEdit from "@/components/article-cate/btn-edit.tsx";
import ButtonDelete from "@/components/article-cate/btn-del";
const columns: TableProps<CateItem>["columns"] = [
  {
    title: "序号",
    render(_, __, index) {
      return index + 1;
    },
  },
  { title: "分类名称", dataIndex: "cate_name", key: "name" },
  { title: "分类别名", dataIndex: "cate_alias", key: "alias" },
  {
    title: "操作",
    key: "action",
    render(_, record) {
      return (
        <>
          <ButtonEdit cate={record} />
          <ButtonDelete id={record.id} />
        </>
      );
    },
  },
];
const ArticleCate: FC = () => {
  const loaderData = useLoaderData() as { cates: CateItem[] | null };

  return (
    loaderData && (
      <Space direction="vertical" style={{ display: "flex" }}>
        <ButtonAdd />
        {/* 表格区域 */}
        <Table
          dataSource={loaderData.cates || []}
          columns={columns}
          size="middle"
          rowKey="id"
          pagination={false}
          bordered
        />
      </Space>
    )
  );
};
export default ArticleCate;

export const loader = async () => {
  const [err, res] = await to(getCateListApi());
  if (err) return null;
  return { cates: res.data };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  //获取请求的method类型
  const method = request.method.toUpperCase() as
    | "POST"
    | "PUT"
    | "DELETE"
    | "GET"
    | "PATCH";
  if (method === "POST") {
    //调用添加分类的API接口//调用API接口
    const [err] = await to(postCateApi(fd));
    if (err) return null;
    message.success("添加分类成功");
  } else if (method === "PUT") {
    const [err] = await to(editCateApi(fd));
    if (err) return null;
    message.success("修改分类成功");
  } else if (method === "DELETE") {
    const [err] = await to(delCateApi(fd));
    if (err) return null;
    message.success("删除分类成功");
  }

  return true;
};
