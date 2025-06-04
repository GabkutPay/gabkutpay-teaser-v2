import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardUser from './DashboardUser';
import AchatBilletAvion from './components/AchatBilletAvion';
import HistoriqueBilletsAvion from './components/HistoriqueBilletsAvion';

const AppRoutesUser = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardUser />} />
      <Route path="/billets-avion" element={<AchatBilletAvion />} />
      <Route path="/billets-historique" element={<HistoriqueBilletsAvion />} />
    </Routes>
  );
};

export default AppRoutesUser;
