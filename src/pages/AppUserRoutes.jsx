import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// 🔒 Dashboards par type de compte
import DashboardStandard from '../users/standard/DashboardStandard';
import DashboardPro from '../users/pro/DashboardPro';
import DashboardInstitution from '../users/institution/DashboardInstitution';
import DashboardVIP from '../users/vip/DashboardVIP';
import DashboardDiaspora from '../users/diaspora/DashboardDiaspora';
import DashboardEtudiant from '../users/etudiant/DashboardEtudiant';
import DashboardEleve from '../users/eleve/DashboardEleve';
import DashboardAvenir from '../users/avenir/DashboardAvenir';
import DashboardPartage from '../users/partage/DashboardPartage';
import AcheterCartePage from '../pages/AcheterCartePage';
import RoutePrivee from '../middlewares/RoutePrivee';

import PageNotFound from '../components/PageNotFound';

const AppUserRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  const type = user.typeCompte?.toLowerCase();

  const routeMap = {
    standard: <DashboardStandard />,
    professionnel: <DashboardPro />,
    institutionnel: <DashboardInstitution />,
    vip: <DashboardVIP />,
    diaspora: <DashboardDiaspora />,
    étudiant: <DashboardEtudiant />,
    élève: <DashboardEleve />,
    avenir: <DashboardAvenir />,
    partagé: <DashboardPartage />,
  };

  const DashboardComponent = routeMap[type];

  if (!DashboardComponent) {
    return <PageNotFound />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={DashboardComponent} />
      <Route path="/acheter-carte" element={<RoutePrivee><AcheterCartePage /></RoutePrivee>} />
<Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppUserRoutes;
