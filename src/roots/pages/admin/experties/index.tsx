import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";
import { Expertise } from "../../../../apis";
// import { deleteExpertise, getAllExpertises } from "../../../../apis/expertise.api";

const ExpertisePage = () => {
  const [expertises, setExpertises] = useState<Expertise[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    // try {
    //   const res = await getAllExpertises();
    //   if (res.code === 200 && res.data) {
    //     setExpertises(res.data);
    //   } else {
    //     toast.error(res.message || "Lỗi khi tải dữ liệu.");
    //   }
    // } catch {
    //   toast.error("Không thể tải danh sách chuyên môn.");
    // }
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
    // fetchData();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách chuyên môn</h1>
        <Button onClick={() => navigate("/expertise/create")}>Thêm mới</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expertises.map((exp) => (
          <div key={exp.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{exp.name}</h2>
            <p className="line-clamp-2 text-sm text-muted-foreground">{exp.description}</p>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => navigate(`/expertise/edit/${exp.id}`)} size="sm">Sửa</Button>
              <Button onClick={() => handleDelete(exp.id)} size="sm" variant="destructive">Xoá</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpertisePage
