import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../client/pages/home/HomePage";

export const ClientRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};
