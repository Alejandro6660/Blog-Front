import { Route, Routes } from "react-router-dom";
import { ClientRouter } from "./app/routes/ClientRouter";
import { AdminRouter } from "./app/routes/AdminRouter";
import { AuthRouter } from "./app/routes/AuthRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<ClientRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </>
  );
}

export default App;
