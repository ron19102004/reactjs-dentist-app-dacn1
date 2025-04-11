import { Outlet, RouteObject } from "react-router";
import { index, layout, prefix, router } from "./custom/index";

import PatientHomePage from "../pages/patient";
import MainLayout from "../layouts/main.layout";
import ExpertiseDisplayPage from "../pages/admin/experties/display";

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
    prefix("expertise", [
      index(<>expertise</>),
      router(":slug", <ExpertiseDisplayPage />),
    ]),
  ]),
] as RouteObject[];
