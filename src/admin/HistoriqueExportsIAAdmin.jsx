import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueExportsIAAdmin = () => {
  const [exports, setExports] = useState([]);
  const [filtre, setFiltre] = useState({
    type: "",
    format: "",
    dateDebut: "",
    dateFin: "",
  });
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  const chargerExports = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const { data } = await axios.get("/api/admin/exports-ia-logs", {
        params: filtre,
      });
      setExports(data);
    } catch (err) {
      setErreur("Erreur lors du chargement de l'historique des exports IA.");
      setExports([]);
      console.error("Erreur chargement historique exports IA :", err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    chargerExports();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setFiltre({ ...filtre, [e.target.name]: e.target.value });
  };

  const appliquerFiltre = (e) => {
    e.preventDefault();
    chargerExports();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧾 Historique des exports IA (admin)</h2>

      {/* Filtres */}
      <form onSubmit={appliquerFiltre} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select name="type" value={filtre.type} onChange={handleChange} className="p-2 border rounded">
          <option value="">Tous les types</option>
          <option value="logs-ia">Logs IA</option>
          <option value="resume-ia">Résumé IA</option>
          <option value="alertes">Alertes</option>
          <option value="stats">Statistiques</option>
        </select>
        <select name="format" value={filtre.format} onChange={handleChange} className="p-2 border rounded">
          <option value="">Tous les formats</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
        <input type="date" name="dateDebut" value={filtre.dateDebut} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="dateFin" value={filtre.dateFin} onChange={handleChange} className="p-2 border rounded" />
        <button
          type="submit"
          className="md:col-span-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={chargement}
        >
          {chargement ? "Chargement..." : "🔍 Appliquer les filtres"}
        </button>
      </form>

      {/* Message d’erreur */}
      {erreur && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{erreur}</div>
      )}

      {/* Tableau */}
      <div className="overflow-auto max-h-[70vh] border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Format</th>
              <th className="p-2 border">IP</th>
              <th className="p-2 border">User-Agent</th>
              <th className="p-2 border">Admin ID</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {exports.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  {chargement ? "Chargement..." : "Aucun export trouvé."}
                </td>
              </tr>
            ) : (
              exports.map((exp, i) => (
                <tr key={exp._id || i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border">{exp.type}</td>
                  <td className="p-2 border">{exp.format}</td>
                  <td className="p-2 border">{exp.ip || "—"}</td>
                  <td className="p-2 border">{exp.userAgent?.slice(0, 25) || "—"}…</td>
                  <td className="p-2 border">{exp.adminId || "—"}</td>
                  <td className="p-2 border">{new Date(exp.date).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoriqueExportsIAAdmin;
