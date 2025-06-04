import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsConnexions = () => {
  const [logs, setLogs] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/admin/logs-connexions");
        setLogs(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Filtrage case-insensitive sur l'email
  const logsFiltres = logs.filter((log) =>
    log.email?.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🧾 Connexions Sécurisées
      </h2>

      <div className="flex gap-4 mb-4">
        <a
          href="/api/admin/export-connexions/excel"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          📥 Export Excel
        </a>
        <a
          href="/api/admin/export-connexions/pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          📄 Export PDF
        </a>
      </div>

      <input
        type="text"
        placeholder="Rechercher par e-mail"
        className="border p-2 rounded mb-6 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        aria-label="Filtrer les logs par email"
      />

      {loading ? (
        <p className="text-center text-gray-600">Chargement des logs...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : logsFiltres.length === 0 ? (
        <p className="text-center text-gray-600">Aucun log trouvé.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">IP</th>
                <th className="p-3 text-left">Empreinte</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {logsFiltres.map((log, index) => (
                <tr
                  key={log._id || index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 break-words max-w-xs">{log.email}</td>
                  <td className="p-3">{log.ip}</td>
                  <td className="p-3 break-words max-w-xs">{log.fingerprint}</td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(log.timestamp || log.date).toLocaleString()}
                  </td>
                  <td className="p-3">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogsConnexions;
