import type { FC } from "react";
import { Avatar, Space, Button, message } from "antd";
import useUserStore, { selectAvatar } from "@/store/user-store";
import { useMemo, useRef, useState } from "react";
import { updateAvatarApi } from "@/api/user-api";
import { ActionFunctionArgs, useSubmit } from "react-router-dom";
import to from "await-to-js";
import { useNavSubmitting } from "@/utils/hooks";
const UserAvatar: FC = () => {
  const submitting = useNavSubmitting("PATCH");
  const avatar = useUserStore(selectAvatar);
  const [newAvatar, setNewAvatar] = useState("");
  const submit = useSubmit();
  const iptRef = useRef<HTMLInputElement>(null);
  const isDisabled = useMemo(
    () => !newAvatar || newAvatar === avatar,
    [newAvatar, avatar]
  );
  const showDialog = () => {
    iptRef.current?.click();
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    //创建文件读取器
    const fr = new FileReader();
    fr.readAsDataURL(files[0]);
    fr.onload = () => {
      //将base64格式的图片赋值给头像

      if (fr.result) {
        setNewAvatar(fr.result as string);
      }
    };
  };
  const saveAvatar = () => {
    if (submitting) return;
    submit(
      { avatar: newAvatar },
      {
        method: "PATCH",
      }
    );
  };
  return (
    <Space direction="vertical">
      {/* 按需渲染头像组件 */}

      {newAvatar || avatar ? (
        <Avatar size={300} shape="square" src={newAvatar || avatar} />
      ) : (
        <Avatar size={300} shape="square" onClick={showDialog}>
          请选择头像
        </Avatar>
      )}
      <Space direction="horizontal">
        <Button onClick={showDialog}> 选择照片</Button>
        <Button
          type="primary"
          disabled={isDisabled}
          onClick={saveAvatar}
          loading={submitting && { delay: 200 }}
        >
          {" "}
          保存头像
        </Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={iptRef}
          onChange={onFileChange}
        />
      </Space>
    </Space>
  );
};

export default UserAvatar;

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err] = await to(updateAvatarApi(fd));
  if (err) {
    return null;
  }
  message.success("头像更新成功");
  return null;
};
