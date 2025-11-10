import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/index";
import InformacoesPage from "../pages/informacoes/[id]/index";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/informacoes/:id" element={<InformacoesPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
