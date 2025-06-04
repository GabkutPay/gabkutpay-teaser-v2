import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { toast } from 'react-toastify';

const RechargerCartePage = () => {
  const { user } = useAuth();
  const [cartes, setCartes] = useState([]);
  const [carteId, setCarteId] = useState('');
  const [montant, setMontant] = useState('');
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    const chargerCartes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/mes-cartes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartes(res.data);
      } catch (err) {
        console.error('Erreur chargement cartes :', err);
      }
    };

    chargerCartes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carteId || !montant) return;

    try {
      setChargement(true);
      const token = localStorage.getItem('token');
      await axios.post('/api/user/recharger-carte', {
        carteId,
        montant: parseFloat(montant),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Carte rechargée avec succès !");
      setCarteId('');
      setMontant('');
    } catch (err) {
      console.error(err);
      toast.error("❌ Échec du rechargement.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <DashboardLayout titre="💳 Recharger ma carte virtuelle">
      <div className="bg-white shadow p-6 rounded-xl max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Carte à recharger</label>
            <select
              value={carteId}
              onChange={(e) => setCarteId(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">-- Choisir une carte --</option>
              {cartes.map(carte => (
                <option key={carte._id} value={carte._id}>
                  {carte.nom} - **** {carte.numero?.slice(-4)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Montant (USD)</label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {chargement ? 'Rechargement...' : 'Recharger maintenant'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RechargerCartePage;
