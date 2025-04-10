import axios from "axios";


import { ApiResponse, Medicine } from ".";
import { medicineApi } from "../constants/api.constant";
// VD: medicineApiRoutes.new = "/medicines"

const createMedicine = async (
  formData: FormData
): Promise<ApiResponse<Medicine>> => {
  const token = localStorage.getItem("token");
  const response = await axios.post<ApiResponse<Medicine>>(
    medicineApi('new'),
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

export default {
  createMedicine,
};
