import { Navigate, Outlet, RouteObject } from "react-router";
import { index, layout, prefix, router } from "./custom/index";
import StaffHomePage from "../pages/staff";

import {
  BriefcaseMedical,
  CirclePlus,
  Home,
  LayoutList,
  Pencil,
  Pill,
  UsersRound,
} from "lucide-react";
import ControlLayout, { Menu } from "../layouts/control.layout";
import SecurityProvider from "../../contexts/security.context";
import { Role } from "../../apis/index.d";

const menus: Menu[] = [
  {
    icon: <Home />,
    label: "Trang chủ",
    path: "/staff/home",
  },
  {
    icon: <UsersRound />,
    label: "Lịch hẹn",
    path: "/staff/booking",
    children: [
      {
        icon: <Home />,
        label: "Tạo hóa đơn",
        path: "/staff/booking/invoice/create",
      },
      {
        icon: <Home />,
        label: "Xác nhận thanh toán",
        path: "/staff/booking/invoice/confirm",
      },
    ],
  },
  {
    icon: <BriefcaseMedical />,
    label: "Loại thuốc",
    path: "/staff/medicine-category",
    children: [
      {
        icon: <CirclePlus />,
        label: "Thêm loại thuốc",
        path: "/staff/medicine-category/create",
      },
      {
        icon: <Pencil />,
        label: "Sửa loại thuốc",
        path: "/staff/medicine-category/edit",
      },
    ],
  },
  {
    icon: <Pill />,
    label: "Thuốc",
    path: "/staff/medicine",
    children: [
      {
        icon: <CirclePlus />,
        label: "Thêm thuốc",
        path: "/staff/medicine/create",
      },
      {
        icon: <Pencil />,
        label: "Sửa thuốc",
        path: "/staff/medicine/edit",
      },
    ],
  },
  {
    icon: <LayoutList />,
    label: "Dịch vụ",
    path: "/staff/service",
    children: [
      {
        icon: <CirclePlus />,
        label: "Thêm dịch vụ",
        path: "/staff/service/create",
      },
      {
        icon: <Pencil />,
        label: "Sửa dịch vụ",
        path: "/staff/service/edit",
      },
    ],
  },
];

export default [
  layout(<SecurityProvider roles={[Role.STAFF]}/>, [
    layout(<ControlLayout menus={menus} />, [
      prefix("staff", [
        index(<Navigate replace to={"/staff/home"} />),
        router("home", <StaffHomePage />),
        prefix("booking", [
          index(<>Xem lịch hẹn theo ngày cuar bs </>),
          prefix("invoice", [
            index(<Navigate replace to={"/staff/booking/invoice"} />),
            router("create", <>create</>),
            router("confirm", <>confirm</>),
          ]),
        ]),
        prefix("service", [
          index(<>service</>),
          router("create", <>add</>),
          router("edit", <>edit</>),
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
