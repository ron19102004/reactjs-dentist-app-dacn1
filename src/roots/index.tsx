import { FC } from "react";
import RouterRoot from "./router";
import AuthProvider from "../contexts/auth.context";
import { Toaster } from "react-hot-toast"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
const Root: FC = () => {

  
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterRoot />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default Root;
