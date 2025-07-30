/// <reference types="vite/client" />

//----------请求体的数据类型----------
type RegForm = {
  username: string;
  password: string;
  repassword: string;
};
type UserInfoForm = Pick<User, "id" | "nickname" | "email">;

type LoginForm = Omit<RegForm, "repassword">;
type ResetPwdForm = {
  old_pwd: string;
  new_pwd: string;
  re_pwd: string;
};
type ArtCateAddForm = Omit<CateItem, "id">;
type ArticleAddForm = {
  title: string;
  cate_id: number;
  content: string;
  state: "草稿" | "已发布";
  cover_img: Blob;
  [x: string]: string | Blob;
};
type ArticleEditForm = ArticleAddForm & { readonly id: string };
type ArticleAddBaseForm = partial<Pick<ArticleAddForm, "title" | "cate_id">>;
type ArticleEditBaseForm = ArticleAddBaseForm;
type ArtListQuery = {
  pagenum: number;
  pagesize: number;
  cate_id: number | string;
  state: string;
};

//----------接口返回的数据类型--------------------

interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

interface LoginResponse extends BaseResponse {
  token: string; // 登录成功后返回的token
}

//文章了列表接口返回的类型
interface ArticleListResponse extends BaseResponse<Article[]> {
  total: number;
}
//用户的基本信息

type User = {
  readonly id: number;
  username: string;
  nickname?: string;
  email?: string;
  user_pic?: string;
};
//左侧菜单项的TS类型

type MenuItem = {
  readonly key: string;
  title?: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
};
//文章分类的TS类型

type CateItem = {
  readonly id: number;
  cate_name: string;
  cate_alias: string;
};
//文章类型

type Article = {
  readonly id: number;
  title: string;
  pub_date: string;
  state: "草稿" | "已发布";
  cate_name: string;
};
