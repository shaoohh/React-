import type { FC } from "react";
import ArticleListSearch from "@/components/article-list/list-search";
import { Button, Flex, message, Space } from "antd";
import {
  useNavigate,
  useLoaderData,
  redirect,
  useLocation,
} from "react-router-dom";
import { getCateListApi } from "@/api/cate-api";
import to from "await-to-js";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { getArticleListApi, deleteArticleApi } from "@/api/article-api";
import ArticleListTable from "@/components/article-list/list-table";
import { useNavLoading } from "@/utils/hooks";
const ArticleList: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loaderData = useLoaderData() as {
    list: Article[];
    total: number;
    q: ArtListQuery;
  } | null;
  const loading = useNavLoading("DELETE", location.pathname + location.search);
  return (
    <div>
      <Space direction="vertical" style={{ display: "flex" }}>
        <Flex justify="space-between">
          <ArticleListSearch />
          <Button type="primary" onClick={() => navigate("/art-add")}>
            添加文章
          </Button>
        </Flex>
        <ArticleListTable
          dataSource={loaderData?.list}
          rowKey="id"
          size="middle"
          bordered
          total={loaderData?.total}
          {...loaderData?.q}
          loading={loading}
        />
      </Space>
    </div>
  );
};
export default ArticleList;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  //解析URl中的查询参数
  request.url;
  const searchParams = new URL(request.url).searchParams;

  const q: ArtListQuery = {
    pagenum: Number(searchParams.get("pagenum")) || 1,
    pagesize: Number(searchParams.get("pagesize")) || 2,
    cate_id: Number(searchParams.get("cate_id")) || "",
    state: searchParams.get("state") || "",
  };
  //获取文章分类数据
  const [err, res] = await to(getCateListApi());
  if (err) return null;
  //获取文章列表数据
  const [err2, res2] = await to(getArticleListApi(q));
  if (err2) return null;
  return { result: res.data, q, list: res2.data, total: res2.total };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err] = await to(deleteArticleApi(fd));
  if (err) return null;
  message.success("删除成功");
  //如果删除成功判断页码值是否需要回退
  const needBack = fd.get("needBack");
  if (needBack === "true") {
    const url = new URL(request.url);
    const newPage = Number(url.searchParams.get("pagenum")) - 1;
    url.searchParams.set("pagenum", newPage.toString());
    return redirect(url.toString());
  }
  //console.log("ok");
  return true;
};
