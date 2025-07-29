import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const BtnEditArticle: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <Button
      type="link"
      size="small"
      onClick={() => navigate(`/art-edit/` + id)}
    >
      修改
    </Button>
  );
};
export default BtnEditArticle;
