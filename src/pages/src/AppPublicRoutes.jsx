import React from 'react';
import DetailsTypesComptes from './pages/DetailsTypesComptes';
import FormulaireInscription from './pages/FormulaireInscription'; // Ajustez le chemin selon votre arborescence
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importez d'autres composants si nécessaire

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'inscription */}
        <Route path="/inscription" element={<FormulaireInscription />} />

        {/* Route pour afficher les détails des types de comptes */}
        <Route path="/details-comptes" element={<DetailsTypesComptes />} />

        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default App;
