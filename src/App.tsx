import { Route, Routes } from "react-router-dom";
import { ClientRouter } from "./app/routes/ClientRouter";
import { AdminRouter } from "./app/routes/AdminRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<ClientRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
}

export default App;
