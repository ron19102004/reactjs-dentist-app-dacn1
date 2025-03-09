import { Outlet, RouteObject } from "react-router";
import index from "./custom/index.router";
import router from "./custom/router.router";
import layout from "./custom/layout.router";
import App from "../pages/user/App";
import prefix from "./custom/prefix.router";

export default [
  prefix("admin", [
    index(<App />),
    router("about", <>About</>),
    layout(<Outlet />, [
      prefix("profile", [
        index(<>Profile</>),
        router("edit", <>Edit</>),
        router("resume", <>Resume</>),
      ]),
      router("booking", <>Booking</>),
    ]),
  ]),
] as RouteObject[];
