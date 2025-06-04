import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComparateurComptes from './pages/ComparateurComptes';
// Importez d'autres composants si besoin

function App() {
  return (
    <Router>
      <Routes>
        {/* Autres routes de votre application */}

        {/* Route pour la page comparateur des comptes Gabkut */}
        <Route path="/comptes-gabkut" element={<ComparateurComptes />} />

        {/* Exemple d'autres routes */}
        {/* <Route path="/admin/types-comptes" element={<AdminComptesTypes />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
