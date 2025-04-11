import { createContext, FC } from "react";
import useNotification, {
  NotificationContextType,
} from "../hooks/notification.hook";

export const NotificationContext = createContext<NotificationContextType>({
  socket: null,
  pushNotification: function (message: string): void {
    throw new Error("Function not implemented.");
  },
  toastError: function (message: string): void {
    throw new Error("Function not implemented.");
  }
});

interface NotificationProviderProps {
  children: React.ReactNode;
}
const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  return (
    <NotificationContext.Provider value={useNotification()}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
