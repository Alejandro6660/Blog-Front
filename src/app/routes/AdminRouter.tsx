import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../admin/pages/dahsboard/DashboardPage";

export const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DashboardPage />} />
      </Routes>
    </>
  );
};
