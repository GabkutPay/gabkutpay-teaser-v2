import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarAdmin from "./components/SidebarAdmin";

// 🧩 Import des vues Admin
import DashboardAdmin from "./admin/DashboardAdmin";
import CartesIAAdminDashboard from "./admin/CartesIAAdminDashboard";
import ValidationCartesAdmin from "./admin/ValidationCartesAdmin";
import UtilisateursBloques from "./admin/UtilisateursBloques";
import UtilisateursSurveiller from "./admin/UtilisateursSurveiller";
import LogsConnexions from "./admin/LogsConnexions";
import ExportationsAdmin from "./admin/ExportationsAdmin";
import ParametresAdmin from "./admin/ParametresAdmin";

const AppAdminRoutes = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="flex-grow bg-gray-100 min-h-screen p-6">
        <Routes>
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/cartes-ia" element={<CartesIAAdminDashboard />} />
          <Route path="/admin/valider-cartes" element={<ValidationCartesAdmin />} />
          <Route path="/admin/utilisateurs-bloques" element={<UtilisateursBloques />} />
          <Route path="/admin/utilisateurs-a-surveiller" element={<UtilisateursSurveiller />} />
          <Route path="/admin/logs-connexions" element={<LogsConnexions />} />
          <Route path="/admin/exportations" element={<ExportationsAdmin />} />
          <Route path="/admin/settings" element={<ParametresAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppAdminRoutes;
