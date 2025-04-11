import { createContext, FC } from "react";
import useAuth, { AuthContextType } from "../hooks/auth.hook";
import { UserLoginRequest, UserRegisterRequest } from "../apis/auth.api";

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  userCurrent: null,
  login: function (metadata: UserLoginRequest): Promise<void> {
    throw new Error("Function not implemented.");
  },
  logout: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  register: function (metadata: UserRegisterRequest): Promise<void> {
    throw new Error("Function not implemented.");
  },
  ifAuthFn: function <T>(fn: (token: string) => Promise<T>, errors?: (error: string) => void): Promise<T | null> {
    throw new Error("Function not implemented.");
  }
});
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const useAuthValue = useAuth();

  return (
    <AuthContext.Provider value={useAuthValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
