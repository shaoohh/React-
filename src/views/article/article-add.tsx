import type { FC } from "react";
import { message, Steps, FloatButton, Modal } from "antd";
import ArticleBase from "@/components/article-add/art-base";
import { getCateListApi } from "@/api/cate-api";
import to from "await-to-js";
import useArtADDStore, {
  clearArticle,
  resetCurrent,
  selectCurrent,
  selectHasHydrated,
  setCurrent,
} from "@/store/art-add-store";
import { postArticleApi } from "@/api/article-api";
import { ArticleSteps } from "@/store/art-add-store";
import ArticleCover from "@/components/article-add/art-cover";
import ArticleContent from "@/components/article-add/art-content";
import ArticleResult from "@/components/article-add/art-result";
import localforage from "@/utils/localforage";
import { StorageValue } from "zustand/middleware";
import type { ArtAddStore } from "@/store/art-add-store";
import { ClearOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { defer } from "react-router-dom";
//静态数据源,没必要定义在组件中
export const stepItems = [
  {
    title: "基本信息",
  },
  {
    title: "文章分封面",
  },
  {
    title: "文章内容",
  },
  {
    title: "Done",
  },
];
const ArticleAdd: FC = () => {
  const modalRef = useRef<() => void>();
  const HandleClean = () => {
    modalRef.current = Modal.confirm({
      title: "操作提示",
      content: "此操作会清空表单中填写的所有数据，确认清空吗？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        clearArticle();
        resetCurrent();
        message.success("清空成功");
      },
    }).destroy;
  };
  // 从store中获取当前步骤值
  const current = useArtADDStore(selectCurrent);
  const hasHydrated = useArtADDStore(selectHasHydrated);
  useEffect(() => {
    //返回一个清理函数,当组件卸载时会被执行
    return () => modalRef.current && modalRef.current();
  }, []);
  return (
    hasHydrated && (
      <div>
        {/* 步骤条 */}
        <Steps size="small" current={current} items={stepItems} />
        <div style={{ marginTop: 20 }}>
          {" "}
          {/* 根据步骤条的current值，渲染不同的组件 */}
          {current === ArticleSteps.base && <ArticleBase />}
          {current === ArticleSteps.cover && <ArticleCover />}
          {current === ArticleSteps.content && <ArticleContent />}
          {current === ArticleSteps.done && <ArticleResult />}
        </div>
        {/* 重置按钮 */}
        <FloatButton
          type="primary"
          icon={<ClearOutlined />}
          onClick={HandleClean}
        />
      </div>
    )
  );
};
export default ArticleAdd;

export const loader = async () => {
  //获取store中current的值 如果值为3 立即重置为0
  // const current = useArtADDStore.getState().current;
  // if (current === ArticleSteps.done) {
  //   useArtADDStore.setState({ current: 0 });
  // }
  const localData = await localforage.getItem<StorageValue<ArtAddStore>>(
    "art-add-store"
  );
  if (localData?.state.current === ArticleSteps.done) {
    resetCurrent();
  }
  const result = getCateListApi();

  return defer({ result });
};
export const action = async () => {
  const article = useArtADDStore.getState().article;
  //需要把对象格式的请求体数据转换为FormData格式
  const fd = new FormData();
  for (const key in article) {
    fd.append(key, article[key]);
  }
  const [err] = await to(postArticleApi(fd));
  if (err) return null;
  //添加文章成功
  setCurrent();
  const msg = article.state === "草稿" ? "文章已保存" : "文章已发布";
  message.success(msg);
  clearArticle();
  return { msg };
};
