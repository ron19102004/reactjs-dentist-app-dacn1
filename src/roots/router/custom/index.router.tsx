import { RouteObject } from "react-router";
import router from "./router.router";

const index = (
  element: React.ReactNode,
): RouteObject => {
  return router("", element);
};
export default index;
