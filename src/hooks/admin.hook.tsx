interface AdminContextType {
  changeStaffInfo(name: string): Promise<void>;
}

const useAdmin = (): AdminContextType => {
  const changeStaffInfo = async (name: string): Promise<void> => {};
  return {
    changeStaffInfo: changeStaffInfo,
  };
};
export default useAdmin;
