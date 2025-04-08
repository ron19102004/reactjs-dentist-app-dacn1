import { Outlet, RouteObject } from "react-router";
import { index, layout, prefix, router } from "./custom/index";

import PatientHomePage from "../pages/patient";
import MainLayout from "../layouts/main.layout";

export default [
  layout(<MainLayout />, [
    index(<PatientHomePage />),
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
