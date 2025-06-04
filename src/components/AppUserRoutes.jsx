import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RoutePrivee from '../components/RoutePrivee';

// 📁 Dashboards utilisateurs par type
import DashboardStandard from '../users/standard/DashboardStandard';
import DashboardPro from '../users/pro/DashboardPro';
import DashboardInstitution from '../users/institution/DashboardInstitution';
import DashboardVIP from '../users/vip/DashboardVIP';
import DashboardDiaspora from '../users/diaspora/DashboardDiaspora';
import DashboardEtudiant from '../users/etudiant/DashboardEtudiant';
import DashboardEleve from '../users/eleve/DashboardEleve';
import DashboardAvenir from '../users/avenir/DashboardAvenir';
import DashboardPartage from '../users/partage/DashboardPartage';
import PageNotFound from '../components/PageNotFound';

const AppUserRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  const type = user.typeCompte?.toLowerCase();

  return (
    <Routes>
      {type === 'standard' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardStandard /></RoutePrivee>} />
      )}
      {type === 'professionnel' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardPro /></RoutePrivee>} />
      )}
      {type === 'institutionnel' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardInstitution /></RoutePrivee>} />
      )}
      {type === 'vip' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardVIP /></RoutePrivee>} />
      )}
      {type === 'diaspora' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardDiaspora /></RoutePrivee>} />
      )}
      {type === 'étudiant' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardEtudiant /></RoutePrivee>} />
      )}
      {type === 'élève' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardEleve /></RoutePrivee>} />
      )}
      {type === 'avenir' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardAvenir /></RoutePrivee>} />
      )}
      {type === 'partagé' && (
        <Route path="/dashboard" element={<RoutePrivee><DashboardPartage /></RoutePrivee>} />
      )}

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppUserRoutes;
