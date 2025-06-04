import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlocageSiSuspendu from '../components/BlocageSiSuspendu';
import DashboardLayout from '../components/DashboardLayout';

const RechargerCarte = () => {
  const [user, setUser] = useState(null);
  const [cartes, setCartes] = useState([]);
  const [carteId, setCarteId] = useState('');
  const [montant, setMontant] = useState('');
  const [message, setMessage] = useState('');
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    axios.get('/api/users/me')
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));

    axios.get('/api/user/mes-cartes')
      .then((res) => setCartes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleRecharge = async () => {
    if (!carteId || !montant) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    setChargement(true);
    setMessage('');

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        '/api/user/recharger-carte',
        { carteId, montant: parseFloat(montant) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Carte rechargée.");
      setMontant('');
      setCarteId('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Erreur lors du rechargement.");
    }

    setChargement(false);
  };

  if (!user) return <div className="p-6 text-center">Chargement...</div>;

  return (
    <DashboardLayout titre="Recharger une carte">
      <BlocageSiSuspendu isSuspended={user.proSubscription?.isActive === false}>
        <div className="bg-white max-w-lg mx-auto p-6 mt-10 shadow rounded-xl">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">💳 Recharge de carte</h2>

          {message && (
            <div className="mb-4 p-3 rounded text-white bg-blue-700">
              {message}
            </div>
          )}

          <label className="block mb-2 text-sm text-gray-600">Sélectionner une carte</label>
          <select
            className="w-full mb-4 p-2 border rounded"
            value={carteId}
            onChange={(e) => setCarteId(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            {cartes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nom} – Solde : {c.solde}$
              </option>
            ))}
          </select>

          <label className="block mb-2 text-sm text-gray-600">Montant à recharger (USD)</label>
          <input
            type="number"
            className="w-full mb-4 p-2 border rounded"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />

          <button
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleRecharge}
            disabled={chargement}
          >
            {chargement ? 'Rechargement...' : 'Recharger maintenant'}
          </button>
        </div>
      </BlocageSiSuspendu>
    </DashboardLayout>
  );
};

export default RechargerCarte;
