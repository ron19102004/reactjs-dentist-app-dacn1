import { RouteObject } from "react-router";

const router = (
  path: string,
  element: React.ReactNode,
): RouteObject => {
  return {
    path: path,
    element: element,
  };
};
export default router;
