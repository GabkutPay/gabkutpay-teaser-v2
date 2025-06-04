import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueCoach = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [filtreNiveau, setFiltreNiveau] = useState("");
  const [filtreType, setFiltreType] = useState("");
  const [filtreDate, setFiltreDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const chargerLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/api/user/coach/historique/${userId}`);
        setLogs(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'historique.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      chargerLogs();
    }
  }, [userId]);

  const logsFiltres = logs.filter((log) => {
    const niveauMatch = filtreNiveau ? log.niveau === filtreNiveau : true;
    const typeMatch = filtreType ? log.type === filtreType : true;
    const dateMatch = filtreDate
      ? new Date(log.dateParticipation).toISOString().slice(0, 10) === filtreDate
      : true;
    return niveauMatch && typeMatch && dateMatch;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-10" role="region" aria-live="polite">
      <h2 className="text-xl font-bold text-blue-800 mb-4">📚 Historique Coach IA</h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={filtreNiveau}
          onChange={(e) => setFiltreNiveau(e.target.value)}
          className="border px-2 py-1 rounded"
          aria-label="Filtrer par niveau"
        >
          <option value="">Niveau</option>
          <option value="débutant">Débutant</option>
          <option value="intermédiaire">Intermédiaire</option>
          <option value="avancé">Avancé</option>
        </select>
        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          className="border px-2 py-1 rounded"
          aria-label="Filtrer par type"
        >
          <option value="">Type</option>
          <option value="quiz">Quiz</option>
          <option value="lecon">Leçon</option>
        </select>
        <input
          type="date"
          value={filtreDate}
          onChange={(e) => setFiltreDate(e.target.value)}
          className="border px-2 py-1 rounded"
          aria-label="Filtrer par date"
        />
      </div>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : logsFiltres.length === 0 ? (
        <p>Aucun résultat trouvé.</p>
      ) : (
        <table className="w-full text-sm border-collapse border border-gray-300" role="table" aria-label="Tableau historique du coach IA">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border border-gray-300">Question</th>
              <th className="p-2 border border-gray-300">Réponse</th>
              <th className="p-2 border border-gray-300">Statut</th>
              <th className="p-2 border border-gray-300">Score</th>
              <th className="p-2 border border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltres.map((log, i) => (
              <tr key={log._id || i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 border border-gray-300">{log.question}</td>
                <td className="p-2 border border-gray-300">{log.reponseDonnee}</td>
                <td className="p-2 border border-gray-300">
                  {log.estCorrect ? (
                    <span className="text-green-600 font-bold" aria-label="Correct">✅ Correct</span>
                  ) : (
                    <span className="text-red-600 font-bold" aria-label="Incorrect">❌ Faux</span>
                  )}
                </td>
                <td className="p-2 border border-gray-300">{log.scoreObtenu}</td>
                <td className="p-2 border border-gray-300">{new Date(log.dateParticipation).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueCoach;
