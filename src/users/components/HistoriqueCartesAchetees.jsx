// src/users/components/HistoriqueCartesAchetees.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueCartesAchetees = () => {
  const [cartes, setCartes] = useState([]);

  useEffect(() => {
    const fetchCartes = async () => {
      try {
        const res = await axios.get("/api/cartes/historique", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartes(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };

    fetchCartes();
  }, []);

  return (
    <div className="bg-blue-950 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🧾 Vos cartes achetées</h2>
      {cartes.length === 0 ? (
        <p className="text-gray-300">Aucune carte achetée pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {cartes.map((carte, index) => (
            <div key={index} className="bg-white text-blue-900 p-4 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">{carte.nom}</h3>
              <p>💳 Type : {carte.type}</p>
              <p>📈 Plafond : ${carte.plafond.toLocaleString()}</p>
              <p>🕒 Achetée le : {new Date(carte.dateAchat).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoriqueCartesAchetees;
