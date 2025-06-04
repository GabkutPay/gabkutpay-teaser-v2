import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, Send, Download, FileText, CreditCard, Settings, Home } from 'lucide-react';

const SidebarMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="flex flex-col h-full">
      {/* En-tête */}
      <div className="p-6 border-b text-center">
        <h1 className="text-xl font-bold text-blue-700">Gabkut Pay</h1>
        <p className="text-xs text-gray-500">Tableau de bord</p>
      </div>

      {/* Liens */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <Home size={18} /> Accueil
        </NavLink>

        <NavLink to="/envoyer" className={linkClass}>
          <Send size={18} /> Envoyer
        </NavLink>

        <NavLink to="/demander" className={linkClass}>
          <Download size={18} /> Demander fonds
        </NavLink>

        <NavLink to="/retirer" className={linkClass}>
          <FileText size={18} /> Retirer
        </NavLink>

        <NavLink to="/acheter-carte" className={linkClass}>
          <CreditCard size={18} /> Acheter carte
        </NavLink>

        <NavLink to="/releve-pdf" className={linkClass}>
          <FileText size={18} /> Relevé PDF
        </NavLink>

        <NavLink to="/modifier-profil" className={linkClass}>
          <Settings size={18} /> Profil & Sécurité
        </NavLink>
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t">
        <NavLink to="/logout" className={linkClass}>
          <LogOut size={18} /> Déconnexion
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarMenu;
