import * as yup from 'yup';
import { Gender } from '../apis/index.d';

export const registerSchema: yup.ObjectSchema<{
  fullName: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  gender: Gender;
}> = yup.object({
  fullName: yup
    .string()
    .required('Họ và tên không được để trống')
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự'),

  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không hợp lệ'),

  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
    ),

    phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      /^(?:\+84|84|0)(3|5|7|8|9)\d{8}$/,
      "Số điện thoại không hợp lệ"
    ),

  username: yup
    .string()
    .required('Tên đăng nhập không được để trống')
    .min(4, 'Tên đăng nhập phải có ít nhất 4 ký tự')
    .max(50, 'Tên đăng nhập không được vượt quá 50 ký tự'),

  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), 'Giới tính không hợp lệ')
    .required('Giới tính không được để trống'),
});
