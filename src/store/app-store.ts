
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import resetters from "@/store/resetters.ts";

type AppStoreType = typeof initState;
//初始数据
const initState = {
  token: "",

  collapsed: false, //侧边栏是否折叠

};
const useAppStore = create<AppStoreType>()(
  immer(
    devtools(
      persist(

        (set) => {
          //注册重置函数
          resetters.push(() => set(initState));

          //store 中的数据
          return {
            ...initState,
          };
        },
        { name: "app-store" } //数据持久化的配置
      ),
      { name: "app-store" } //调试工具的配置)
    )
  )
);
export default useAppStore;

//修改 store 数据的函数

//为token赋值的函数

export const setToken = (token: string) => {
  useAppStore.setState((state) => {
    state.token = token;
  });
};


//修改侧边栏折叠状态的函数
export const setCollapsed = (collapsed: boolean) => {
  useAppStore.setState((state) => {
    state.collapsed = collapsed;
  });
};
//选取派生数据的selector函数
export const selectCollapsed = (state: AppStoreType) => state.collapsed;

export const selectToken = (state: AppStoreType) => state.token;

