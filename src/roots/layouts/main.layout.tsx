import React from "react";
import { Outlet } from "react-router";
import FooterMainLayout from "../../components/layout/footer.layout";

const MainLayout: React.FC = () => {
  return (
    <section className="relative flex flex-col min-h-screen min-w-screen ">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">Logo</div>
          <nav className="hidden md:flex space-x-8">{/* nav  */}</nav>
          <button className="md:hidden text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content - flex-1 để chiếm hết không gian còn lại */}
      <main className="flex-1 container mx-auto ">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterMainLayout />
    </section>
  );
};

export default MainLayout;
