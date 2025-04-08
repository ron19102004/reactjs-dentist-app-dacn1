import React from 'react';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
          Oops! Trang bạn đang tìm không tồn tại.
        </p>
        <p className="mt-2 text-gray-600 text-base md:text-lg">
          Có thể đường dẫn sai hoặc trang đã bị xóa.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-gray-600 text-white rounded-xl font-bold text-sm md:text-base hover:bg-gray-700 transition duration-300"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
