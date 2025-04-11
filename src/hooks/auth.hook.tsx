import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Gender, Role, User } from "../apis/index.d";
import authApi, {
  UserLoginRequest,
  UserRegisterRequest,
} from "../apis/auth.api";
import { AxiosError } from "axios";

export const ACCESS_TOKEN_KEY: string = "access_token";
export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  userCurrent: User | null;

  login(metadata: UserLoginRequest): Promise<void>;
  logout(): Promise<void>;
  register(metadata: UserRegisterRequest): Promise<void>;
  ifAuthFn<T>(
    fn: (token: string) => Promise<T>,
    errors?: (error: string) => void
  ): Promise<T | null>;
}
export const useAuth = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userCurrent, setUserCurrent] = useState<User | null>(null);

  const ifAuthFn = async <T,>(
    fn: (token: string) => Promise<T>,
    errors?: (error: string) => void
  ) => {
    try {
      if (isAuthenticated && token) {
        return await fn(token);
      } else {
        if (errors) errors("Require authentication");
      }
    } catch (error) {
      if (errors) errors("Request error");
      if(error instanceof AxiosError){
        console.log(error.response);
        
      }
      
    }
    return null;
  };

  const login = async (metadata: UserLoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userLogin(metadata);
      console.log(response);
      
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }
      const { accessToken, user } = response.data!;
      setToken(accessToken);
      setIsAuthenticated(true);
      setUserCurrent(user);
      Cookies.set(ACCESS_TOKEN_KEY, accessToken);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    setUserCurrent(null);
    Cookies.remove(ACCESS_TOKEN_KEY);
  };
  const register = async (metadata: UserRegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userRegister(metadata);
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeAuth = async () => {
    console.log("Auth initialized");
    try {
      setIsLoading(true);
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (token) {
        const getUserInfo = await authApi.getInfoUser(token);
        if (getUserInfo && getUserInfo.code === 200) {
          setIsAuthenticated(true);
          setToken(token);
          setUserCurrent(getUserInfo.data);
        }
      } else {
        setIsAuthenticated(false);
      }
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
    ifAuthFn: ifAuthFn,
  };
};
export default useAuth;
