import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardUtilisateur from './pages/utilisateur/DashboardUtilisateur';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Bienvenue sur Gabkut Pay 👑</h1>
              <p className="text-gray-700 mt-2">Frontend prêt. Intégration du dashboard en cours…</p>
            </div>
          </div>
        } />
        <Route path="/dashboard" element={<DashboardUtilisateur />} />
      </Routes>
    </Router>
  );
}

export default App;
