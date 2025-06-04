// src/admin/components/BarreRechercheAdmin.jsx
import React, { useState } from "react";

const BarreRechercheAdmin = ({ onRecherche }) => {
  const [terme, setTerme] = useState("");

  const lancerRecherche = (e) => {
    e.preventDefault();
    if (onRecherche) onRecherche(terme.trim());
  };

  return (
    <form onSubmit={lancerRecherche} className="flex gap-2 mb-4">
      <input
        type="text"
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
        placeholder="🔍 Rechercher une opération, un utilisateur, une carte..."
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Rechercher
      </button>
    </form>
  );
};

export default BarreRechercheAdmin;
