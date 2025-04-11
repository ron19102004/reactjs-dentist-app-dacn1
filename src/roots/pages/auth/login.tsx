import React, { use, useEffect } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { UserLoginRequest } from "../../../apis/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../components/ui/input";
import ListView from "../../../components/list";
import toast from "react-hot-toast";

const loginSchema: yup.ObjectSchema<{
  password: string;
  username: string;
}> = yup.object({
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
    ),
  username: yup
    .string()
    .required("Tên đăng nhập không được để trống")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự")
    .max(50, "Tên đăng nhập không được vượt quá 50 ký tự"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginRequest>({
    resolver: yupResolver(loginSchema),
  });
  const { login, isAuthenticated, isLoading, errorMessage, isError } =
    use(AuthContext);

  const onSubmit = async (data: UserLoginRequest) => {
    await login(data);
    if (isError) {
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/");
  }, [isAuthenticated, isLoading]);
  return (
    <div className="min-h-screen flex items-center justify-center md:bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg md:shadow-lg w-full max-w-sm"
        data-aos="fade-up"
      >
        <h2
          className="text-2xl font-bold mb-6 text-center text-gray-800"
          data-aos="fade-up"
        >
          Đăng nhập
        </h2>
        <ListView
          data={[
            { name: "username", label: "Tên đăng nhập", type: "text" },
            { name: "password", label: "Mật khẩu", type: "password" },
          ]}
          render={(field, index) => (
            <div
              key={field.name}
              data-aos="fade-up"
              data-aos-delay={150 + index * 100}
            >
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type}
                {...register(field.name as keyof UserLoginRequest)}
                className="mt-1"
                placeholder={field.label}
              />
              {errors[field.name as keyof UserLoginRequest] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name as keyof UserLoginRequest]?.message}
                </p>
              )}
            </div>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-5"
          data-aos="fade-up"
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
