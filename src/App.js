import { App as AntApp } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import AppRoutesInner from "./routes/AppRoutes";

const App = () => {
  return (
    <AntApp>
      <Router>
        <AppRoutesInner />
      </Router>
    </AntApp>
  );
};

export default App;
