import React from "react";
import { Menu } from "../../roots/layouts/control.layout";
import { NavLink } from "react-router";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import ListView from "../list";

interface MenuItemLayoutProps {
  menu: Menu;
  setSidebarOpen: (open: boolean) => void;
}
const MenuItemLayout: React.FC<MenuItemLayoutProps> = ({
  menu,
  setSidebarOpen,
}) => {
  const [isSubMenuActive, setIsSubMenuActive] = React.useState<boolean>(false);
  return (
    <div>
      <NavLink
        to={menu.path}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 p-3 rounded transition-colors duration-200",
            isActive
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          )
        }
        onClick={() => {
          setSidebarOpen(false);
          setIsSubMenuActive((prev) => !prev);
        }}
      >
        <span className="text-lg">{menu.icon}</span>
        <p className="flex items-center space-x-2">
          <span>{menu.label}</span>
          {menu.children && (
            <span>
              <ChevronDown width={20} />
            </span>
          )}
        </p>
      </NavLink>

      {/* Submenu nếu có */}
      {isSubMenuActive && (
        <div className="pl-8 mt-1 space-y-1">
          <ListView
            data={menu.children || []}
            render={(subMenu) => (
              <NavLink
                to={subMenu.path}
                className={({ isActive }) =>
                  cn(
                    "block text-sm px-3 py-2 rounded transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )
                }
                onClick={() => setSidebarOpen(false)}
              >
                <p className="flex items-center gap-2">
                  <span className="text-xs">{subMenu.icon}</span>
                  <span>{subMenu.label}</span>
                </p>
              </NavLink>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default MenuItemLayout;
