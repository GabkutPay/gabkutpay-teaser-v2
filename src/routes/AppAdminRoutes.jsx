import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 🔐 Middleware pour protéger les routes admin
import RequireAdminAuth from '../middleware/RequireAdminAuth';

// 🧩 Pages admin
import DashboardAdmin from '../admin/pages/DashboardAdmin';
import TransactionsAdmin from '../admin/pages/TransactionsAdmin';
import CartesVirtuellesAdmin from '../admin/pages/CartesVirtuellesAdmin';
import LogsAdmin from '../admin/pages/LogsAdmin';
import HistoriqueVerificationsAdmin from '../admin/pages/HistoriqueVerificationsAdmin';

const AppAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={<RequireAdminAuth><DashboardAdmin /></RequireAdminAuth>}
      />
      <Route
        path="/admin/transactions"
        element={<RequireAdminAuth><TransactionsAdmin /></RequireAdminAuth>}
      />
      <Route
        path="/admin/cartes"
        element={<RequireAdminAuth><CartesVirtuellesAdmin /></RequireAdminAuth>}
      />
      <Route
        path="/admin/logs"
        element={<RequireAdminAuth><LogsAdmin /></RequireAdminAuth>}
      />
      <Route
        path="/admin/verifications"
        element={<RequireAdminAuth><HistoriqueVerificationsAdmin /></RequireAdminAuth>}
      />
    </Routes>
  );
};

export default AppAdminRoutes;
