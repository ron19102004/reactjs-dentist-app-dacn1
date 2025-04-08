import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Role, User } from "../apis/index.d";
export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  userCurrent: User | null;

  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(username: string, password: string): Promise<void>;
}
export const useAuth = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userCurrent, setUserCurrent] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    Cookies.set("token", "value");
  };
  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    setUserCurrent(null);
  };
  const register = async (username: string, password: string) => {
    setToken(null);
    setIsAuthenticated(false);
    setUserCurrent(null);
  };
  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (token) {
        setToken(token);
        setIsAuthenticated(true);
      } else {
        setToken(null);
        setIsAuthenticated(false);
        Cookies.set("token", "value");
      }
      const user: User = {
        id: "1",
        name: "John Doe",
        role: Role.ADMIN,
      };
      setUserCurrent(user);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to initialize authentication");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    initializeAuth();
  }, []);
  return {
    token: token,
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
    isError: isError,
    errorMessage: errorMessage,
    userCurrent: userCurrent,
    login: login,
    logout: logout,
    register: register,
  };
};
export default useAuth;
