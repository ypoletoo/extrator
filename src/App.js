import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutesInner from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutesInner />
    </Router>
  );
};

export default App;
