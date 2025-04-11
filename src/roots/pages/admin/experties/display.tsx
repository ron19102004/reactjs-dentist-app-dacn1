import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Expertise } from "../../../../apis";
import useExpertise from "../../../../hooks/useExpertise.hook";
import Loading from "../../../../components/loading";
import { AlertTriangle, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";

const ExpertiseDisplayPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [expertise, setExpertise] = useState<Expertise | null>(null);
  const { getDetailsBySlug } = useExpertise();
  const [isLoadError, setIsLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  const init = async (slug: string) => {
    await getDetailsBySlug(
      slug,
      (data) => {
        setExpertise(data);
        setLoading(false);
      },
      () => {
        setIsLoadError(true);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (slug) init(slug);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!expertise) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <AlertTriangle className="text-red-500 w-12 h-12 animate-pulse" />
        <h2 className="text-xl sm:text-2xl font-semibold text-red-600">
          Không tìm thấy chuyên môn
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          Có thể đường dẫn không đúng hoặc dữ liệu đã bị xóa. Vui lòng kiểm tra
          lại liên kết hoặc quay về trang trước.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className=" mx-auto sm:p-6 lg:p-10">
      {/* Back button */}
      <button
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6 transition"
        onClick={() => window.history.back()}
      >
        <ArrowLeft size={18} />
        Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-100">
        {/* Banner Image */}
        <div className="w-full h-64 sm:h-80 md:h-[420px] overflow-hidden">
          <img
            src={expertise.image}
            alt={expertise.name}
            className="object-cover w-full h-full transition duration-300 hover:scale-105"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Title */}
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-gray-900">
            <Info size={28} className="text-blue-500" />
            {expertise.name}
          </div>

          {/* Slug */}
          <p className="text-sm text-gray-500 italic">
            Đường dẫn trang này:{" "}
            <span className="font-medium">
              <Link to={`/expertise/${expertise.slugify}`}>
                /expertise/{expertise.slugify}
              </Link>
            </span>
          </p>

          {/* Description */}
          <div
            className="prose max-w-none text-gray-700 text-base leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: expertise.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpertiseDisplayPage;
