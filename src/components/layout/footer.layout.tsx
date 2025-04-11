import React, { useEffect } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { ApiResponse, SystemInfoData } from "../../apis";
import adminApi from "../../apis/admin.api";

const systemInfoDefault: SystemInfoData = {
  systemName: "Company",
  systemVersion: "0.0.0",
  systemDescription: "Waiting...",
  systemAuthor: "Waiting...",
  systemAuthorEmail: "Waiting...",
  systemAuthorPhone: "Waiting...",
  systemAuthorWebsite: "Waiting...",
  systemMapURL: "",
  systemAddress: "Waiting...",
  systemFacebookURL: "Waiting...",
  systemTwitterURL: "Waiting...",
  systemInstagramURL: "Waiting...",
  systemLinkedinURL: "Waiting...",
};
const FooterMainLayout: React.FC = () => {
  const [systemInfo, setSystemInfo] =
    React.useState<SystemInfoData>(systemInfoDefault);
  const initialize = async (): Promise<void> => {    
    const systemInfoResponse: ApiResponse<SystemInfoData> =
      await adminApi.getSystemInfo();      
    if (systemInfoResponse.code === 200) {
      setSystemInfo(systemInfoResponse.data || systemInfoDefault);
    }
  };
  useEffect(() => {
    initialize();
  }, []);
  return (
    <footer className="bg-gray-50 text-gray-900 py-10 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div data-aos="fade-up">
            <h3 className="text-2xl font-semibold mb-4">
              {systemInfo.systemName}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {systemInfo.systemDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 transition"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info & Map */}
          <div data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="text-gray-400 text-sm space-y-2 mb-4">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {systemInfo.systemAddress}
              </p>
              <a
                href="mailto:info@example.com"
                className="flex items-center gap-2 hover:text-gray-500 transition"
              >
                <Mail size={16} /> {systemInfo.systemAuthorEmail}
              </a>
            </div>
            <div className="w-full h-40 rounded-lg overflow-hidden border">
              <iframe
                src={systemInfo.systemMapURL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>

          {/* Follow Us */}
          <div data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={systemInfo.systemFacebookURL}
                className="text-gray-400 hover:text-gray-500 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href={systemInfo.systemTwitterURL}
                className="text-gray-400 hover:text-gray-500 transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href={systemInfo.systemInstagramURL}
                className="text-gray-400 hover:text-gray-500 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href={systemInfo.systemLinkedinURL}
                className="text-gray-400 hover:text-gray-500 transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm"
          data-aos="fade-up"
        >
          <p>
            &copy; {new Date().getFullYear()} {systemInfo.systemName}. All
            rights reserved.
          </p>
          <p>
            <a href={systemInfo.systemAuthorWebsite}>My website - </a>
            <span>ver{systemInfo.systemVersion}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterMainLayout;
