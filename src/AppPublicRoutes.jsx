import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 📄 Import des pages publiques
import VerifierDocument from '../../pages/public/VerifierDocument';
// import AccueilPublic from '../../pages/public/AccueilPublic'; // à activer si besoin
// import NosServices from '../../pages/public/NosServices';     // autre page publique possible

const AppPublicRoutes = () => {
  return (
    <Routes>
      {/* ✅ Page de vérification QR code */}
      <Route path="/verifier/:id" element={<VerifierDocument />} />

      {/* ✅ Exemple d’autres pages publiques */}
      {/* <Route path="/" element={<AccueilPublic />} />
      <Route path="/nos-services" element={<NosServices />} /> */}

      {/* ❌ Route fallback si introuvable */}
      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  );
};

export default AppPublicRoutes;
