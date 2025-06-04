import React, { useEffect, useState } from "react";
import axios from "axios";

const AlertesIA = () => {
  const [alertes, setAlertes] = useState([]);
  const [texteFiltre, setTexteFiltre] = useState("");
  const [niveauFiltre, setNiveauFiltre] = useState("toutes");

  const fetchAlertes = async () => {
    try {
      const res = await axios.get("/api/ia/alertes");
      setAlertes(res.data);
    } catch (err) {
      console.error("Erreur chargement alertes :", err);
    }
  };

  const marquerCommeTraitee = async (id) => {
    try {
      await axios.put(`/api/ia/alertes/${id}/traiter`);
      fetchAlertes();
    } catch (err) {
      console.error("Erreur mise à jour alerte :", err);
    }
  };

  const exporterPDF = () => {
    window.open("/api/ia/alertes/export/pdf", "_blank");
  };

  const exporterExcel = () => {
    window.open("/api/ia/alertes/export/excel", "_blank");
  };

  useEffect(() => {
    fetchAlertes();
    const interval = setInterval(fetchAlertes, 5000); // ⏱️ Temps réel
    return () => clearInterval(interval); // 🧹 Nettoyage
  }, []);

  const alertesFiltrees = alertes.filter((a) => {
    const correspondTexte =
      `${a.utilisateur?.nom || ""} ${a.type} ${a.message}`
        .toLowerCase()
        .includes(texteFiltre.toLowerCase());
    const correspondNiveau =
      niveauFiltre === "toutes" || a.niveau === niveauFiltre;
    return correspondTexte && correspondNiveau;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🧠 Alertes IA détectées</h2>
        <div className="flex gap-2">
          <button
            onClick={exporterPDF}
            className="bg-red-600 text-white px-3 py-1 rounded-xl hover:bg-red-700"
          >
            📄 Export PDF
          </button>
          <button
            onClick={exporterExcel}
            className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700"
          >
            📊 Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Rechercher par utilisateur, type, message"
          value={texteFiltre}
          onChange={(e) => setTexteFiltre(e.target.value)}
          className="w-full p-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />

        <select
          className="border px-3 py-2 rounded-xl"
          value={niveauFiltre}
          onChange={(e) => setNiveauFiltre(e.target.value)}
        >
          <option value="toutes">Tous les niveaux</option>
          <option value="faible">Faible</option>
          <option value="moyen">Moyen</option>
          <option value="élevé">Élevé</option>
          <option value="critique">Critique</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Niveau</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {alertesFiltrees.map((a) => (
              <tr key={a._id} className="hover:bg-gray-100">
                <td className="p-2 border">{a.type}</td>
                <td className="p-2 border">{a.message}</td>
                <td className="p-2 border">{a.niveau}</td>
                <td className="p-2 border">{a.statut}</td>
                <td className="p-2 border">
                  {new Date(a.date).toLocaleString()}
                </td>
                <td className="p-2 border text-center">
                  {a.statut === "non traité" && (
                    <button
                      onClick={() => marquerCommeTraitee(a._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700"
                    >
                      ✅ Traité
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {alertesFiltrees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Aucune alerte trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertesIA;
