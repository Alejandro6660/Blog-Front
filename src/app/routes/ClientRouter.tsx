import { Route, Routes } from "react-router-dom";
import { HomePage } from "../client/pages/home/HomePage";
import { AboutPage } from "../client/pages/about/AboutPage";
import { UserPage } from "../client/pages/user/UserPage";
import { CreatePostPage } from "../client/pages/post/CreatePostPage";
import { ViewPostPage } from "../client/pages/post/ViewPostPage";

export const ClientRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<ViewPostPage />} />
      </Routes>
    </>
  );
};
