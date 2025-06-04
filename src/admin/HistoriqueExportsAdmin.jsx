import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueExportsAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [filtre, setFiltre] = useState({
    type: "",
    format: "",
    dateDebut: "",
    dateFin: ""
  });
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);

  const chargerLogs = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const { type, format, dateDebut, dateFin } = filtre;
      const params = {};
      if (type) params.type = type;
      if (format) params.format = format;
      if (dateDebut) params.dateDebut = dateDebut;
      if (dateFin) params.dateFin = dateFin;

      const res = await axios.get("/api/logs-exports", { params });
      setLogs(res.data);
    } catch (error) {
      console.error("Erreur chargement logs exports :", error);
      setErreur("Erreur lors du chargement des logs d’export.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerLogs();
  }, []);

  const handleChange = (e) => {
    setFiltre({ ...filtre, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🗂️ Historique des Exports Admin</h2>

      {/* Filtres */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <select
          name="type"
          value={filtre.type}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par type d'export"
        >
          <option value="">Tous les types</option>
          <option value="connexion">Connexion</option>
          <option value="carte">Carte</option>
          <option value="transaction">Transaction</option>
        </select>
        <select
          name="format"
          value={filtre.format}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par format d'export"
        >
          <option value="">Tous les formats</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>
        <input
          type="date"
          name="dateDebut"
          value={filtre.dateDebut}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par date de début"
        />
        <input
          type="date"
          name="dateFin"
          value={filtre.dateFin}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par date de fin"
        />
        <button
          onClick={chargerLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-700"
          aria-label="Appliquer les filtres"
          type="button"
        >
          🔍 Appliquer les filtres
        </button>
      </div>

      {/* Affichage des erreurs */}
      {erreur && <div className="text-red-600 mb-2">{erreur}</div>}

      {/* Tableau des logs */}
      <div className="overflow-auto max-h-[70vh] border rounded">
        {loading ? (
          <p className="p-4 text-center">Chargement en cours...</p>
        ) : (
          <table className="min-w-full table-auto text-sm" role="table" aria-label="Tableau historique des exports">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 border">Admin</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Format</th>
                <th className="p-2 border">IP</th>
                <th className="p-2 border">Fichier</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Aucun résultat.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 border">{log.adminId?.nom || "—"}</td>
                    <td className="p-2 border">{log.type}</td>
                    <td className="p-2 border uppercase">{log.format}</td>
                    <td className="p-2 border">{log.ip || "—"}</td>
                    <td className="p-2 border">
                      {log.fichierLien ? (
                        <a
                          href={log.fichierLien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                          aria-label={`Télécharger le fichier ${log.fichierNom || "d'export"}`}
                        >
                          {log.fichierNom || "Télécharger"}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
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

export default HistoriqueExportsAdmin;
