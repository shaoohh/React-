import type { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";

const BtnEditArticle: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Button
      type="link"
      size="small"
      onClick={() => navigate(`/art-edit/` + id, { state: location.search })}
    >
      修改
    </Button>
  );
};
export default BtnEditArticle;
