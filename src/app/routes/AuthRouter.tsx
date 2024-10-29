import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/login/LoginPage";

export const AuthRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};
