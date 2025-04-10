import { FC, Fragment } from "react";
import RouterRoot from "./router";
import AuthProvider from "../contexts/auth.context";
import NotificationProvider from "../contexts/notification.context";
import { Toaster } from "react-hot-toast";

const Root: FC = () => {
  return (
    <Fragment>
      <Toaster />
      <AuthProvider>
        <NotificationProvider>
          <RouterRoot />
        </NotificationProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default Root;
