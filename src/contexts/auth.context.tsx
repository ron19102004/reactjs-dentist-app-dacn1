import { createContext, FC } from "react";
import useAuth, { AuthContextType } from "../hooks/auth.hook";

export const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    errorMessage: null,
    userCurrent: null,
    login: function (username: string, password: string): Promise<void> {
        throw new Error("Function not implemented.");
    },
    logout: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    register: function (username: string, password: string): Promise<void> {
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
