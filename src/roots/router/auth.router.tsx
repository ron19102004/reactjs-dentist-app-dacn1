import { RouteObject } from "react-router-dom";
import { router } from "./custom";
import Register from "../pages/auth/register";

export default [
  router("login", <>Login</>),
  router("register", <Register />),
] as RouteObject[];
