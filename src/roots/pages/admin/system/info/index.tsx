import React, { FC, useEffect, useState } from "react";
import {
  Info,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { SystemInfoData } from "../../../../../apis";
import adminApi from "../../../../../apis/admin.api";
import Loading from "../../../../../components/loading";
import { useNavigate } from "react-router";

const InfoItem = ({
  icon,
  label,
  value,
  isMap = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  isMap?: boolean;
}) => {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      </div>
      {isMap ? (
        <div className="w-full h-64 rounded-lg overflow-hidden border">
          <iframe
            src={value}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <p className="text-sm text-gray-800 break-words break-all">{value}</p>
      )}
    </div>
  );
};

const SystemInfoPanel: FC = () => {
  const [data, setSystemInfo] = useState<SystemInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await adminApi.getSystemInfo();
        if (res.code === 200) {
          setSystemInfo(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin hệ thống:", error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center px-4">
        <div className="bg-red-100 text-red-600 rounded-full p-3 mb-3">
          <Info size={28} />
        </div>
        <p className="text-lg font-semibold text-red-600">
          Không thể tải thông tin hệ thống
        </p>
        <p className="text-sm text-gray-500">
          Vui lòng kiểm tra kết nối mạng hoặc thử tải lại trang sau ít phút.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-7xl bg-white  rounded-2xl p-6 space-y-8 md:border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <Info size={28} className="text-blue-600" />
            Thông tin hệ thống
          </div>
          <button
            type="button"
            onClick={() => {
              navigate("/admin/system/information/edit");
            }} // Bạn có thể định nghĩa handleEdit để xử lý
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition text-xs md:text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M5 13.586V16h2.414l9.707-9.707-2.414-2.414L5 13.586zM4 12.172L12.172 4 14 5.828 5.828 14H4v-1.828z"
                clipRule="evenodd"
              />
            </svg>
            Chỉnh sửa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <InfoItem
            icon={<Globe size={18} />}
            label="Tên hệ thống"
            value={data.systemName}
          />
          <InfoItem
            icon={<User size={18} />}
            label="Tác giả"
            value={data.systemAuthor}
          />
          <InfoItem
            icon={<Mail size={18} />}
            label="Email tác giả"
            value={data.systemAuthorEmail}
          />
          <InfoItem
            icon={<Phone size={18} />}
            label="Số điện thoại"
            value={data.systemAuthorPhone}
          />
          <InfoItem
            icon={<Globe size={18} />}
            label="Website"
            value={data.systemAuthorWebsite}
          />
          <InfoItem
            icon={<MapPin size={18} />}
            label="Địa chỉ"
            value={data.systemAddress}
          />
          <InfoItem
            icon={<Globe size={18} />}
            label="Phiên bản"
            value={data.systemVersion}
          />
          <InfoItem
            isMap
            icon={<MapPin size={18} />}
            label="Google Map"
            value={data.systemMapURL}
          />
        </div>

        {data.systemDescription && (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Mô tả hệ thống
            </p>
            <p className="text-base text-gray-700 whitespace-pre-line">
              {data.systemDescription}
            </p>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-gray-600 mb-2">Mạng xã hội</p>
          <div className="flex gap-4 text-blue-600">
            {data.systemFacebookURL && (
              <a
                href={data.systemFacebookURL}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Facebook size={22} />
              </a>
            )}
            {data.systemTwitterURL && (
              <a
                href={data.systemTwitterURL}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Twitter size={22} />
              </a>
            )}
            {data.systemInstagramURL && (
              <a
                href={data.systemInstagramURL}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Instagram size={22} />
              </a>
            )}
            {data.systemLinkedinURL && (
              <a
                href={data.systemLinkedinURL}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Linkedin size={22} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfoPanel;
