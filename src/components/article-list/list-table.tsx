import type { FC } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import BtnEditArticle from "@/components/article-list/btn-edit";
import BtnDeleteArticle from "@/components/article-list/btn-delete";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ListOrder from "@/components/article-list/list-order";
type Props = TableProps & Partial<{ total: number } & ArtListQuery>;
const columns: TableProps<Article>["columns"] = [
  {
    title: "序号",
    render(_, __, index) {
      return <ListOrder index={index} />;
    },
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "分类",
    dataIndex: "cate_name",
  },
  {
    title: "发表时间",
    dataIndex: "pub_date",
    render(value) {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "状态",
    dataIndex: "state",
  },

  {
    title: "操作",
    render(_, record) {
      return (
        <>
          <BtnEditArticle id={record.id} />
          <BtnDeleteArticle id={record.id} />
        </>
      );
    },
  },
];
const ArticleListTable: FC<Props> = (props) => {
  const [, setSearchParams] = useSearchParams();
  //二次封装的规范
  //1.尽量不要改动原组件上的属性，如果需要添加额外属性的话，可以拓展和自定义
  //2.如果原组件上的属性比较简单，可以不进行二次封装，直接借用原组件上的属性
  //3.如果原组件上的属性配置比较复杂，则建议进行二次封装
  const pageOptions = useMemo<TableProps["pagination"]>(() => {
    return {
      total: props.total,
      current: props.pagenum,
      pageSize: props.pagesize,
      //每页展示多少条
      pageSizeOptions: [2, 3, 5, 10, 20],
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal(total) {
        return `共计${total}条`;
      },
      onChange(page, pageSize) {
        setSearchParams({
          pagenum: page,
          pagesize: pageSize,
          cate_id: props.cate_id,

          state: props.state,
          //这里需要将对象转为字符串
        } as unknown as { [x: string]: string }); //由于antd的API中，类型为number
      },
    };
  }, [props, setSearchParams]);
  return <Table {...props} columns={columns} pagination={pageOptions} />;
};

export default ArticleListTable;
