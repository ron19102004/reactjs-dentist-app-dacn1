import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import useMedicineCategory from "../../../../hooks/useMedicineCategory.hook";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().min(1, "Tên loại thuốc không được để trống"),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function CreateMedicineCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { createMedicineCategory, getMedicineCategories } =
    useMedicineCategory();

  const getMedicineCategoriesQuery = useQuery({
    queryKey: ["medicine-categories"],
    queryFn: getMedicineCategories,
  });

  const onSubmit = async (data: FormData) => {
    if (!imageFile) {
      toast.error("Vui lòng chọn ảnh cho loại thuốc!");
      return;
    }
    await createMedicineCategory(
      {
        name: data.name,
        description: data.description,
        image: imageFile,
      },
      () => {},
      (error) => {
        console.log(error);
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 mt-1">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
        Thêm Loại Thuốc Mới
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-lg">
        <div>
          <label className="block font-semibold text-gray-800 mb-2">
            Tên loại thuốc <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("name")}
            placeholder="VD: Kháng sinh, Giảm đau..."
            className="text-lg px-4 py-3"
          />
          {errors.name && (
            <p className="text-base text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-2">
            Mô tả
          </label>
          <Textarea
            rows={5}
            {...register("description")}
            placeholder="Mô tả ngắn gọn về loại thuốc"
            className="text-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-2">
            Ảnh loại thuốc <span className="text-red-500">*</span>
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:text-base file:px-5 file:py-2 file:bg-blue-50 hover:file:bg-blue-100"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 w-48 h-48 object-cover rounded-lg border"
            />
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="text-lg px-6 py-3"
            onClick={() => navigate("/medicine-categories")}
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3"
          >
            Lưu loại thuốc
          </Button>
        </div>
      </form>
    </div>
  );
}
