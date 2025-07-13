import { create } from "zustand";
import resetters from "@/store/resetters.ts";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getUserApi } from "@/api/user-api.ts";
import to from "await-to-js";
type UserStoreType = typeof initState;
//默认的初始数据
const initState = {
  user: {} as User,
};
//创建store的Hook

const useUserStore = create<UserStoreType>()(
  immer(
    devtools(
      persist(
        (set) => {
          //添加重置store的回调函数
          resetters.push(() => set(initState));
          //store中的数据
          return {
            ...initState,
          };
        },
        { name: "user-store" }
      ),
      { name: "user-store" }
    ) //持久化存储)
  )
);

//selectors
//名字
export const selectName = (state: UserStoreType) =>
  state.user.nickname || state.user.username;
//头像
export const selectAvatar = (state: UserStoreType) => state.user.user_pic;
//导出store的hook
export default useUserStore;

//actions

//初始化用户的基本信息

export const initUser = async () => {
  //1.调用接口获取用户信息
  //2.存储用户信息到当前store中
  const [err, res] = await to(getUserApi());
  if (err) return;
  useUserStore.setState((state) => {
    if (res.data) {
      state.user = res.data;
    }
  });
};
