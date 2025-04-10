import { Navigate, Outlet, RouteObject } from "react-router";
import { index, layout, prefix, router } from "./custom/index";
import DentistHomePage from "../pages/dentist";
import {
  BadgeAlert,
  BriefcaseMedical,
  CirclePlus,
  Home,
  Pencil,
  Pill,
  SquareChartGantt,
  UsersRound,
} from "lucide-react";
import ControlLayout, { Menu } from "../layouts/control.layout";
import SecurityProvider from "../../contexts/security.context";
import { Role } from "../../apis/index.d";
import BookingTodayPage from "../pages/dentist/booking/booking-today";

const menus: Menu[] = [
  {
    icon: <Home />,
    label: "Trang chủ",
    path: "/dentist/home",
  },
  {
    icon: <UsersRound />,
    label: "Lịch hẹn",
    path: "/dentist/booking",
    children: [
      {
        icon: <SquareChartGantt />,
        label: "Lịch hẹn hôm nay",
        path: "/dentist/booking/today",
      },
      {
        icon: <BadgeAlert />,
        label: "Lịch hẹn cần xác nhận",
        path: "/dentist/booking/confirm",
      },
    ],
  },
  {
    icon: <BriefcaseMedical />,
    label: "Loại thuốc",
    path: "/dentist/medicine-category",
    children: [
      {
        icon: <CirclePlus />,
        label: "Thêm loại thuốc",
        path: "/dentist/medicine-category/create",
      },
      {
        icon: <Pencil />,
        label: "Sửa loại thuốc",
        path: "/dentist/medicine-category/edit",
      },
    ],
  },
  {
    icon: <Pill />,
    label: "Thuốc",
    path: "/dentist/medicine",
    children: [
      {
        icon: <CirclePlus />,
        label: "Thêm thuốc",
        path: "/dentist/medicine/create",
      },
      {
        icon: <Pencil />,
        label: "Sửa thuốc",
        path: "/dentist/medicine/edit",
      },
    ],
  },
];


export default [
  layout(<SecurityProvider roles={[Role.DENTIST]} />, [
    layout(<ControlLayout menus={menus} />, [
      prefix("dentist", [
        index(<Navigate replace to={"/dentist/home"} />),
        router("home", <DentistHomePage />),
        prefix("booking", [
          index(<DentistHomePage />),
          router("today", <BookingTodayPage/>),
          router("confirm", <>Lich hen hom nay</>),
        ]),
        prefix("medicine-category", [
          index(<>all</>),
          router("details/:medicineId", <>details</>),
          router("create", <>add</>),
          router("edit", <>edit</>),
        ]),
        prefix("medicine", [
          index(<>all - tìm kiếm </>),
          router("create", <>add</>),
          router("edit", <>edit</>),
        ]),
      ]),
    ]),
  ]),
] as RouteObject[];
