import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import LogsConnexions from "./LogsConnexions";
import UtilisateursBloques from "./UtilisateursBloques";

const AppAdmin = () => {
  return (
    <Router>
      <div className="flex">
        <SidebarAdmin />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/admin/logs-connexions" element={<LogsConnexions />} />
            <Route path="/admin/utilisateurs-bloques" element={<UtilisateursBloques />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppAdmin;
