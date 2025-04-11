import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { CreateMedicineRequest } from "../../../../apis/medicine.api";
import { MedicineUnit } from "../../../../apis/index.d";
import useMedicine from "../../../../hooks/useMedicine.hook";
import toast from "react-hot-toast";

export interface CreateMedicineFormInput {
  name: string;
  quantity: number;
  supplier: string;
  pricePerUnit: number;
  expiryDate: string;
  medicineCategoryId: number;
  image?: File;
}

interface MedicineCategory {
  id: number;
  name: string;
}

// MOCK DATA
const mockCategories: MedicineCategory[] = [
  { id: 1, name: "Giảm đau" },
  { id: 2, name: "Kháng sinh" },
  { id: 3, name: "Vitamin" },
];

const schema = yup.object({
  name: yup.string().required("Tên thuốc là bắt buộc"),
  quantity: yup.number().min(1, "Số lượng phải > 0").required("Bắt buộc"),
  supplier: yup.string().required("Nhà cung cấp là bắt buộc"),
  pricePerUnit: yup.number().min(0, "Giá phải ≥ 0").required("Bắt buộc"),
  expiry: yup.string().required("Ngày hết hạn là bắt buộc"),
  medicineCategoryId: yup.number().required("Phải chọn loại thuốc"),
});

type FormData = Omit<CreateMedicineRequest, "medicineUnit">;

export const CreateMedicine: FC = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [medicineUnitSelected, setMedicineUnitSelected] =
    useState<MedicineUnit>(MedicineUnit.BOTTLE);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { createMedicine } = useMedicine();
  // Mock fetch categories
  useEffect(() => {
    // Giả lập fetch API
    setTimeout(() => {
      setCategories(mockCategories);
    }, 500);
  }, []);

  const onSubmit = async (data: FormData) => {
    await createMedicine(
      {
        ...data,
        medicineUnit: medicineUnitSelected,
      },
      () => {
        toast("Success");
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-8 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden p-8"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Thêm thuốc mới
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột 1 */}
          <div className="space-y-6">
            <FormField label="Tên thuốc" error={errors.name?.message}>
              <Input
                {...register("name")}
                disabled={loading}
                className="text-base h-12 px-4"
                placeholder="Paracetamol, Amoxicillin..."
              />
            </FormField>

            <FormField label="Số lượng" error={errors.quantity?.message}>
              <Input
                type="number"
                {...register("quantity")}
                disabled={loading}
                className="text-base h-12 px-4"
                placeholder="100"
              />
            </FormField>

            <FormField label="Nhà cung cấp" error={errors.supplier?.message}>
              <Input
                {...register("supplier")}
                disabled={loading}
                className="text-base h-12 px-4"
                placeholder="Công ty Dược ABC"
              />
            </FormField>
          </div>

          {/* Cột 2 */}
          <div className="space-y-6">
            <FormField
              label="Giá mỗi đơn vị (VNĐ)"
              error={errors.pricePerUnit?.message}
            >
              <Input
                type="number"
                step="0.01"
                {...register("pricePerUnit")}
                disabled={loading}
                className="text-base h-12 px-4"
                placeholder="5000"
              />
            </FormField>

            <FormField label="Ngày hết hạn" error={errors.expiry?.message}>
              <Input
                type="date"
                {...register("expiry")}
                disabled={loading}
                className="text-base h-12 px-4"
              />
            </FormField>

            <FormField
              label="Loại thuốc"
              error={errors.medicineCategoryId?.message}
            >
              <Select
                onValueChange={(val) =>
                  setValue("medicineCategoryId", Number(val))
                }
                disabled={loading}
                defaultValue={watch("medicineCategoryId")?.toString()}
              >
                <SelectTrigger className="text-base h-12 px-4">
                  <SelectValue placeholder="Chọn loại thuốc" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>

        {/* Hình ảnh (chiếm full width) */}
        <div className="mt-6">
          <FormField label="Hình ảnh sản phẩm">
            <div className="space-y-3">
              <Input
                type="file"
                accept="image/*"
                disabled={loading}
                className="text-base py-3 px-4"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              {imagePreview && (
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-64 h-64 object-contain rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </FormField>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg font-medium"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
            {loading ? "Đang thêm..." : "Thêm thuốc"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const FormField: FC<{
  label: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => (
  <div className="space-y-1">
    <Label className="text-base font-semibold text-gray-700">{label}</Label>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
