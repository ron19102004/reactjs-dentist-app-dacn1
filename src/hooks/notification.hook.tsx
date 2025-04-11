import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import toast from "react-hot-toast";
export interface NotificationContextType {
  socket: WebSocket | null;
  pushNotification(message: string): void;
  toastError(message: string): void;
}
const useNotification = (): NotificationContextType => {
  const socket = useRef<WebSocket | null>(null);
  const { isAuthenticated, token, isLoading } = use(AuthContext);
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
        `ws://localhost:8080/notification?token=${token}&userAgent=web`
      );
      socket.current.onopen = () => {
        console.log("🔵 Notification Connected");
      };
      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.message) {
          pushNotification(data.message);
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
  };
};
export default useNotification;
