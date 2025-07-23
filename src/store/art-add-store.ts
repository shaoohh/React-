import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
type ArtAddStore = {
  current: ArticleSteps;
  article: ArticleAddForm;
};
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
        { name: "art-add-store" }
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
//actions
export const setCurrent = (step: Move = Move.next) => {
  useArtAddStore.setState((state) => {
    state.current += step;
  });
};
