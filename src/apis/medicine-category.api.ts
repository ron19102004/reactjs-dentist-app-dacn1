import axios from "axios";
import { medicineCategoryApi } from "../constants/api.constant";
import { ApiResponse, MedicineCategory } from ".";

const createMedicineCategory = async (
  formData: FormData
): Promise<ApiResponse<MedicineCategory>> => {

  const token = localStorage.getItem("token"); 
  const response = await axios.post<ApiResponse<MedicineCategory>>(
    medicineCategoryApi("new"),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", 
        Accept: "application/json",
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return response.data;
};

const getMedicineCategories = async (): Promise<ApiResponse<MedicineCategory[]>> => {
    const token = localStorage.getItem("token");
    const response = await axios.get<ApiResponse<MedicineCategory[]>>(
      medicineCategoryApi(""),
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

export default {
    createMedicineCategory,
    getMedicineCategories
};
