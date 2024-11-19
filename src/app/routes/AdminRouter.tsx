import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../admin/pages/dahsboard/DashboardPage";
import { RolUserPage } from "../admin/pages/rolUsers/RolUserPage";
import { UsersPage } from "../admin/pages/users/UsersPage";
import { UserPage } from "../admin/pages/users/UserPage";

export const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DashboardPage />} />
        <Route path="/rolUsers" element={<RolUserPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </>
  );
};
