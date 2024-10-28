import { Route, Routes } from "react-router-dom";
import { HomePage } from "../client/pages/home/HomePage";
import { AboutPage } from "../client/pages/about/AboutPage";

export const ClientRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
};
