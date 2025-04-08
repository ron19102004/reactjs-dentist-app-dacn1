
export interface ApiResponse<T>{
    code: number;
    message: StringDecoder;
    data: T | null;
    responseTime: string
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
