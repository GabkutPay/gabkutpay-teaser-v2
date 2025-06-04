import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importation des pages publiques
import Accueil from '../pages/public/Accueil';
import Contact from '../pages/public/Contact';
import VerifierDocument from '../pages/public/VerifierDocument';

const AppPublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verifier/:id" element={<VerifierDocument />} />
    </Routes>
  );
};

export default AppPublicRoutes;
