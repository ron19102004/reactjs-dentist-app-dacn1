import { FC } from "react";
import RouterRoot from "./router";
import AuthProvider from "../contexts/auth.context";

const Root: FC = () => {
  return (
    <AuthProvider>
      <RouterRoot />
    </AuthProvider>
  );
};

export default Root;
