import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarUtilisateur() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'text-blue-900 font-semibold' : 'text-gray-700';

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 p-6">
      <h2 className="text-xl font-bold mb-8 text-blue-900">👤 Mon espace</h2>
      <nav className="space-y-4">
        <Link to="/dashboard" className={isActive('/dashboard')}>🏠 Tableau de bord</Link>
        <Link to="/envoyer" className={isActive('/envoyer')}>💸 Envoyer</Link>
        <Link to="/recharger" className={isActive('/recharger')}>🔄 Recharger</Link>
        <Link to="/retirer" className={isActive('/retirer')}>💳 Retirer</Link>
        <Link to="/releves" className={isActive('/releves')}>📄 Relevés</Link>
        <Link to="/securite" className={isActive('/securite')}>🛡️ Sécurité</Link>
        <Link to="/reclamation" className={isActive('/reclamation')}>💬 Réclamation</Link>
        <Link to="/parametres" className={isActive('/parametres')}>⚙️ Paramètres</Link>
      </nav>
    </aside>
  );
}
