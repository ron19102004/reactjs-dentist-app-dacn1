import { use } from "react";
import expertiseApi, { CreateExpertiseRequest } from "../apis/expertise.api";
import { AuthContext } from "../contexts/auth.context";
import { AuthContextType } from "./auth.hook";
import { ApiResponse, Expertise } from "../apis/index.d";

export interface ExpertiseContextType {
  createExpertise(
    data: CreateExpertiseRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
}
const useExpertise = (): ExpertiseContextType => {
  const { ifAuthFn } = use<AuthContextType>(AuthContext);
  const createExpertise = async (
    data: CreateExpertiseRequest,
    success: () => void,
    errors: (error: string) => void
  ) => {
    await ifAuthFn<void>(
      async (token) => {
        const res = await expertiseApi.createExpertise(data, token);
        if (res.code === 200) {
          success();
        } else {
          errors(res.message);
        }
      },
      (error) => {
        errors(error);
      }
    );
  };

  return {
    createExpertise: createExpertise,
  };
};

export default useExpertise;
