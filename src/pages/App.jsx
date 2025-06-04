import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import ConnexionPage from './pages/ConnexionPage';
import CreerCompte from './pages/CreerCompte';
import TypeComptePage from './pages/TypeComptePage';
import AppPublicRoutes from './routes/AppPublicRoutes';
import AppUserRoutes from './routes/AppUserRoutes'; // 📌 Ajouté
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* 🔓 Routes publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/creer-compte" element={<CreerCompte />} />
        <Route path="/type-compte" element={<TypeComptePage />} />
        <Route path="/public/*" element={<AppPublicRoutes />} />

        {/* 🔐 Routes utilisateur selon typeCompte */}
        {user && (
          <Route path="/dashboard/*" element={<AppUserRoutes />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
