import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TypeComptePage = () => {
  const [typeCompte, setTypeCompte] = useState("");
  const navigate = useNavigate();

  const handleChoix = () => {
    if (!typeCompte) return;

    // Redirection vers la bonne page selon le type
    navigate(`/inscription/${typeCompte.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Quel type de compte voulez-vous créer ?</h1>

        <select
          value={typeCompte}
          onChange={(e) => setTypeCompte(e.target.value)}
          className="w-full p-3 rounded-lg border border-blue-500 text-gray-900 mb-6"
        >
          <option value="">-- Choisir un type de compte --</option>
          <option value="standard">Standard / Individuel</option>
          <option value="professionnel">Professionnel</option>
          <option value="institutionnel">Institutionnel</option>
          <option value="vip">VIP</option>
          <option value="diaspora">Diaspora</option>
          <option value="etudiant">Étudiant</option>
          <option value="eleve">Élève</option>
          <option value="avenir">Compte Avenir (enfant)</option>
          <option value="partage">Compte Partagé</option>
        </select>

        <button
          onClick={handleChoix}
          disabled={!typeCompte}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg text-lg font-semibold transition"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default TypeComptePage;
