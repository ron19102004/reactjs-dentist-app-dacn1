import { RouteObject } from "react-router";
import { router } from "./custom";
import LoginPage from "../pages/auth/login";

export default [
  router("login", <LoginPage/>),
  router("register", <>Register</>),
] as RouteObject[];
