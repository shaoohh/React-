import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "@/utils/storage";
export type ArtAddStore = {
  current: ArticleSteps;
  article: ArticleAddForm;
  //如果值为true说明已经异步的把数据加载到zustand里，可以去渲染组件
  //如果值为false说明还没有加载完成，需要等待异步加载完成之后再去渲染组件
  _hasHydrated: boolean;
};
//自定义zustand 的存储引擎

//current 自增的状态
export enum Move {
  next = 1,
  prev = -1,
}
//发布文章所处的状态
export enum ArticleSteps {
  base = 0,
  cover = 1,
  content = 2,
  done = 3,
}
const initState: ArtAddStore = {
  current: ArticleSteps.base,
  article: {} as ArticleAddForm,
  _hasHydrated: false,
};
const useArtAddStore = create<ArtAddStore>()(
  immer(
    devtools(
      persist(
        () => {
          //数据
          return {
            ...initState,
          };
        },
        {
          name: "art-add-store",
          storage: createStorage<ArtAddStore>(),
          onRehydrateStorage() {
            return () => {
              //这个函数被执行说明数据异步成功
              useArtAddStore.setState((state) => {
                state._hasHydrated = true;
              });
            };
          },
        }
      ),
      {
        name: "art-add-store",
      }
    )
  )
);

export default useArtAddStore;
//选择器
export const selectCurrent = (state: ArtAddStore) => state.current;
export const selectArticleBase = (state: ArtAddStore) => ({
  title: state.article.title,
  cate_id: state.article.cate_id,
});
export const selectCover = (state: ArtAddStore) => {
  const cover = state.article.cover_img;
  if (cover instanceof Blob) {
    //把封面文件转为url字符串
    return URL.createObjectURL(cover);
  } else {
    //没有封面
    return null;
  }
};
export const selectHasHydrated = (state: ArtAddStore) => state._hasHydrated;
export const selectContent = (state: ArtAddStore) => state.article.content;

//actions
export const setCurrent = (step: Move = Move.next) => {
  useArtAddStore.setState((state) => {
    state.current += step;
  });
};
//实时存储

export const setArticleBase = (formData: ArticleAddBaseForm) => {
  useArtAddStore.setState((state) => {
    state.article = { ...state.article, ...formData };
  });
};
//更新文章封面

export const setArticleCover = (cover: Blob) => {
  useArtAddStore.setState((state) => {
    state.article.cover_img = cover;
  });
};

//存储文章内容

export const setContent = (content: string) => {
  useArtAddStore.setState((state) => {
    state.article.content = content;
  });
};
//存储文章发布状态

export const setArticleState = (artstate: "草稿" | "已发布") => {
  useArtAddStore.setState((state) => {
    state.article.state = artstate;
  });
};
//清空本地存储的文章数据

export const clearArticle = () => {
  useArtAddStore.setState((state) => {
    state.article = {} as ArticleAddForm;
  });
};

//重置 current 状态

export const resetCurrent = () => {
  useArtAddStore.setState((state) => {
    state.current = ArticleSteps.base;
  });
};
