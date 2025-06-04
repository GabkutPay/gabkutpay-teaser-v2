import React from "react";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  const navLinkClasses = ({ isActive }) =>
    `block py-2 px-4 rounded-md hover:bg-gray-800 ${
      isActive ? "bg-gray-700 font-semibold" : "text-gray-300"
    }`;

  return (
    <aside
      className="w-64 min-h-screen bg-gray-900 text-white p-6 space-y-4"
      aria-label="Navigation Admin"
    >
      <h1 className="text-2xl font-bold mb-8">🛡️ Admin Gabkut</h1>

      <nav className="flex flex-col space-y-2" aria-label="Menu principal">
        <NavLink to="/admin/logs-connexions" className={navLinkClasses}>
          🔐 Logs Connexions
        </NavLink>
        <NavLink to="/admin/utilisateurs-bloques" className={navLinkClasses}>
          🚫 Utilisateurs bloqués
        </NavLink>
        <NavLink to="/admin/utilisateurs-a-surveiller" className={navLinkClasses}>
          🕵🏽‍♂️ Utilisateurs à surveiller
        </NavLink>
        <NavLink to="/admin/exportations" className={navLinkClasses}>
          📦 Exportations
        </NavLink>
        <NavLink to="/admin/comptes" className={navLinkClasses}>
          🏦 Types de Comptes
        </NavLink>
        <NavLink to="/admin/valider-cartes" className={navLinkClasses}>
          ✅ Valider Cartes IA
        </NavLink>
        <NavLink to="/admin/settings" className={navLinkClasses}>
          ⚙️ Paramètres admin
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
