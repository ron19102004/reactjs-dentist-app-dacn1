import React from "react";
import { Link } from "react-router";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-6 py-7 rounded-2xl shadow border text-center w-full max-w-md ">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          401 - Unauthorized
        </h1>
        <p className="text-gray-700 mb-6">
          Bạn không có quyền truy cập trang này. Vui lòng đăng nhập hoặc quay
          lại trang chủ.
        </p>
        <Link
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-200 font-semibold"
          to={"/"}
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
