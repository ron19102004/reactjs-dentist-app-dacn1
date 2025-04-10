import medicineCategoryApi from "../apis/medicine-category.api";
import { useQuery } from "@tanstack/react-query";
export const useMedicineCategory = () => {
  const createMedicineCategory = (formData: FormData) => {
    return medicineCategoryApi.createMedicineCategory(formData);
  };

  // const createMedicineCategory = async (formData: FormData) => {

  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const metadata = formData.get("metadata");
  //     console.log("Mock formData:", {
  //       metadata: JSON.parse(await (metadata as Blob).text()),
  //       image: formData.get("image"),
  //     });

  //     return {
  //       code: 200,
  //       data: {
  //         id: Math.random().toString(36).substring(2),
  //         name: "Mocked category",
  //       },
  //     };
  //   };

  const getMedicineCategories = () => {
    return medicineCategoryApi.getMedicineCategories();
  };


  const useMedicineCategories = () => {
    return useQuery({
      queryKey: ["medicine-categories"],
      queryFn: getMedicineCategories,
    });
  };

  return {
    createMedicineCategory,
    getMedicineCategories,
    useMedicineCategories
  };
};
