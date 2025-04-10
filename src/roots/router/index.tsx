import { RouterProvider, createBrowserRouter } from "react-router";
import patientRouter from "./patient.router";
import adminRouter from "./admin.router";
import dentistRouter from "./dentist.router";
import staffRouter from "./staff.router";
import { FC, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NotFound from "../pages/errors/not-found.error";
import authRouter from "./auth.router";

const RouterRoot: FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian animation
      once: true, // chỉ chạy một lần
    });
  }, []);
  return (
    <RouterProvider
      router={createBrowserRouter([
        ...authRouter,
        ...patientRouter,
        ...adminRouter,
        ...dentistRouter,
        ...staffRouter,
        { path: "*", element: <NotFound /> }, //
      ])}
    />
  );
};
export default RouterRoot;
