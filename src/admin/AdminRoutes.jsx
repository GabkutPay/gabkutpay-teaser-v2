import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RequireAdmin from './RequireAdmin';
import AdminSettingsPage from './AdminSettingsPage';
import Unauthorized from './Unauthorized';
// Importez d'autres composants si besoin

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route protégée accessible uniquement aux admins */}
        <Route
          path="/admin/settings"
          element={
            <RequireAdmin>
              <AdminSettingsPage />
            </RequireAdmin>
          }
        />

        {/* Page affichée en cas d'accès non autorisé */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Exemple de redirection si nécessaire */}
        {/* <Route path="*" element={<Navigate to="/unauthorized" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
