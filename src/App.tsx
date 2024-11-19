import { Navigate, Route, Routes } from "react-router-dom";
import { ClientRouter } from "./app/routes/ClientRouter";
import { AdminRouter } from "./app/routes/AdminRouter";
import { AuthRouter } from "./app/routes/AuthRouter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { ESTATUS } from "./store/auth/authSlice";
import { useEffect } from "react";
import { checkingToken } from "./store/auth/thunks";
import { Toaster } from "./components/ui/toaster";

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
    <Routes>
      {/* Ruta para usuarios ADMIN */}
      {status === ESTATUS.AUTHENTICATED && user.rolUser.name === "ADMIN" ? (
        <>
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      ) : (
        // Ruta para usuarios CLIENT
        <>
          <Route path="/*" element={<ClientRouter />} />
        </>
      )}

      {/* Ruta para autenticación */}
      <Route
        path="/auth/*"
        element={
          status === ESTATUS.AUTHENTICATED ? (
            <Navigate to="/" />
          ) : (
            <AuthRouter />
          )
        }
      />
    </Routes>
  );
}

export default App;
