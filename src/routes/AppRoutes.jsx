import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/index";
import InformacoesPage from "../pages/informacoes/[id]/index";
import Header from "../components/Header";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/informacoes/:id" element={<InformacoesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
