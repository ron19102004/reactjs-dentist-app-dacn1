import React, { FC, use, useEffect, useRef } from "react";
import { NotificationContext } from "../../../contexts/notification.context";
import ListView from "../../../components/list";
import { ScrollText, Info, AlertTriangle, XCircle } from "lucide-react";

const SystemLogPanel: FC = () => {
  const { adminLogMessages } = use(NotificationContext);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống cuối mỗi khi log thay đổi
  useEffect(() => {
    console.log(adminLogMessages);

    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [adminLogMessages]);

  const getIcon = (log: string) => {
    if (log.startsWith("INFO"))
      return <Info className="text-blue-500" size={20} />;
    if (log.startsWith("WARNING"))
      return <AlertTriangle className="text-yellow-500" size={20} />;
    if (log.startsWith("ERROR"))
      return <XCircle className="text-red-500" size={20} />;
    return <ScrollText className="text-gray-500" size={20} />;
  };

  return (
    <div className="md:flex flex-col justify-center items-center h-full">
      <div className="bg-white rounded-xl  p-4 sm:p-6 md:p-8 space-y-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            <ScrollText className="text-blue-600" size={24} />
            <span>Nhật ký hệ thống</span>
          </div>
        </div>

        {/* Log list */}
        <div className="h-[80vh] overflow-y-auto space-y-3 pr-1 md:pr-2">
          <ListView
            data={adminLogMessages}
            render={(value, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 transition p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="mt-1">{getIcon(value)}</div>
                <div className="text-sm sm:text-base text-gray-700 break-words break-all font-semibold">
                  {value}
                </div>
              </div>
            )}
          />
          {/* ref để cuộn xuống cuối */}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
};

export default SystemLogPanel;
