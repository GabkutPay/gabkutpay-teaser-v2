import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Contact from './pages/Contact';
import FormulaireInscription from './pages/FormulaireInscription';

const AppPublicRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route principale vers la page d'accueil */}
        <Route path="/" element={<Accueil />} />

        {/* Route vers la page de contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Route vers le formulaire d'inscription */}
        <Route path="/inscription" element={<FormulaireInscription />} />
      </Routes>
    </Router>
  );
};

export default AppPublicRoutes;
