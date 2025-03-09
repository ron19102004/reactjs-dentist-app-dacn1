import { Outlet, RouteObject } from "react-router";

const prefix = (path: string, routers: RouteObject[]): RouteObject => {
  return {
    path: path,
    element: <Outlet />,
    children: routers,
  };
};
export default prefix;
