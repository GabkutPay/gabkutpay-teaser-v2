import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ValidationCartesAdmin = () => {
  const [cartes, setCartes] = useState([]);
  const [filtre, setFiltre] = useState("");

  const fetchCartes = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/api/admin/cartes-en-attente", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartes(res.data);
    } catch (err) {
      console.error("Erreur récupération cartes :", err);
    }
  };

  useEffect(() => {
    fetchCartes();
  }, []);

  const validerCarte = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`/api/admin/valider-carte/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Carte validée avec succès !");
      fetchCartes();
    } catch (err) {
      toast.error("Erreur lors de la validation.");
    }
  };

  const cartesFiltrees = cartes.filter(
    (c) =>
      c.nom.toLowerCase().includes(filtre.toLowerCase()) ||
      c.type.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">🛡️ Cartes en attente de validation</h1>

      <input
        type="text"
        placeholder="🔍 Filtrer..."
        className="px-4 py-2 border rounded-xl w-full mb-4"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
      />

      {cartesFiltrees.length === 0 ? (
        <p className="text-center text-gray-500">Aucune carte à valider.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nom</th>
              <th className="p-2">Type</th>
              <th className="p-2">Plafond</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartesFiltrees.map((carte) => (
              <tr key={carte._id} className="border-b">
                <td className="p-2 font-semibold">{carte.nom}</td>
                <td className="p-2">{carte.type}</td>
                <td className="p-2">${carte.plafond}</td>
                <td className="p-2">
                  <button
                    onClick={() => validerCarte(carte._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                  >
                    ✅ Valider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ValidationCartesAdmin;
