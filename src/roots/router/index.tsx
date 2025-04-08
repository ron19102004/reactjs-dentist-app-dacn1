import { RouterProvider, createBrowserRouter } from "react-router";
import patientRouter from "./patient.router";
import adminRouter from "./admin.router";
import dentistRouter from "./dentist.router";
import staffRouter from "./staff.router";
import { FC } from "react";

const RouterRoot:FC = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        ...patientRouter,
        ...adminRouter,
        ...dentistRouter,
        ...staffRouter,
      ])}
    />
  );
};
export default RouterRoot;
