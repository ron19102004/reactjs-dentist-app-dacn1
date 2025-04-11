import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import toast from "react-hot-toast";
import { API_HOST_NAME } from "../constants/api.constant";
import { Role } from "../apis/index.d";
export interface NotificationContextType {
  socket: WebSocket | null;
  pushNotification(message: string): void;
  toastError(message: string): void;
  adminLogMessages: string[];
}
const useNotification = (): NotificationContextType => {
  const [adminLogMessages, setAdminLogMessage] = useState<string[]>([]);
  const socket = useRef<WebSocket | null>(null);
  const { isAuthenticated, token, isLoading, userCurrent } = use(AuthContext);
  const pushNotification = (message: string) => {
    toast(message, {
      icon: "🔔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  const toastError = (message: string) => {
    toast.error(message, {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && token && token.length > 0) {
      socket.current = new WebSocket(
        `ws://${API_HOST_NAME}/notification?token=${token}&userAgent=web`
      );
      socket.current.onopen = () => {
        console.log("🔵 Notification Connected");
      };
      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.message) {
          if (userCurrent?.role !== Role.ADMIN) {
            pushNotification(data.message);
          } else {
            pushNotification("Có log mới");
            setAdminLogMessage(props => [...props, data.message]);
          }
        }
      };
      socket.current.onclose = () =>
        console.log("🔴 Notification Disconnected");
    }
  }, [isAuthenticated]);

  return {
    socket: socket.current,
    pushNotification: pushNotification,
    toastError: toastError,
    adminLogMessages: adminLogMessages,
  };
};
export default useNotification;
