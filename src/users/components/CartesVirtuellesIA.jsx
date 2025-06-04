import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const cartesDisponibles = [
  {
    nom: "Gabkut Classic",
    prix: 5,
    plafond: 5000,
    fraisMensuel: 2,
    fraisOperation: 2,
  },
  {
    nom: "Gabkut Gold",
    prix: 9.99,
    plafond: 15000,
    fraisMensuel: 3.5,
    fraisOperation: 1.75,
  },
  {
    nom: "Gabkut Infinite",
    prix: 20,
    plafond: 27000,
    fraisMensuel: 4,
    fraisOperation: 1.5,
  },
  {
    nom: "Gabkut Infinite Prime",
    prix: 35,
    plafond: 49000,
    fraisMensuel: 5,
    fraisOperation: 1.4,
  },
  {
    nom: "Gabkut Ultra",
    prix: 99.99,
    plafond: Infinity,
    fraisMensuel: 7,
    fraisOperation: 1.2,
  },
];

const CartesVirtuellesIA = () => {
  const [chargement, setChargement] = useState(false);

  const acheterCarte = async (carte) => {
    try {
      setChargement(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/api/cartes-proxy/acheter",
        {
          typeCarte: carte.nom,
          prix: carte.prix,
          plafond: carte.plafond,
          fraisMensuel: carte.fraisMensuel,
          fraisOperation: carte.fraisOperation,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🎉 Carte achetée avec succès !");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de l'achat.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">💳 Acheter une Carte Virtuelle IA</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cartesDisponibles.map((carte, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-black">
            <h3 className="text-xl font-bold mb-2">{carte.nom}</h3>
            <ul className="mb-4 text-sm">
              <li>💰 Prix : ${carte.prix}</li>
              <li>📈 Plafond : {carte.plafond === Infinity ? "Illimité" : `$${carte.plafond}`}</li>
              <li>📆 Frais mensuel : ${carte.fraisMensuel}</li>
              <li>📎 Frais par opération : {carte.fraisOperation}%</li>
            </ul>
            <button
              onClick={() => acheterCarte(carte)}
              className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-xl w-full"
              disabled={chargement}
            >
              {chargement ? "Traitement..." : "Acheter cette carte"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartesVirtuellesIA;
