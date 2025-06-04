import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ✅ Layout général du dashboard
import DashboardLayout from './layouts/DashboardLayout';

// ✅ Pages enfants du dashboard
import DashboardHome from './pages/DashboardHome';
import EnvoyerArgent from './pages/EnvoyerArgent';
import RetirerArgent from './pages/RetirerArgent';
import DemandeFonds from './pages/DemandeFonds';
import AcheterCarte from './pages/AcheterCarte';
import GenererReleve from './pages/GenererReleve';
import ModifierProfil from './pages/ModifierProfil';

// ✅ Pages supplémentaires hors layout
import CartesIAUserPage from './pages/CartesIAUserPage';
import HistoriqueCartesPage from './pages/HistoriqueCartesPage';
import CartesIAPage from './pages/CartesIAPage';
import TwoFactorAuth from './pages/TwoFactorAuth';

const AppUserRoutes = () => {
  return (
    <Routes>
      {/* 🔐 Routes protégées dans le layout (avec menu vertical) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="envoyer" element={<EnvoyerArgent />} />
        <Route path="retirer" element={<RetirerArgent />} />
        <Route path="demander" element={<DemandeFonds />} />
        <Route path="acheter-carte" element={<AcheterCarte />} />
        <Route path="releve-pdf" element={<GenererReleve />} />
        <Route path="modifier-profil" element={<ModifierProfil />} />
      </Route>

      {/* 🔄 Pages indépendantes (hors layout DashboardLayout) */}
      <Route path="/cartes-virtuelles" element={<CartesIAUserPage />} />
      <Route path="/cartes/historique" element={<HistoriqueCartesPage />} />
      <Route path="/dashboard/cartes-ia" element={<CartesIAPage />} />
      <Route path="/2fa" element={<TwoFactorAuth />} />

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppUserRoutes;
