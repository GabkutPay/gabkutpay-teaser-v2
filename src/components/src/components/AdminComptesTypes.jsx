import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminComptesTypes from './AdminComptesTypes';
// Importez ici d'autres composants si besoin

function App() {
  return (
    <Router>
      <Routes>
        {/* Autres routes de votre application */}

        {/* Route pour la gestion des types de comptes */}
        <Route path="/admin/types-comptes" element={<AdminComptesTypes />} />

        {/* Exemple d'une autre route */}
        {/* <Route path="/admin/conversation-super" element={<ChatSuperAdmin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
