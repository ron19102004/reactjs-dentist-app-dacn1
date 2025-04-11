import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, use } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { UserRegisterRequest } from "../../../apis/auth.api";
import * as yup from "yup";
import useAuth from "../../../hooks/auth.hook";
import { Gender } from "../../../apis/index.d";
import { AuthContext } from "../../../contexts/auth.context";
import ListView from "../../../components/list";

const registerSchema: yup.ObjectSchema<{
  fullName: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  gender: Gender;
}> = yup.object({
  fullName: yup
    .string()
    .required("Họ và tên không được để trống")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được vượt quá 100 ký tự"),

  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),

  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
    ),

  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^(?:\+84|84|0)(3|5|7|8|9)\d{8}$/, "Số điện thoại không hợp lệ"),

  username: yup
    .string()
    .required("Tên đăng nhập không được để trống")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự")
    .max(50, "Tên đăng nhập không được vượt quá 50 ký tự"),

  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), "Giới tính không hợp lệ")
    .required("Giới tính không được để trống"),
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserRegisterRequest>({
    resolver: yupResolver(registerSchema),
  });

  const { register: registerUser, isError, errorMessage } = use(AuthContext);

  const onSubmit = async (data: UserRegisterRequest) => {
    setLoading(true);
    try {
      await registerUser(data);
      if (!isError) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl space-y-6"
        data-aos="fade-up"
      >
        <div className="flex justify-center" data-aos="fade-down">
          {/* <img src={BotImage} alt="Logo" className="h-16 mb-4" /> */}
        </div>

        <h2
          className="text-3xl font-bold text-center text-blue-600"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Đăng ký tài khoản
        </h2>

        <ListView
          data={[
            { name: "fullName", label: "Họ và tên", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Mật khẩu", type: "password" },
            { name: "phone", label: "Số điện thoại", type: "text" },
            { name: "username", label: "Tên đăng nhập", type: "text" },
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
                {...register(field.name as keyof UserRegisterRequest)}
                className="mt-1"
                placeholder={field.label}
              />
              {errors[field.name as keyof UserRegisterRequest] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name as keyof UserRegisterRequest]?.message}
                </p>
              )}
            </div>
          )}
        />

        <div data-aos="fade-up" data-aos-delay="750">
          <Label htmlFor="gender">Giới tính</Label>
          <Select
            onValueChange={(val: Gender) => setValue("gender", val as Gender)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="-- Chọn giới tính --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Gender.MALE}>Nam</SelectItem>
              <SelectItem value={Gender.FEMALE}>Nữ</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
        </div>
      </form>
    </div>
  );
}
