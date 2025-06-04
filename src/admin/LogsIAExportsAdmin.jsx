import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsIAExportsAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [filtre, setFiltre] = useState({ email: "", langue: "", origine: "" });
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  // Charger les logs avec les filtres actuels
  const chargerLogs = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const { data } = await axios.get("/api/admin/logs-exports-ia", {
        params: filtre,
      });
      setLogs(data);
    } catch (err) {
      console.error("Erreur chargement logs exports IA :", err);
      setErreur("Erreur lors du chargement des logs.");
    } finally {
      setChargement(false);
    }
  };

  // Charger les logs au montage et à chaque changement de filtre
  useEffect(() => {
    chargerLogs();
  }, []);

  const handleChange = (e) => {
    setFiltre({ ...filtre, [e.target.name]: e.target.value });
  };

  const appliquerFiltre = () => {
    chargerLogs();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🗂️ Historique exports IA (Résumé d’inscription)</h2>

      {/* 🔍 Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          name="email"
          placeholder="Filtrer par email"
          value={filtre.email}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par email"
        />
        <select
          name="langue"
          value={filtre.langue}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par langue"
        >
          <option value="">Toutes les langues</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 Anglais</option>
          <option value="ar">🇸🇦 Arabe</option>
        </select>
        <select
          name="origine"
          value={filtre.origine}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par origine"
        >
          <option value="">Tous les rôles</option>
          <option value="utilisateur">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={appliquerFiltre}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          aria-label="Appliquer les filtres"
          disabled={chargement}
        >
          {chargement ? "Chargement..." : "Appliquer les filtres"}
        </button>
      </div>

      {/* 📄 Tableau */}
      <div className="overflow-auto max-h-[70vh] border rounded" role="region" aria-live="polite">
        {erreur ? (
          <div className="p-4 text-center text-red-600">{erreur}</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Langue</th>
                <th className="p-2 border">IP</th>
                <th className="p-2 border">Origine</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Aucun export trouvé.
                  </td>
                </tr>
              ) : (
                logs.map((log, i) => (
                  <tr key={log._id || i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 border">{log.email}</td>
                    <td className="p-2 border">{log.langue}</td>
                    <td className="p-2 border">{log.ip || "—"}</td>
                    <td className="p-2 border">{log.origine}</td>
                    <td className="p-2 border">{new Date(log.date).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LogsIAExportsAdmin;
