import React, { Fragment, use, useEffect } from "react";
import { Outlet } from "react-router";
import { Role, User } from "../apis";
import { AuthContext } from "./auth.context";

interface SecurityContextProps {
  roles?: Role[];
}

const SecurityProvider: React.FC<SecurityContextProps> = ({ roles }) => {
  const { isAuthenticated, userCurrent, isLoading, isError, errorMessage } =
    use(AuthContext);
  useEffect(() => {}, [isAuthenticated]);
  const roleValid = (roleRequires: Role[], userCurrent: User | null) => {
    if (userCurrent && userCurrent.role) {
      return roleRequires.includes(userCurrent.role);
    }
    return false;
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{errorMessage}</div>;
  if (!isAuthenticated) return <div>Unauthorized</div>;
  if (roles && roles.length > 0 && !roleValid(roles, userCurrent))
    return <div>Unauthorized</div>;
  return <Outlet />;
};

export default SecurityProvider;
