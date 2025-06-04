// src/admin/AppAdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "./DashboardAdmin";
import SidebarAdmin from "./components/SidebarAdmin";
import ValidationCartesAdmin from "./pages/ValidationCartesAdmin";
import AdminStatsPage from "./AdminStatsPage";
import AdminLogsPanel from "./AdminLogsPanel";
import SuperAdminGabkutPanel from "./SuperAdminGabkutPanel";
import AlertesIA from "./AlertesIA";

const AppAdminRoutes = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-4 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/valider-cartes" element={<ValidationCartesAdmin />} />
          <Route path="/admin/valider-cartes" element={<ValidationCartesAdmin />} />
          <Route path="/admin/stats" element={<AdminStatsPage />} />
          <Route path="/admin/logs" element={<AdminLogsPanel />} />
          <Route path="/admin/superadmin" element={<SuperAdminGabkutPanel />} />
          <Route path="/admin/alertes-ia" element={<AlertesIA />} />
          {/* autres routes admin ici */}
        </Routes>
      </div>
    </div>
  );
};

export default AppAdminRoutes;
