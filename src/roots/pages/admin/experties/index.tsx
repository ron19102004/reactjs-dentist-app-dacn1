import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";
import { Expertise } from "../../../../apis/index.d";
import useExpertise from "../../../../hooks/useExpertise.hook";
import ListView from "../../../../components/list";

const ExpertisePage = () => {
  const [expertises, setExpertises] = useState<Expertise[]>([]);
  const navigate = useNavigate();
  const { getAllExpertise } = useExpertise();

  const fetchData = async () => {
    await getAllExpertise(
      (data) => {
        setExpertises(data);
      },
      (error) => {
        toast.error(error || "Lỗi khi tải dữ liệu.");
      }
    );
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      try {
        // await deleteExpertise(id);
        toast.success("Đã xoá thành công.");
        fetchData();
      } catch {
        toast.error("Lỗi khi xoá.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Danh sách chuyên môn
        </h1>
        <Button
          onClick={() => navigate("/admin/experties/create")}
          className="w-full sm:w-auto"
        >
          Thêm mới
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ListView
          data={expertises}
          render={(exp) => (
            <div
              key={exp.id}
              className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {exp.name}
                </h2>
                <p className="mt-1 line-clamp-3 text-sm text-gray-600 break-all">
                  Đường dẫn mô tả: {exp.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/admin/experties/${exp.slugify}`)}
                  size="sm"
                  className="text-sm bg-blue-600 text-white"
                >
                  Chi tiết
                </Button>
                <Button
                  onClick={() => navigate(`/admin/experties/edit/${exp.id}`)}
                  size="sm"
                  className="text-sm"
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => handleDelete(exp.id)}
                  size="sm"
                  variant="destructive"
                  className="text-sm"
                >
                  Xoá
                </Button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ExpertisePage;
