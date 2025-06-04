import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldAlert,
  Users,
  FileText,
  FileSearch,
  BarChart4,
  MailWarning,
  CreditCard,
  LogOut,
  MessageCircle,
  UserCog,
} from "lucide-react";

const SidebarAdmin = () => {
  const location = useLocation();

  const lienActif = (path) =>
    location.pathname === path
      ? "bg-blue-800 text-white"
      : "text-gray-300 hover:bg-blue-700 hover:text-white";

  return (
    <aside className="h-screen w-64 bg-blue-900 text-white shadow-xl flex flex-col">
      <div className="p-6 text-center text-xl font-bold border-b border-blue-700">
        🛡️ Admin Gabkut Pay
      </div>

      <nav className="flex-1 p-4 overflow-y-auto space-y-2">
        <Link to="/admin/dashboard" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/dashboard")}`}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/admin/stats" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/stats")}`}>
          <BarChart4 size={20} />
          Statistiques
        </Link>

        <Link to="/admin/valider-cartes" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/valider-cartes")}`}>
          <CreditCard size={20} />
          Valider Cartes
        </Link>

        <Link to="/admin/alertes-ia" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/alertes-ia")}`}>
          <ShieldAlert size={20} />
          Alertes IA
        </Link>
         <Link to="/admin/validation-faciale" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/validation-faciale")}`}>
         <ShieldAlert size={20} />
          Validation Faciale
          </Link>

        <Link to="/admin/logs" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/logs")}`}>
          <FileSearch size={20} />
          Logs Admin
        </Link>

        <Link to="/admin/reclamations" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/reclamations")}`}>
          <MailWarning size={20} />
          Réclamations
        </Link>

        <Link to="/admin/messagerie" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/messagerie")}`}>
          <MessageCircle size={20} />
          Messagerie
        </Link>

        <Link to="/admin/superadmin" className={`flex items-center gap-3 p-3 rounded-xl ${lienActif("/admin/superadmin")}`}>
          <UserCog size={20} />
          SuperAdmin
        </Link>
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button className="flex items-center gap-2 w-full p-2 rounded-xl hover:bg-red-600 transition">
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
