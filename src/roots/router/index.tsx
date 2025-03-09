import { RouterProvider, createBrowserRouter } from "react-router";
import userRouter from "./user.router";
import adminRouter from "./admin.router";

const RouterRoot = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([...userRouter, ...adminRouter])}
    />
  );
};
export default RouterRoot;
