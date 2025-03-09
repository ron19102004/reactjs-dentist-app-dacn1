import { RouteObject } from "react-router";

const layout = (
  layout: React.ReactNode,
  routers: RouteObject[]
): RouteObject => {
  return {
    path: "",
    element: layout,
    children: routers,
  };
};
export default layout;
