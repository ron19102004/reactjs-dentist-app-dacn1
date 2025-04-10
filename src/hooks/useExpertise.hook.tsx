
import expertiseApi from "../apis/expertise.api";

export const useExpertise = () => {
 

  const createExpertise = (formData: FormData) => {
    return expertiseApi.createExpertise(formData);
  };

  return {
    createExpertise,
  };
};

