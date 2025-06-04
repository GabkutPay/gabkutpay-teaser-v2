import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarUser = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Mon Espace</h2>
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className={`p-2 rounded hover:bg-gray-700 ${
            isActive('/') ? 'bg-gray-700 font-semibold' : ''
          }`}
        >
          Tableau de bord
        </Link>

        <Link
          to="/billets-avion"
          className={`p-2 rounded hover:bg-blue-700 ${
            isActive('/billets-avion') ? 'bg-blue-700 font-semibold' : ''
          }`}
        >
          🎫 Billets d’avion
        </Link>

        <Link
          to="/historique-billets-avion"
          className={`p-2 rounded hover:bg-blue-700 ${
            isActive('/historique-billets-avion') ? 'bg-blue-700 font-semibold' : ''
          }`}
        >
          📜 Historique des billets
        </Link>
      </nav>
    </div>
  );
};

export default SidebarUser;
