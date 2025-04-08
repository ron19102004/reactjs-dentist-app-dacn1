import { Navigate, Outlet, RouteObject } from "react-router";
import { index, layout, prefix, router } from "./custom/index";
import AdminHomePage from "../pages/admin";
import ControlLayout, { Menu } from "../layouts/control.layout";
import {
  BookOpenCheck,
  BookUser,
  CirclePlus,
  Home,
  Image,
  Info,
  KeyRound,
  MonitorCog,
  Pencil,
  ShieldMinus,
  UsersRound,
} from "lucide-react";

const menus: Menu[] = [
  {
    icon: <Home />,
    label: "Trang chủ",
    path: "/admin/home",
  },
  {
    icon: <UsersRound />,
    label: "Tài khoản",
    path: "/admin/account",
    children: [
      {
        icon: <KeyRound />,
        label: "Khóa tài khoản",
        path: "/admin/account/lock",
      },
      {
        icon: <ShieldMinus />,
        label: "Mở khóa tài khoản",
        path: "/admin/account/unlock",
      },
      {
        icon: <BookUser />,
        label: "Chỉnh thông tin nhân viên",
        path: "/admin/account/edit-staff",
      },
      {
        icon: <BookUser />,
        label: "Chỉnh thông tin bác sĩ",
        path: "/admin/account/edit-dentist",
      },
    ],
  },
  {
    icon: <BookOpenCheck />,
    label: "Chuyên môn",
    path: "/admin/experties",
    children: [
      {
        icon: <CirclePlus />,
        label: "Thêm chuyên môn",
        path: "/admin/experties/create",
      },
      {
        icon: <Pencil />,
        label: "Sửa chuyên môn",
        path: "/admin/experties/edit",
      },
    ],
  },
  {
    icon: <MonitorCog />,
    label: "Hệ thống",
    path: "/admin/system",
    children: [
      {
        icon: <Info />,
        label: "Thông tin hệ thống",
        path: "/admin/system/information",
      },
      {
        icon: <Image />,
        label: "Ảnh giao diện",
        path: "/admin/system/images",
      },
    ],
  },
];
export default [
  layout(<ControlLayout menus={menus} />, [
    prefix("admin", [
      index(<Navigate to="/admin/home" replace />),
      router("home", <AdminHomePage />),
      prefix("account", [
        index(<>Account</>),
        router("lock", <>Lock</>),
        router("unlock", <>Unlock</>),
        router("edit-staff", <>Edit st</>),
        router("edit-dentist", <>Edit dt</>),
      ]),
      prefix("experties", [
        index(<>experties</>),
        router("create", <>Edit</>),
        router("edit", <>Resume</>),
      ]),
      prefix("system", [
        index(<>system</>),
        router("information", <>Edit</>),
        router("images", <>Resume</>),
      ]),
    ]),
  ]),
] as RouteObject[];
