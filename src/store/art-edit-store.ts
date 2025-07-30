import { create } from "zustand";
import { ArticleSteps } from "./art-add-store";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "@/utils/storage";
import { getArticleApi } from "@/api/article-api";
import { Move } from "./art-add-store";
import to from "await-to-js";
import config from "@/config.json";
type EditStore = {
  article: ArticleEditForm;
  current: number;
};
const initialState = {
  article: {} as ArticleEditForm,
  current: ArticleSteps.base,
};
const useStore = create<EditStore>(() => initialState);
console.log(useStore);
const useArticleEditStore = create<EditStore>()(
  immer(
    devtools(
      persist(
        () => {
          //这里return的是state中包含的东西
          return { ...initialState };
        },
        {
          name: "art-edit-store",
          storage: createStorage(),
          partialize(state) {
            return { article: state.article };
          },
        }
      ),
      { name: "art-edit-store" }
    )
  )
);

export default useArticleEditStore;

//actions
//请求文章的初始数据
export const initArticle = async (id: string) => {
  //1.调用接口，获取文章详情
  //2.把文章详情的数据，存储到Store
  const [err, res] = await to(getArticleApi(id));
  if (err) return null;
  useArticleEditStore.setState((state) => {
    if (res.data) {
      state.article = res.data;
    }
  });
};

export const selectCurrent = (state: EditStore) => state.current;

export const selectBase = (state: EditStore) => ({
  title: state.article.title,
  cate_id: state.article.cate_id,
});

export const updateBase = (values: ArticleEditBaseForm) => {
  useArticleEditStore.setState((state) => {
    state.article = { ...state.article, ...values };
  });
};

export const updateCurrent = (step: Move = Move.next) => {
  useArticleEditStore.setState((state) => {
    state.current += step;
  });
};

export const resetCurrent = () => {
  useArticleEditStore.setState((state) => {
    state.current = ArticleSteps.base;
  });
};
export const selectContent = (state: EditStore) => state.article.content;
export const selectIsShowDraft = (state: EditStore) =>
  state.article.state === "草稿";
export const selectCover = (state: EditStore) => {
  const cover = state.article.cover_img;
  if (cover instanceof Blob) {
    //把封面文件转为url字符串
    if (typeof cover == "string") {
      return config.baseURL + cover;
    }
    return URL.createObjectURL(cover);
  } else {
    //没有封面
    return null;
  }
};

export const setArticleCover = (cover: Blob) => {
  useArticleEditStore.setState((state) => {
    state.article.cover_img = cover;
  });
};
export const setContent = (content: string) => {
  useArticleEditStore.setState((state) => {
    state.article.content = content;
  });
};
export const setArticleState = (artstate: "草稿" | "已发布") => {
  useArticleEditStore.setState((state) => {
    state.article.state = artstate;
  });
};
