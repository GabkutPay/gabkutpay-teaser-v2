import React, { useEffect, useState } from "react";
import axios from "axios";

const PageProAdmin = () => {
  const [comptes, setComptes] = useState([]);
  const [filtreType, setFiltreType] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charge les comptes
  const chargerComptes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/admin/pro/liste");
      setComptes(res.data);
    } catch (err) {
      console.error("Erreur chargement comptes :", err);
      setError("Erreur lors du chargement des comptes professionnels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerComptes();
  }, []);

  // Fonction pour changer le statut d'un compte
  const changerStatut = async (id, nouveauStatut) => {
    if (!window.confirm(`Confirmer le passage en statut : ${nouveauStatut} ?`)) return;

    try {
      await axios.put(`/api/admin/pro/statut/${id}`, { nouveauStatut });
      // Recharge les comptes après mise à jour
      await chargerComptes();
    } catch (err) {
      alert("❌ Erreur lors de la mise à jour.");
    }
  };

  const comptesFiltres = comptes.filter(c =>
    (filtreType ? c.typeEtablissement === filtreType : true) &&
    (filtreStatut ? c.statut === filtreStatut : true)
  );

  return (
    <div className="p-6" role="main" aria-label="Gestion des comptes professionnels">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">🏢 Comptes Professionnels</h2>

      <div className="flex gap-4 mb-4 flex-wrap" role="region" aria-label="Filtres des comptes professionnels">
        <select
          className="border rounded px-2 py-1"
          value={filtreType}
          onChange={e => setFiltreType(e.target.value)}
          aria-label="Filtrer par type d'établissement"
        >
          <option value="">🔍 Filtrer par type</option>
          <option value="école">École</option>
          <option value="commerçant">Commerçant</option>
          <option value="institution">Institution</option>
          <option value="ONG">ONG</option>
          <option value="autre">Autre</option>
        </select>
        <select
          className="border rounded px-2 py-1"
          value={filtreStatut}
          onChange={e => setFiltreStatut(e.target.value)}
          aria-label="Filtrer par statut"
        >
          <option value="">🔍 Filtrer par statut</option>
          <option value="actif">Actif</option>
          <option value="suspendu">Suspendu</option>
          <option value="en_attente">En attente</option>
          <option value="rejeté">Rejeté</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement des comptes professionnels...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : comptesFiltres.length === 0 ? (
        <p>Aucun compte professionnel ne correspond aux filtres sélectionnés.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border bg-white" role="table" aria-label="Liste des comptes professionnels">
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left border border-gray-300">Nom</th>
                <th className="p-3 text-left border border-gray-300">Type</th>
                <th className="p-3 text-left border border-gray-300">Pays</th>
                <th className="p-3 text-left border border-gray-300">Contact</th>
                <th className="p-3 text-left border border-gray-300">Statut</th>
                <th className="p-3 text-left border border-gray-300">Actions</th>
                <th className="p-3 text-left border border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {comptesFiltres.map((compte, index) => (
                <tr key={compte._id || index} className="even:bg-gray-50 odd:bg-white">
                  <td className="p-3 font-semibold border border-gray-300">{compte.nomEtablissement}</td>
                  <td className="p-3 capitalize border border-gray-300">{compte.typeEtablissement}</td>
                  <td className="p-3 border border-gray-300">{compte.pays || "-"}</td>
                  <td className="p-3 border border-gray-300">{compte.telephone || compte.emailPro || "-"}</td>
                  <td className="p-3 border border-gray-300">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        compte.statut === "actif"
                          ? "bg-green-100 text-green-800"
                          : compte.statut === "suspendu"
                          ? "bg-yellow-100 text-yellow-800"
                          : compte.statut === "rejeté"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      aria-label={`Statut : ${compte.statut}`}
                    >
                      {compte.statut}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300">
                    <div className="flex gap-1 flex-wrap">
                      {["actif", "suspendu", "rejeté"].map((statutBtn) => (
                        <button
                          key={statutBtn}
                          onClick={() => changerStatut(compte._id, statutBtn)}
                          className="bg-white text-blue-900 text-xs px-2 py-1 rounded shadow border hover:bg-blue-100 transition"
                          disabled={statutBtn === compte.statut}
                          aria-pressed={statutBtn === compte.statut}
                          aria-label={`Passer au statut ${statutBtn}`}
                        >
                          {statutBtn.charAt(0).toUpperCase() + statutBtn.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300">{new Date(compte.dateInscription).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PageProAdmin;
