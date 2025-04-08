import { ApiResponse, SystemInfoData } from ".";

const getSystemInfo = async (): Promise<ApiResponse<SystemInfoData>> => {
  return {
    data: {
      systemName: "Ronial Company",
      systemVersion: "1.1.0",
      systemDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec.",
      systemAuthor: "ronial",
      systemAuthorEmail: "ron19102004@gmail.com",
      systemAuthorPhone: "0392477615",
      systemAuthorWebsite:
        "https://github.com/ron19102004/spring-boot-dentist-backend-dacn1/commit/2b00f6f82a9a74df713c52763e89b3aecff3f28e",
      systemMapURL:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4949.495209424102!2d108.25064671161654!3d15.97526544188085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology!5e1!3m2!1sen!2s!4v1744100550762!5m2!1sen!2s",
      systemAddress: "123 Main Street, New York, NY 10001",
      systemFacebookURL:
        "https://github.com/ron19102004/spring-boot-dentist-backend-dacn1/commit/2b00f6f82a9a74df713c52763e89b3aecff3f28e",
      systemTwitterURL:
        "https://github.com/ron19102004/spring-boot-dentist-backend-dacn1/commit/2b00f6f82a9a74df713c52763e89b3aecff3f28e",
      systemInstagramURL:
        "https://github.com/ron19102004/spring-boot-dentist-backend-dacn1/commit/2b00f6f82a9a74df713c52763e89b3aecff3f28e",
      systemLinkedinURL:
        "https://github.com/ron19102004/spring-boot-dentist-backend-dacn1/commit/2b00f6f82a9a74df713c52763e89b3aecff3f28e",
    },
    code: 200,
    message: "Success",
    responseTime: new Date().toISOString(),
  };
};


export default {
    getSystemInfo
}