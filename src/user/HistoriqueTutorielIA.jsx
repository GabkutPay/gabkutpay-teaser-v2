import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueTutorielIA = ({ userId }) => {
  const [historique, setHistorique] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const fetchHistorique = async () => {
      setChargement(true);
      setErreur(null);
      try {
        const res = await axios.get(`/api/user/ia/tutoriel/historique/${userId}`);
        setHistorique(res.data);
      } catch (err) {
        console.error("Erreur chargement historique tutoriels IA :", err);
        setErreur("Impossible de charger l'historique des tutoriels.");
      } finally {
        setChargement(false);
      }
    };

    if (userId) {
      fetchHistorique();
    }
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-bold text-blue-700 mb-3">🧾 Historique des tutoriels suivis</h2>

      {chargement ? (
        <p className="text-gray-500">Chargement en cours...</p>
      ) : erreur ? (
        <p className="text-red-600">{erreur}</p>
      ) : historique.length === 0 ? (
        <p className="text-gray-500">Aucun tutoriel suivi pour le moment.</p>
      ) : (
        <table className="w-full text-sm border-collapse border border-gray-300" role="table" aria-label="Historique des tutoriels IA">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-2 py-1 border border-gray-300">Langue</th>
              <th className="px-2 py-1 border border-gray-300">Étapes</th>
              <th className="px-2 py-1 border border-gray-300">Début</th>
              <th className="px-2 py-1 border border-gray-300">Fin</th>
              <th className="px-2 py-1 border border-gray-300">Statut</th>
              <th className="px-2 py-1 border border-gray-300">Badge</th>
            </tr>
          </thead>
          <tbody>
            {historique.map((tuto, idx) => (
              <tr key={tuto._id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-2 py-1 border border-gray-300">{tuto.langue}</td>
                <td className="px-2 py-1 border border-gray-300">{tuto.etapesEffectuees}</td>
                <td className="px-2 py-1 border border-gray-300">{new Date(tuto.dateDebut).toLocaleString()}</td>
                <td className="px-2 py-1 border border-gray-300">{tuto.dateFin ? new Date(tuto.dateFin).toLocaleString() : "—"}</td>
                <td className="px-2 py-1 border border-gray-300 capitalize">{tuto.status.replace('_', ' ')}</td>
                <td className="px-2 py-1 border border-gray-300 text-center">
                  {tuto.premium ? (
                    <span className="text-green-600 font-semibold" title="Tutoriel IA Premium">🎖 IA Premium</span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueTutorielIA;
