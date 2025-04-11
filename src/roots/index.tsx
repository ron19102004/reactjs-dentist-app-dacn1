import { FC, Fragment } from "react";
import RouterRoot from "./router";
import AuthProvider from "../contexts/auth.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "../contexts/notification.context";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const Root: FC = () => {
  return (
    <Fragment>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <RouterRoot />
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Fragment>
  );
};

export default Root;
