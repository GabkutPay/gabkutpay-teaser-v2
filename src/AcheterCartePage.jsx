import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AcheterCartePage = () => {
  const [cartes, setCartes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Récupère le token utilisateur depuis le localStorage
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);

    // Récupère la liste des cartes disponibles
    const fetchCartes = async () => {
      try {
        const res = await axios.get('/api/user/cartes-disponibles', {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        setCartes(res.data.cartes || []);
      } catch (err) {
        toast.error("Erreur lors du chargement des cartes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartes();
  }, []);

  const handleAchat = async (typeCarte) => {
    try {
      const res = await axios.post('/api/user/acheter-carte', { typeCarte }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("🎉 Carte achetée avec succès ! Elle est visible dans votre historique.");
      } else {
        toast.error(res.data.message || "Erreur lors de l’achat.");
      }
    } catch (err) {
      toast.error("Erreur réseau.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">💳 Acheter une carte Gabkut</h1>

      {loading ? (
        <p className="text-gray-600">Chargement des cartes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartes.map((carte) => (
            <div key={carte._id} className="border rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-blue-700">{carte.nom}</h2>
              <p className="text-sm text-gray-600 mb-2">{carte.description}</p>
              <p className="font-bold text-green-600 mb-4">{carte.prix} $</p>
              <button
                onClick={() => handleAchat(carte.nom)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Acheter cette carte
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcheterCartePage;
