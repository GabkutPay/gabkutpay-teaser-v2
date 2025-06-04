import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueVerificationsDocuments = () => {
  const [logs, setLogs] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/admin/verifications-documents");
        setLogs(res.data);
      } catch (err) {
        console.error("Erreur récupération logs :", err);
      }
    };
    fetchLogs();
  }, []);

  const logsFiltres = logs.filter((log) => {
    const date = new Date(log.date);
    const correspondMois = !mois || date.getMonth() + 1 === parseInt(mois);
    const correspondAnnee = !annee || date.getFullYear() === parseInt(annee);
    const correspondFiltre =
      log.documentId.toLowerCase().includes(filtre.toLowerCase()) ||
      log.ip.includes(filtre);

    return correspondMois && correspondAnnee && correspondFiltre;
  });

  const exporterExcel = () => {
    window.open("/api/admin/export-verifications-documents/excel", "_blank");
  };

  const exporterPDF = () => {
    window.open("/api/admin/export-verifications-documents/pdf", "_blank");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-800 mb-4">
        📑 Historique des vérifications de documents
      </h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Rechercher par ID document ou IP"
          className="border px-2 py-1 rounded w-full sm:w-64"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
        <select
          value={mois}
          onChange={(e) => setMois(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tous les mois</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Mois {i + 1}
            </option>
          ))}
        </select>
        <select
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Toutes les années</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <button
          onClick={exporterExcel}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Export Excel
        </button>
        <button
          onClick={exporterPDF}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-2 py-1">Document ID</th>
              <th className="border px-2 py-1">Adresse IP</th>
              <th className="border px-2 py-1">User-Agent</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltres.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{log.documentId}</td>
                <td className="border px-2 py-1">{log.ip}</td>
                <td className="border px-2 py-1 truncate">{log.userAgent}</td>
                <td className="border px-2 py-1">
                  {new Date(log.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logsFiltres.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Aucun log trouvé pour les filtres actuels.
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoriqueVerificationsDocuments;
