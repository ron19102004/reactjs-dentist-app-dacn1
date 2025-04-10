import { useCallback } from "react";
import medicineApi from "../apis/medicine.api";
import { ApiResponse, Medicine } from "../apis";


export const useMedicine = () => {
  const createMedicine = useCallback(
    async (formData: FormData): Promise<ApiResponse<Medicine>> => {
      return await medicineApi.createMedicine(formData);
    },
    []
  );

  return {
    createMedicine,
  };
};
