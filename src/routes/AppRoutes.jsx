import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/index";
import Header from "../components/Header";
import Extrator from "../pages/extracao";

const AppRoutes = () => {
  return (
    <div className="flex flex-row h-screen">
      <Header />

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/extrator" element={<Extrator />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
