import type { FC } from "react";
import ArticleListSearch from "@/components/article-list/list-search";
import { Button, Flex, message, Space, Skeleton, Spin } from "antd";
import {
  useNavigate,
  useLoaderData,
  redirect,
  useLocation,
} from "react-router-dom";
import { getCateListApi } from "@/api/cate-api";
import to from "await-to-js";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  defer,
  Await,
  useNavigation,
} from "react-router-dom";
import { getArticleListApi, deleteArticleApi } from "@/api/article-api";
import ArticleListTable from "@/components/article-list/list-table";
import { useNavLoading } from "@/utils/hooks";
import { Suspense, useMemo } from "react";
import LoaderErrorElement from "@/components/common/loader-error-element";
const ArticleList: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loaderData = useLoaderData() as {
    result: Promise<[BaseResponse<CateItem[]>, ArticleListResponse]>;
    q: ArtListQuery;
  };
  // const loading = useNavLoading("DELETE", location.pathname + location.search);
  const navigation = useNavigation();
  const navLoading = useMemo(() => {
    if (
      navigation.state === "loading" &&
      navigation.location.pathname === "/art-list"
    ) {
      return true;
    }
    return false;
  }, [navigation.state, navigation.location?.pathname]);
  return (
    <Suspense fallback={<Skeleton active />}>
      <Await resolve={loaderData.result} errorElement={<LoaderErrorElement />}>
        {(result: [BaseResponse<CateItem[]>, ArticleListResponse]) => {
          const artListResult = result[1];
          return (
            <Spin spinning={navLoading}>
              <Space direction="vertical" style={{ display: "flex" }}>
                <Flex justify="space-between">
                  <ArticleListSearch />
                  <Button type="primary" onClick={() => navigate("/art-add")}>
                    添加文章
                  </Button>
                </Flex>
                <ArticleListTable
                  dataSource={artListResult?.data}
                  rowKey="id"
                  size="middle"
                  bordered
                  total={artListResult?.total}
                  {...loaderData?.q}
                />
              </Space>
            </Spin>
          );
        }}
      </Await>
    </Suspense>
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
  // //获取文章分类数据
  // const [err, res] = await to(getCateListApi());
  // if (err) return null;
  // //获取文章列表数据
  // const [err2, res2] = await to(getArticleListApi(q));
  // if (err2) return null;
  const result = Promise.all([getCateListApi(), getArticleListApi(q)]);
  //return { result: res.data, q, list: res2.data, total: res2.total };
  return defer({ q, result });
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
