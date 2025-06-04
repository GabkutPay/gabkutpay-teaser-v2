// src/admin/DashboardAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  FileBarChart2,
  Users,
  Cog,
  PanelRightOpen,
  UserCog,
} from "lucide-react";

import BarreRechercheAdmin from "@/admin/components/BarreRechercheAdmin";
import ExporterRecusAdmin from "@/admin/ExporterRecusAdmin";
import SuperAdminGabkutPanel from "@/admin/SuperAdminGabkutPanel";
import AdminLogsPanel from "@/admin/AdminLogsPanel";
import AdminStatsPage from "@/admin/AdminStatsPage";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({});
  const [resume, setResume] = useState({});
  const [erreur, setErreur] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const chargerStats = async () => {
      try {
        const res = await axios.get("/api/admin/stats-dashboard");
        setStats(res.data.stats || {});
        setResume(res.data.resume || {});
      } catch (err) {
        console.error("Erreur chargement dashboard :", err);
        setErreur("Impossible de charger les statistiques.");
      }
    };

    const utilisateur = JSON.parse(localStorage.getItem("userInfo"));
    setAdminInfo(utilisateur || null);

    chargerStats();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
        <PanelRightOpen /> Panneau de Contrôle Administrateur
      </h1>

      <BarreRechercheAdmin />

      {erreur && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{erreur}</div>
      )}

      {/* Statistiques générales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard titre="👥 Utilisateurs actifs" valeur={stats.utilisateurs || 0} />
        <StatCard titre="💸 Transactions du jour" valeur={stats.transactions || 0} />
        <StatCard titre="💳 Cartes en attente" valeur={stats.cartes || 0} />
        <StatCard titre="🚨 Alertes actives" valeur={stats.alertes || 0} />
      </div>

      {/* Résumé IA */}
      <div className="bg-gray-100 rounded p-4 space-y-2">
        <h3 className="font-semibold mb-2 text-lg">🧠 Résumé intelligent</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>
            Dernier export : <strong>{resume.dernierExport || "—"}</strong>
          </li>
          <li>
            Dernière alerte IA : <strong>{resume.derniereAlerte || "—"}</strong>
          </li>
          <li>
            Connexion suspecte détectée :{" "}
            <strong>{resume.connexionSuspecte || "Aucune"}</strong>
          </li>
          <li>
            Activité la plus récente :{" "}
            <strong>{resume.activiteRecente || "—"}</strong>
          </li>
        </ul>
      </div>

      {/* Exports reçus */}
      <div className="bg-gray-100 rounded p-4">
        <ExporterRecusAdmin />
      </div>

      {/* Panneau SuperAdmin + Journal des logs */}
      {adminInfo?.role === "adminPrincipal" || adminInfo?.role === "superadmin" ? (
        <>
          <div className="bg-yellow-50 border border-yellow-300 rounded p-4">
            <SuperAdminGabkutPanel />
          </div>
          <div className="mt-8">
            <AdminLogsPanel />
          </div>
        </>
      ) : null}

      {/* Statistiques complètes */}
      <div className="bg-white mt-8 p-4 rounded shadow">
        <AdminStatsPage />
      </div>

      {/* Accès rapide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        <CarteLien
          icone={<FileBarChart2 className="text-indigo-600" />}
          titre="Statistiques"
          description="Suivre les revenus, retraits, pics d’activité"
          lien="/admin/stats"
        />
        <CarteLien
          icone={<ShieldAlert className="text-red-600" />}
          titre="Logs & Journal"
          description="Exporter les journaux critiques"
          lien="/admin/logs"
        />
        <CarteLien
          icone={<UserCog className="text-green-700" />}
          titre="SuperAdmin"
          description="Modifier les paramètres globaux"
          lien="/admin/superadmin"
        />
        <CarteLien
          icone={<Users className="text-yellow-700" />}
          titre="Utilisateurs"
          description="Gérer les comptes, KYC"
          lien="/admin/utilisateurs"
        />
        <CarteLien
          icone={<Cog className="text-gray-600" />}
          titre="Paramètres"
          description="Réglages système avancés"
          lien="/admin/parametres"
        />
      </div>
    </div>
  );
};

const StatCard = ({ titre, valeur }) => (
  <div className="bg-white shadow rounded p-4 text-center">
    <h4 className="text-gray-600 text-sm">{titre}</h4>
    <p className="text-xl font-bold">{valeur}</p>
  </div>
);

const CarteLien = ({ icone, titre, description, lien }) => (
  <Link
    to={lien}
    className="p-4 bg-white shadow hover:shadow-lg rounded-xl transition space-y-2"
  >
    <div className="text-3xl">{icone}</div>
    <h2 className="font-semibold text-lg text-gray-800">{titre}</h2>
    <p className="text-sm text-gray-500">{description}</p>
  </Link>
);

export default DashboardAdmin;
