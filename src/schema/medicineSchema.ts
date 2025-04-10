// schema.tsx
import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().min(1, "Tên thuốc không được để trống"),
  quantity: z
    .string()
    .min(1, "Số lượng không được để trống")
    .regex(/^\d+$/, "Số lượng phải là số nguyên"),
  supplier: z.string().min(1, "Nhà cung cấp không được để trống"),
  pricePerUnit: z
    .string()
    .min(1, "Giá không được để trống")
    .regex(/^\d+(\.\d{1,2})?$/, "Giá không hợp lệ"),
  expiryDate: z.string().min(1, "Ngày hết hạn không được để trống"),
  medicineCategoryId: z.string().min(1, "Vui lòng chọn loại thuốc"),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;
