import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SidebarAdmin from "./admin/SidebarAdmin";
import LogsConnexions from "./admin/LogsConnexions";
import UtilisateursBloques from "./admin/UtilisateursBloques";
import UtilisateursASurveiller from "./admin/UtilisateursASurveiller";

const AppAdmin = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/admin/logs-connexions" element={<LogsConnexions />} />
            <Route path="/admin/utilisateurs-bloques" element={<UtilisateursBloques />} />
            <Route path="/admin/utilisateurs-a-surveiller" element={<UtilisateursASurveiller />} />
            {/* Redirection par défaut vers une page d’accueil admin ou logs connexions */}
            <Route path="/admin" element={<Navigate to="/admin/logs-connexions" replace />} />
            {/* Route 404 - Page non trouvée */}
            <Route path="*" element={<p className="text-center text-gray-600 mt-10">Page non trouvée</p>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppAdmin;
