import { use } from "react";
import { SystemInfoData } from "../apis/index.d";
import { AuthContext } from "../contexts/auth.context";
import adminApi from "../apis/admin.api";

interface AdminContextType {
  changeStaffInfo(name: string): Promise<void>;
  updateSystemInfo(
    data: SystemInfoData,
    success: () => void,
    err: (error: string) => void
  ): Promise<void>;
}

const useAdmin = (): AdminContextType => {
  const { ifAuthFn } = use(AuthContext);
  const updateSystemInfo = async (
    data: SystemInfoData,
    success: () => void,
    err: (error: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.updateSystemInfo(token, data);
        if (res.code === 200) success();
        else err(res.message);
      },
      (error) => {
        err(error);
      }
    );
  };
  const changeStaffInfo = async (name: string): Promise<void> => {};
  return {
    changeStaffInfo: changeStaffInfo,
    updateSystemInfo:updateSystemInfo
  };
};
export default useAdmin;
