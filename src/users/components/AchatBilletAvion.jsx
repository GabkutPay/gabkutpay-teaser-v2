import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AchatBilletAvion = () => {
  const [depart, setDepart] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [vols, setVols] = useState([]);
  const [chargement, setChargement] = useState(false);

  const rechercherVols = async () => {
    if (!depart || !destination || !date) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setChargement(true);
    try {
      const res = await axios.post('/api/vols/recherche', { depart, destination, date });
      setVols(res.data || []);
    } catch (err) {
      toast.error("Erreur lors de la recherche.");
    } finally {
      setChargement(false);
    }
  };

  const acheterBillet = async (volId, prix) => {
    try {
      const res = await axios.post('/api/vols/achat', { volId, prix });
      toast.success("✅ Billet acheté avec succès !");
    } catch (err) {
      toast.error("❌ Achat échoué. Solde insuffisant ou erreur serveur.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🛫 Achat de billet d’avion</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Départ"
          className="p-2 border rounded"
          value={depart}
          onChange={(e) => setDepart(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          className="p-2 border rounded"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        onClick={rechercherVols}
        className="bg-blue-700 text-white py-2 px-6 rounded hover:bg-blue-800"
        disabled={chargement}
      >
        {chargement ? 'Recherche...' : 'Rechercher'}
      </button>

      {vols.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">✈️ Résultats disponibles :</h3>
          {vols.map((vol) => (
            <div
              key={vol._id}
              className="border p-4 rounded-lg shadow-sm mb-4 bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">✈️ {vol.depart} → {vol.destination}</p>
                <p>🗓️ {new Date(vol.date).toLocaleDateString()}</p>
                <p>💰 Prix : {vol.prix.toLocaleString()} USD (frais inclus)</p>
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => acheterBillet(vol._id, vol.prix)}
              >
                Acheter
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchatBilletAvion;
