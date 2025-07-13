import { FC, PropsWithChildren } from "react";
import styles from "@/views/auth/css/auth-layout.module.less";

import { Navigate } from "react-router-dom";
import useAppStore, { selectToken } from "@/store/app-store.ts";
const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectToken);
  if (token) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.boxTest}>{children}</div>
      </div>
    );
  }

};

export default AuthLayout;
