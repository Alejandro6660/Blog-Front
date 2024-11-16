import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../admin/pages/dahsboard/DashboardPage";
import { RolUserPage } from "../admin/pages/rolUsers/RolUserPage";
import { UsersPage } from "../admin/pages/users/UsersPage";

export const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DashboardPage />} />
        <Route path="/rolUsers" element={<RolUserPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
};
