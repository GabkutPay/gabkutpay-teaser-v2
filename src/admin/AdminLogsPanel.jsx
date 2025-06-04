// src/admin/AdminLogsPanel.jsx
import React, { useEffect, useState } from "react";

const AdminLogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch("/api/logs/admin") // 🔐 Cette route doit exister dans le backend
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(() => setErreur("❌ Erreur de chargement des logs"));
  }, []);

  const logsFiltres = logs.filter(log =>
    log.action.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🧾 Journaux Administratifs</h2>

      <input
        type="text"
        placeholder="🔍 Filtrer par action..."
        value={filtre}
        onChange={e => setFiltre(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {erreur && <div className="text-red-600">{erreur}</div>}

      <div className="overflow-auto max-h-[600px]">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Admin</th>
              <th className="px-3 py-2 border">Action</th>
              <th className="px-3 py-2 border">Résultat</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltres.map((log, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-3 py-2 border">{new Date(log.date).toLocaleString()}</td>
                <td className="px-3 py-2 border">{log.admin}</td>
                <td className="px-3 py-2 border">{log.action}</td>
                <td className="px-3 py-2 border">{log.resultat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLogsPanel;
