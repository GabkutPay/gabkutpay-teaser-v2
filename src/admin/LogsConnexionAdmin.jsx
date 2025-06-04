import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsConnexionAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [filtre, setFiltre] = useState({
    email: "",
    role: "",
    status: "",
    dateDebut: "",
    dateFin: "",
  });
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);

  const chargerLogs = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const params = {};
      if (filtre.email) params.email = filtre.email;
      if (filtre.role) params.role = filtre.role;
      if (filtre.status) params.status = filtre.status;
      if (filtre.dateDebut) params.dateDebut = filtre.dateDebut;
      if (filtre.dateFin) params.dateFin = filtre.dateFin;

      const { data } = await axios.get("/api/connexions", { params });
      setLogs(data);
    } catch (error) {
      console.error("Erreur chargement logs :", error);
      setErreur("Erreur lors du chargement des logs.");
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

  const handleFiltrer = () => {
    chargerLogs();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛡️ Connexions Utilisateurs & Admins</h2>

      {/* Zone de filtres */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
          name="role"
          value={filtre.role}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par rôle"
        >
          <option value="">Tous les rôles</option>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
        <select
          name="status"
          value={filtre.status}
          onChange={handleChange}
          className="p-2 border rounded"
          aria-label="Filtrer par statut"
        >
          <option value="">Tous les statuts</option>
          <option value="succès">Succès</option>
          <option value="échec">Échec</option>
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
          onClick={handleFiltrer}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          aria-label="Appliquer les filtres"
          type="button"
        >
          Appliquer les filtres
        </button>
      </div>

      {/* Affichage des erreurs */}
      {erreur && <div className="text-red-600 mb-2">{erreur}</div>}

      {/* Tableau des logs */}
      <div className="overflow-auto max-h-[70vh] border rounded">
        {loading ? (
          <p className="p-4 text-center">Chargement en cours...</p>
        ) : (
          <table className="min-w-full text-sm table-auto" role="table" aria-label="Tableau des logs de connexion">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Rôle</th>
                <th className="p-2 border">IP</th>
                <th className="p-2 border">Appareil</th>
                <th className="p-2 border">Statut</th>
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
                    <td className="p-2 border">{log.email}</td>
                    <td className="p-2 border">{log.role}</td>
                    <td className="p-2 border">{log.ip || "—"}</td>
                    <td className="p-2 border">{log.device || "—"}</td>
                    <td
                      className={`p-2 border font-semibold ${
                        log.status === "succès" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {log.status}
                    </td>
                    <td className="p-2 border">{new Date(log.date).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Boutons d’export (à implémenter) */}
      <div className="mt-4 flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" disabled>
          Exporter PDF
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" disabled>
          Exporter Excel
        </button>
      </div>
    </div>
  );
};

export default LogsConnexionAdmin;
