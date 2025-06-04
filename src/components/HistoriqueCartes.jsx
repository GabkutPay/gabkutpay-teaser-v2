import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriqueCartes = () => {
  const [achats, setAchats] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const chargerHistorique = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/historique-cartes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAchats(res.data);
      } catch (err) {
        console.error('Erreur chargement historique :', err);
      }
      setChargement(false);
    };

    chargerHistorique();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">💳 Historique de mes cartes achetées</h2>

      {chargement ? (
        <p>Chargement en cours...</p>
      ) : achats.length === 0 ? (
        <p>Aucun achat de carte enregistré.</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Carte</th>
              <th className="p-2">Montant</th>
              <th className="p-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {achats.map((achat) => (
              <tr key={achat._id} className="border-b">
                <td className="p-2">{new Date(achat.datePaiement).toLocaleString()}</td>
                <td className="p-2">{achat.description}</td>
                <td className="p-2 text-blue-700">{achat.montant} {achat.devise}</td>
                <td className="p-2">{achat.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueCartes;
