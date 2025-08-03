import type { FC } from "react";
import useArticleEditStore, {
  initArticle,
  resetCurrent,
} from "@/store/art-edit-store";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { stepItems } from "@/views/article/article-add";
import { message, Modal, Steps } from "antd";
import EditBase from "@/components/article-edit/art-base";
import { ArticleSteps } from "@/store/art-add-store";
import useArtEditStore, { selectCurrent } from "@/store/art-edit-store";
import { getCateListApi } from "@/api/cate-api";
import { useBeforeUnload, useBlocker } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import EditCover from "@/components/article-edit/art-cover";
import EditContent from "@/components/article-edit/art-content";
import EditResult from "@/components/article-edit/art-result";
import to from "await-to-js";
import { putArticleApi } from "@/api/article-api";
import { updateCurrent } from "@/store/art-edit-store";
const ArticleEdit: FC = () => {
  const current = useArtEditStore(selectCurrent);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    //如果return的值为true 需要询问是否跳转
    //如果return值为false 跳转不受阻止
    return (
      currentLocation.pathname !== nextLocation.pathname &&
      current !== ArticleSteps.done
    );
  });
  const modalRef = useRef<ReturnType<typeof Modal.confirm> | null>();
  useEffect(() => {
    //1.判断blocker.state是否等于blocked
    if (blocker.state === "blocked") {
      if (modalRef.current) return;
      //2.需要展示确认的弹框
      modalRef.current = Modal.confirm({
        title: "温馨提示",
        content: "您所做的更改将会丢失，是否确认离开当前页面",
        okText: "确认离开",
        cancelText: "取消",
        onOk() {
          //允许离开
          blocker.proceed();
          //resetCurrent();
        },
        onCancel() {
          //阻止离开
          blocker.reset();
          modalRef.current = null;
        },
      });
    }
  }, [blocker.state, blocker]);
  useBeforeUnload(
    useCallback((e) => {
      //进行刷新的阻止
      e.preventDefault();
    }, [])
  );
  return (
    <div>
      <Steps size="small" current={current} items={stepItems} />
      <div style={{ marginTop: 20 }}>
        {current === ArticleSteps.base && <EditBase />}
        {current === ArticleSteps.cover && <EditCover />}
        {current === ArticleSteps.content && <EditContent />}
        {current === ArticleSteps.done && <EditResult />}
      </div>
    </div>
  );
};
export default ArticleEdit;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  //回显文章数据
  const flag = initArticle(params.id!);
  //请求文章分类的数据
  const cates = getCateListApi();
  //重置current值
  resetCurrent();
  return defer({ cates, flag });
  //方案1：把多个Promise 封装到Promise.all([])的数组中，统一返回给组件
  //方案2：把多个Promise封装到defer对象的多个属性中，在组件中就可以只使用Await等待自己需要的数据
};
export const action = async () => {
  //拿到全局Store中存储的信息
  //需要对文章的信息进行梳理，得到一个Form DATa的对象
  //调用接口
  const article = useArticleEditStore.getState().article;
  const keys = ["id", "title", "cate_id", "content", "cover_image", "state"];
  const fd = new FormData();
  keys.forEach((key) => {
    fd.append(key, article[key]);
  });

  const [err] = await to(putArticleApi(fd));
  if (err) return null;
  message.success("修改成功");
  updateCurrent();
  return null;
};
