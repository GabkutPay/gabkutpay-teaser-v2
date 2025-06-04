import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ReleveBox = ({ user }) => {
  const [debut, setDebut] = useState('');
  const [fin, setFin] = useState('');
  const [chargement, setChargement] = useState(false);
  const [lien, setLien] = useState('');

  const genererReleve = async () => {
    setChargement(true);
    setLien('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/user/generer-releve-pdf',
        {
          userId: user._id,
          dateDebut: debut,
          dateFin: fin,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLien(res.data.lienPDF);
    } catch (err) {
      console.error("Erreur génération du relevé :", err);
    }
    setChargement(false);
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">📄 Générer mon relevé de compte</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de début :</label>
          <input
            type="date"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de fin :</label>
          <input
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
      </div>

      <button
        onClick={genererReleve}
        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!debut || !fin || chargement}
      >
        {chargement ? 'Génération en cours...' : 'Générer le relevé PDF'}
      </button>

      {lien && (
        <p className="mt-4 text-green-700">
          ✅ Relevé prêt : <a href={lien} target="_blank" className="underline">Télécharger ici</a>
        </p>
      )}
    </div>
  );
};

export default ReleveBox;
