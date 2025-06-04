// src/users/pages/HistoriqueCartesPage.jsx
import React from "react";
import HistoriqueCartesBox from "../components/HistoriqueCartesBox";

const HistoriqueCartesPage = () => {
  return (
    <div className="bg-blue-950 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📄 Historique des Cartes Achetées</h1>
      <HistoriqueCartesBox />
    </div>
  );
};

export default HistoriqueCartesPage;
