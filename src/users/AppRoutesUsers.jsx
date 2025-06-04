import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importation des composants principaux utilisateur
import DashboardUser from './components/DashboardUser';
import AchatBilletAvion from './components/AchatBilletAvion';
// Tu pourras ajouter d'autres composants ici :
/*
import CarteVirtuelleBox from './components/CarteVirtuelleBox';
import HistoriqueTransactions from './components/HistoriqueTransactions';
import SuggestionsBox from './components/SuggestionsBox';
*/

const AppRoutesUsers = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardUser />} />
      <Route path="/billets-avion" element={<AchatBilletAvion />} />
      {/* Autres routes à ajouter ici */}
    </Routes>
  );
};

export default AppRoutesUsers;
