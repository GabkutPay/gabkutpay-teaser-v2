import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageCoachIA from "./user/PageCoachIA";
import HistoriqueCoach from "./user/HistoriqueCoach";

const AppRoutes = ({ userId }) => {
  return (
    <Router>
      <Routes>
        <Route path="/coach" element={<PageCoachIA userId={userId} />} />
        <Route path="/coach/historique" element={<HistoriqueCoach userId={userId} />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
