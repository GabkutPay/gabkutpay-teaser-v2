import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListeCartesDisponibles = ({ user }) => {
  const [cartes, setCartes] = useState([]);
  const [achatEnCours, setAchatEnCours] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    const chargerCartes = async () => {
      try {
        const res = await axios.get('/api/user/cartes-disponibles');
        setCartes(res.data);
      } catch (err) {
        console.error("Erreur chargement des cartes", err);
      }
    };

    chargerCartes();
  }, []);

  const acheterCarte = async (carteId) => {
    setAchatEnCours(carteId);
    setConfirmation('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/user/acheter-carte', { carteId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfirmation(res.data.message || "Carte achetée avec succès.");
    } catch (err) {
      console.error("Erreur lors de l'achat", err);
      setConfirmation("Une erreur s’est produite.");
    }

    setAchatEnCours(null);
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">🛒 Acheter une carte Gabkut</h2>

      {confirmation && (
        <div className="mb-4 text-green-700 font-medium">{confirmation}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cartes.map((carte) => (
          <div key={carte._id} className="border rounded-xl p-4 shadow text-center">
            <div className="text-xl font-semibold">{carte.nom}</div>
            <p className="text-sm text-gray-600">Type : {carte.type}</p>
            <p className="text-sm text-gray-600">Plafond : {carte.plafond.toLocaleString()} USD</p>
            <p className="text-sm text-gray-600">Prix : {carte.prix.toLocaleString()} USD</p>
            <p className="text-sm text-gray-500 mt-1">Validité : {carte.duree} jours</p>

            <button
              onClick={() => acheterCarte(carte._id)}
              disabled={achatEnCours === carte._id}
              className="mt-4 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {achatEnCours === carte._id ? 'Achat en cours...' : 'Acheter cette carte'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeCartesDisponibles;
