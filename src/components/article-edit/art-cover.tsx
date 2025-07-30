import type { FC } from "react";
import { Space, Button, Avatar, message } from "antd";
import { useRef } from "react";
import { updateCurrent } from "@/store/art-edit-store";
import { Move } from "@/store/art-add-store";
import useArticleEditStore, {
  selectCover,
  setArticleCover,
} from "@/store/art-edit-store";
const EditCover: FC = () => {
  const iptRef = useRef<HTMLInputElement>(null);
  const coverURL = useArticleEditStore(selectCover);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    if (files[0].size > 1024 * 1024 * 2) {
      return message.error("图片大小不能超过2M");
    }
    setArticleCover(files[0]);
  };
  const handleNext = () => {
    if (!coverURL) {
      return message.error("请选择文章封面");
    }
    updateCurrent(Move.next);
  };
  return (
    <>
      <Space direction="vertical">
        {coverURL ? (
          <Avatar size={300} shape="square" src={coverURL} />
        ) : (
          <Avatar size={300} shape="square">
            请选择文章封面
          </Avatar>
        )}

        <Space direction="horizontal">
          <Button type="primary" onClick={() => updateCurrent(Move.prev)}>
            上一步
          </Button>
          <Button type="primary" onClick={() => iptRef.current?.click()}>
            选择封面
          </Button>
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
          {/*文件选择器 */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={iptRef}
            onChange={handleFileChange}
          />
        </Space>
      </Space>
    </>
  );
};

export default EditCover;
