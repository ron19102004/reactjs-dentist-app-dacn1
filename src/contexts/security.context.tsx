import React, { Fragment, use, useEffect } from "react";
import { Outlet } from "react-router";
import { Role, User } from "../apis";
import { AuthContext } from "./auth.context";
import Loading from "../components/loading";
import UnauthorizedPage from "../roots/pages/errors/unauthorized.error";

interface SecurityContextProps {
  roles?: Role[];
}

const SecurityProvider: React.FC<SecurityContextProps> = ({ roles }) => {
  const { isAuthenticated, userCurrent, isLoading, isError, errorMessage } =
    use(AuthContext);
  useEffect(() => {}, [isAuthenticated]);
  const roleValid = (
    roleRequires: Role[],
    userCurrent: User | null
  ): boolean => {
    if (userCurrent && userCurrent.role) {
      return roleRequires.includes(userCurrent.role);
    }
    return false;
  };
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loading>
          <p className="text-lg font-semibold text-gray-700 mt-4">
            Đang tải dữ liệu...
          </p>
        </Loading>
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white border  rounded-2xl p-6 shadow w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Đã xảy ra lỗi
          </h2>
          <p className="text-gray-700 mb-6">
            {errorMessage ||
              "Có lỗi không xác định xảy ra. Vui lòng thử lại sau."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  if (!isAuthenticated) return <UnauthorizedPage />;
  if (roles && roles.length > 0 && !roleValid(roles, userCurrent))
    return <UnauthorizedPage />;
  return <Outlet />;
};

export default SecurityProvider;
