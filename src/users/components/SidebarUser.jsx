import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarUser = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className="w-64 bg-white shadow-md h-full fixed top-0 left-0 z-30"
      aria-label="Sidebar utilisateur"
    >
      <div className="p-4 text-center border-b">
        <h2 className="text-xl font-bold text-blue-800">Gabkut Pay</h2>
        <p className="text-sm text-gray-500">Tableau de bord utilisateur</p>
      </div>

      <nav>
        <ul className="py-4 text-gray-700 text-sm">
          {/* Dashboard */}
          <li>
            <Link to="/dashboard" className={`block px-4 py-2 rounded hover:bg-gray-100 ${isActive('/dashboard') && 'bg-gray-100 font-semibold'}`}>
              🏠 Tableau de bord
            </Link>
          </li>

          {/* Billets */}
          <li className="mt-4 text-sm font-bold text-gray-600 px-4">✈️ Billets d’avion</li>
          <li>
            <Link to="/billets-avion" className={`block px-4 py-2 rounded hover:bg-blue-100 ${isActive('/billets-avion') && 'bg-blue-100 font-semibold'}`}>
              🎫 Acheter un billet
            </Link>
          </li>
          <li>
            <Link to="/billets-historique" className={`block px-4 py-2 rounded hover:bg-blue-100 ${isActive('/billets-historique') && 'bg-blue-100 font-semibold'}`}>
              📜 Historique billets
            </Link>
          </li>

          {/* Historique */}
          <li className="mt-4 text-sm font-bold text-gray-600 px-4">📂 Historique</li>
          <li>
            <Link to="/dashboard/historique" className="block px-4 py-2 hover:bg-gray-100 rounded">
              💼 Transactions
            </Link>
          </li>
          <li>
            <Link to="/dashboard/historique/recharges-mobile" className="block px-4 py-2 hover:bg-gray-100 rounded">
              📱 Recharges Mobile
            </Link>
          </li>

          {/* Opérations */}
          <li className="mt-4 text-sm font-bold text-gray-600 px-4">⚙️ Opérations</li>
          <li><Link to="/dashboard/envoyer" className="block px-4 py-2 hover:bg-gray-100 rounded">✉️ Envoyer de l’argent</Link></li>
          <li><Link to="/dashboard/retirer" className="block px-4 py-2 hover:bg-gray-100 rounded">💵 Retirer de l’argent</Link></li>
          <li><Link to="/dashboard/recharger" className="block px-4 py-2 hover:bg-gray-100 rounded">➕ Recharger</Link></li>
          <li><Link to="/dashboard/demander" className="block px-4 py-2 hover:bg-gray-100 rounded">📥 Demander des fonds</Link></li>

          {/* Services Internationaux */}
          <li className="mt-4 text-sm font-bold text-gray-600 px-4">🌍 Services Internationaux</li>
          <li>
            <span className="block px-4 py-2 cursor-not-allowed text-gray-400">🔒 Western Union (verrouillé)</span>
          </li>
          <li>
            <span className="block px-4 py-2 cursor-not-allowed text-gray-400">🔒 MoneyGram (verrouillé)</span>
          </li>
          <li>
            <span className="block px-4 py-2 cursor-not-allowed text-gray-400">🔒 RIA (verrouillé)</span>
          </li>

          {/* Assistance */}
          <li className="mt-4 text-sm font-bold text-gray-600 px-4">💬 Assistance</li>
          <li><Link to="/dashboard/suggestions" className="block px-4 py-2 hover:bg-gray-100 rounded">🧠 Suggestions</Link></li>
          <li><Link to="/dashboard/chat" className="block px-4 py-2 hover:bg-gray-100 rounded">💬 Chat avec support</Link></li>
          <li><Link to="/dashboard/cartes-ia" className="block px-4 py-2 hover:bg-blue-900 hover:text-white rounded">💳 Cartes IA Gabkut</Link></li>

          {/* Sécurité */}
          <li className="mt-4 text-sm font-bold text-gray-600 px-4">🔐 Sécurité</li>
          <li><Link to="/dashboard/profil" className="block px-4 py-2 hover:bg-gray-100 rounded">👤 Mon Profil</Link></li>
          <li><Link to="/dashboard/securite" className="block px-4 py-2 hover:bg-gray-100 rounded">🔒 Paramètres de sécurité</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarUser;
