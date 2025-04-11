import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import useExpertise from "../../../../hooks/useExpertise.hook";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Tên chuyên môn không được để trống"),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

const CreateExpertise = () => {
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
  const { createExpertise } = useExpertise();

  const onSubmit = async (data: FormData) => {
    if (!imageFile) {
      toast.error("Vui lòng chọn ảnh cho chuyên môn!");
      return;
    }
    await createExpertise(
      {
        name: data.name,
        description: data.description,
        image: imageFile,
      },
      () => {
        navigate("/expertises");
      },
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
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 mt-2">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
        Thêm Chuyên Môn Mới
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-lg">
        <div>
          <label className="block font-semibold text-gray-800 mb-2">
            Tên chuyên môn <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("name")}
            placeholder="VD: Răng - Hàm - Mặt"
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
            placeholder="Mô tả ngắn gọn về chuyên môn"
            className="text-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-2">
            Ảnh chuyên môn <span className="text-red-500">*</span>
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
            onClick={() => navigate("/expertise")}
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3"
          >
            Lưu chuyên môn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpertise;
