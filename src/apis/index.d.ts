export interface ApiResponse<T> {
  code: number;
  message: StringDecoder;
  data: T | null;
  responseTime: string;
}
export enum Role {
  ADMIN = "ADMIN",
  DENTIST = "DENTIST",
  STAFF = "STAFF",
  PATIENT = "PATIENT",
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  gender: Gender; 
  active: boolean;
  role: Role; 
  otpcode: string;
  otpexpiredAt: string; 
  createdAt: string; 
  updatedAt: string;
}

export interface Expertise {
  id: number;
  name: string;
  slugify: string;
  description: string;
  image?: string;
}

export interface MedicineCategory {
  id: number;
  name: string;
  description: string;
  image?: string; 
}
export interface MedicineCategory {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export interface Medicine {
  id: number;
  name: string;
  quantity: number;
  supplier: string;
  pricePerUnit: number;
  image?: string;
  expiryDate: string; 
  medicineCategory: Pick<MedicineCategory, "id" | "name">;
}



export interface SystemInfoData {
  systemName: string;
  systemVersion: string;
  systemDescription: string;
  systemAuthor: string;
  systemAuthorEmail: string;
  systemAuthorPhone: string;
  systemAuthorWebsite: string;
  systemMapURL: string;
  systemAddress: string;
  systemFacebookURL: string;
  systemTwitterURL: string;
  systemInstagramURL: string;
  systemLinkedinURL: string;
}
