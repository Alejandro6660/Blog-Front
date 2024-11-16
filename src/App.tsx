import { Navigate, Route, Routes } from "react-router-dom";
import { ClientRouter } from "./app/routes/ClientRouter";
import { AdminRouter } from "./app/routes/AdminRouter";
import { AuthRouter } from "./app/routes/AuthRouter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { ESTATUS, onLogin } from "./store/auth/authSlice";
import { useEffect } from "react";
import { checkingToken } from "./store/auth/thunks";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { user, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(checkingToken(storedToken, parsedUser));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* <Route
          path="/"
          element={
            status === ESTATUS.AUTHENTICATED && user.rolUser === "ADMIN" ? (
              <AdminRouter />
            ) : (
              <ClientRouter />
            )
          }
        />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route
          path="/admin/*"
          element={
            status !== ESTATUS.AUTHENTICATED && user.rolUser !== "ADMIN" ? (
              <AuthRouter />
            ) : status === ESTATUS.AUTHENTICATED && user.rolUser === "ADMIN" ? (
              <AdminRouter />
            ) : (
              <ClientRouter />
            )
          }
        /> */}

        {status === ESTATUS.AUTHENTICATED && user.rolUser.name === "ADMIN" ? (
          <Route path={"/admin/*"} element={<AdminRouter />} />
        ) : (
          <Route path={"/*"} element={<ClientRouter />} />
        )}
        <Route
          path={"*"}
          element={
            status === ESTATUS.AUTHENTICATED &&
            user.rolUser.name === "ADMIN" ? (
              <AdminRouter />
            ) : (
              <ClientRouter />
            )
          }
        />
        <Route
          path={"/auth/*"}
          element={
            status === ESTATUS.AUTHENTICATED ? (
              <Navigate to={"/"} />
            ) : (
              <AuthRouter />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
