import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Gender, Role, User } from "../apis/index.d";
import authApi, {
  UserLoginRequest,
  UserRegisterRequest,
} from "../apis/auth.api";
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
}
export const useAuth = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userCurrent, setUserCurrent] = useState<User | null>(null);

  const login = async (metadata: UserLoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userLogin(metadata);
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
      Cookies.set("token", accessToken);
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
    Cookies.remove("token");
  };
  const register = async (metadata: UserRegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.userRegister(metadata);
  
      if (response.code !== 200) {
        setIsError(true);
        setErrorMessage(response.message);
        // NÉM LỖI RA NGOÀI để component xử lý
        throw new Error(response.message);
      }
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
        throw error; // Ném lỗi để component bắt được
      } else {
        const unknownError = new Error("Failed to register");
        setErrorMessage(unknownError.message);
        throw unknownError;
      }
    } finally {
      setIsLoading(false);
    }
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
        id: 0,
        fullName: "TEST",
        email: "TEST",
        phone: "TEST",
        username: "TEST",
        gender: Gender.MALE,
        active: false,
        role: Role.DENTIST,
        otpcode: "TEST",
        otpexpiredAt: "TEST",
        createdAt: "TEST",
        updatedAt: "TEST",
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
