import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsExportAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [filtreAdmin, setFiltreAdmin] = useState("");
  const [filtreType, setFiltreType] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filtreAdmin) params.admin = filtreAdmin;
      if (filtreType) params.type = filtreType;
      if (debut && fin) {
        params.debut = debut;
        params.fin = fin;
      }

      const res = await axios.get("/api/admin/exports", { params });
      setLogs(res.data);
    } catch (err) {
      console.error("Erreur chargement des logs :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📋 Historique des exports administratifs</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Nom admin"
          className="border p-2 rounded"
          value={filtreAdmin}
          onChange={(e) => setFiltreAdmin(e.target.value)}
        />
        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Type d'export</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
          <option value="pdf">PDF</option>
          <option value="zip">ZIP</option>
        </select>
        <input
          type="date"
          value={debut}
          onChange={(e) => setDebut(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Rechercher
        </button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">Aucun export trouvé.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">🧑‍💼 Admin</th>
              <th className="p-2">📤 Type</th>
              <th className="p-2">📅 Début</th>
              <th className="p-2">📅 Fin</th>
              <th className="p-2">🕒 Date export</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{log.adminNom}</td>
                <td className="p-2 capitalize">{log.typeExport}</td>
                <td className="p-2">
                  {new Date(log.dateDebut).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(log.dateFin).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(log.dateExport).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsExportAdmin;
