import type { FC } from "react";
import { Steps } from "antd";
import ArticleBase from "@/components/article-add/art-base";
import { getCateListApi } from "@/api/cate-api";
import to from "await-to-js";
import useArtADDStore, { selectCurrent } from "@/store/art-add-store";
import { ArticleSteps } from "@/store/art-add-store";
import ArticleCover from "@/components/article-add/art-cover";
//静态数据源,没必要定义在组件中
const stepItems = [
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
  // 从store中获取当前步骤值
  const current = useArtADDStore(selectCurrent);
  return (
    <div>
      {/* 步骤条 */}
      <Steps size="small" current={current} items={stepItems} />
      <div style={{ marginTop: 20 }}>
        {" "}
        {/* 根据步骤条的current值，渲染不同的组件 */}
        {current === ArticleSteps.base && <ArticleBase />}
        {current === ArticleSteps.cover && <ArticleCover />}
      </div>
    </div>
  );
};
export default ArticleAdd;

export const loader = async () => {
  const [err, res] = await to(getCateListApi());
  if (err) return null;

  return { cates: res.data };
};
