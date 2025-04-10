import axios from "axios";
import { ApiResponse, Expertise } from "./index.d";
import { expertiseApi } from "../constants/api.constant";

const createExpertise = async (
  formData: FormData
): Promise<ApiResponse<Expertise>> => {

  const token = localStorage.getItem("token"); 
  const response = await axios.post<ApiResponse<Expertise>>(
    expertiseApi("new"),
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
  createExpertise,
};
