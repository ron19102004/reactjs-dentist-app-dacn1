import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { cn } from "../../lib/utils";
import ListView from "../../components/list";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import MenuItemLayout from "../../components/layout/menu-item.layout";
export interface Menu {
  label: string;
  icon: React.ReactNode;
  children?: Menu[];
  path: string;
}
interface AdminLayoutProps {
  menus: Menu[];
}
const ControlLayout: React.FC<AdminLayoutProps> = ({ menus }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      {/* Nút mở sidebar (chỉ hiện trên mobile) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-100">
        <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Quản trị
        </div>
        <button
          className="text-2xl"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar - responsive */}
      <aside
        className={cn(
          "fixed md:static z-50 bg-white shadow-lg border-r w-64 lg:w-80 p-4 h-screen overflow-y-auto transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header Sidebar */}
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-2xl md:text-3xl">
              Bảng điều khiển
            </span>
            <div className="h-1 w-20 mt-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </h2>
          <button
            className="text-xl md:hidden "
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col justify-between">
          <ListView
            data={menus}
            render={(menu) => (
              <MenuItemLayout menu={menu} setSidebarOpen={setSidebarOpen} />
            )}
          />
          <MenuItemLayout
            menu={{ icon: <LogOut />, label: "Thoát", path: "/" }}
            setSidebarOpen={setSidebarOpen}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 flex flex-col",
          "p-4 md:p-8",
          "min-h-screen md:min-h-[auto]"
        )}
      >
        <Outlet />
      </main>
    </section>
  );
};

export default ControlLayout;
