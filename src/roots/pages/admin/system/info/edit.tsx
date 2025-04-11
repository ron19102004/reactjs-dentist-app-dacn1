import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import adminApi from "../../../../../apis/admin.api";
import { SystemInfoData } from "../../../../../apis";
import Loading from "../../../../../components/loading";
import { Info } from "lucide-react";
import useAdmin from "../../../../../hooks/admin.hook";
import toast from "react-hot-toast";
import { Input, InputCustom } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";

const schema = yup.object({
  systemName: yup.string().required("Tên hệ thống là bắt buộc"),
  systemAuthor: yup.string().required("Tác giả là bắt buộc"),
  systemAuthorEmail: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  systemAuthorPhone: yup.string().required("SĐT là bắt buộc"),
  systemAuthorWebsite: yup
    .string()
    .url("URL không hợp lệ")
    .required("Website là bắt buộc"),
  systemAddress: yup.string().required("Địa chỉ là bắt buộc"),
  systemVersion: yup.string().required("Phiên bản là bắt buộc"),
  systemMapURL: yup
    .string()
    .url("Google Map URL không hợp lệ")
    .required("Bắt buộc"),
  systemDescription: yup.string().required("Mô tả là bắt buộc"),
  systemFacebookURL: yup
    .string()
    .url("Facebook URL không hợp lệ")
    .required("Bắt buộc"),
  systemTwitterURL: yup
    .string()
    .url("Twitter URL không hợp lệ")
    .required("Bắt buộc"),
  systemInstagramURL: yup
    .string()
    .url("Instagram URL không hợp lệ")
    .required("Bắt buộc"),
  systemLinkedinURL: yup
    .string()
    .url("Linkedin URL không hợp lệ")
    .required("Bắt buộc"),
});

const SystemInfoEditPanel = () => {
  const [loading, setLoading] = useState(true);
  const { updateSystemInfo } = useAdmin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SystemInfoData>({
    resolver: yupResolver(schema),
    defaultValues: {
      systemName: "",
      systemAuthor: "",
      systemAuthorEmail: "",
      systemAuthorPhone: "",
      systemAuthorWebsite: "",
      systemAddress: "",
      systemVersion: "",
      systemMapURL: "",
      systemDescription: "",
      systemFacebookURL: "",
      systemTwitterURL: "",
      systemInstagramURL: "",
      systemLinkedinURL: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminApi.getSystemInfo();
        if (res.code === 200) {
          if (res.data) {
            reset(res.data);
          }
        }
      } catch (error) {
        console.error("Lỗi tải thông tin hệ thống:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit = async (values: SystemInfoData) => {
    await updateSystemInfo(
      values,
      () => {
        toast("Cập nhật thành công");
      },
      (err) => {
        toast.error(err);
      }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loading />
      </div>
    );
  }

  return (
    <div className="md:flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto px-4 py-8 bg-white rounded-xl space-y-6 md:border"
      >
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Info className="text-blue-600" />
          Chỉnh sửa thông tin hệ thống
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="systemName"
              className="block text-sm font-medium text-gray-700"
            >
              Tên hệ thống
            </label>
            <InputCustom
              id="systemName"
              {...register("systemName")}
              error={errors.systemName?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemAuthor"
              className="block text-sm font-medium text-gray-700"
            >
              Tác giả
            </label>
            <InputCustom
              id="systemAuthor"
              {...register("systemAuthor")}
              error={errors.systemAuthor?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemAuthorEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email tác giả
            </label>
            <InputCustom
              id="systemAuthorEmail"
              {...register("systemAuthorEmail")}
              error={errors.systemAuthorEmail?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemAuthorPhone"
              className="block text-sm font-medium text-gray-700"
            >
              SĐT tác giả
            </label>
            <InputCustom
              id="systemAuthorPhone"
              {...register("systemAuthorPhone")}
              error={errors.systemAuthorPhone?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemAuthorWebsite"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <InputCustom
              id="systemAuthorWebsite"
              {...register("systemAuthorWebsite")}
              error={errors.systemAuthorWebsite?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
            </label>
            <InputCustom
              id="systemAddress"
              {...register("systemAddress")}
              error={errors.systemAddress?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemVersion"
              className="block text-sm font-medium text-gray-700"
            >
              Phiên bản
            </label>
            <InputCustom
              id="systemVersion"
              {...register("systemVersion")}
              error={errors.systemVersion?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemMapURL"
              className="block text-sm font-medium text-gray-700"
            >
              Google Map URL
            </label>
            <InputCustom
              id="systemMapURL"
              {...register("systemMapURL")}
              error={errors.systemMapURL?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemFacebookURL"
              className="block text-sm font-medium text-gray-700"
            >
              Facebook
            </label>
            <InputCustom
              id="systemFacebookURL"
              {...register("systemFacebookURL")}
              error={errors.systemFacebookURL?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemTwitterURL"
              className="block text-sm font-medium text-gray-700"
            >
              Twitter
            </label>
            <InputCustom
              id="systemTwitterURL"
              {...register("systemTwitterURL")}
              error={errors.systemTwitterURL?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemInstagramURL"
              className="block text-sm font-medium text-gray-700"
            >
              Instagram
            </label>
            <InputCustom
              id="systemInstagramURL"
              {...register("systemInstagramURL")}
              error={errors.systemInstagramURL?.message}
            />
          </div>

          <div>
            <label
              htmlFor="systemLinkedinURL"
              className="block text-sm font-medium text-gray-700"
            >
              Linkedin
            </label>
            <InputCustom
              id="systemLinkedinURL"
              {...register("systemLinkedinURL")}
              error={errors.systemLinkedinURL?.message}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả hệ thống
          </label>
          <Textarea rows={5} {...register("systemDescription")} />
          {errors.systemDescription && (
            <p className="text-sm text-red-500 mt-1">
              {errors.systemDescription.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </form>
    </div>
  );
};

export default SystemInfoEditPanel;
