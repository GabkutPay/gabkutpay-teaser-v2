import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUtilisateur from './pages/utilisateur/DashboardUtilisateur';
import Services from './pages/Services';
import Formulaires from './pages/Formulaires';
import Assistance from './pages/Assistance';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/formulaires" element={<Formulaires />} />
        <Route path="/assistance" element={<Assistance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
