import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { toast } from 'react-toastify';

const AcheterCartePage = () => {
  const { user } = useAuth();
  const [cartes, setCartes] = useState([]);
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    const chargerCartes = async () => {
      try {
        const res = await axios.get('/api/card-types');
        const actives = res.data.filter((carte) => carte.actif);
        const triees = actives.sort((a, b) => a.ordreAffichage - b.ordreAffichage);
        setCartes(triees);
      } catch (err) {
        console.error('Erreur chargement cartes :', err);
      }
    };
    chargerCartes();
  }, []);

  const envoyerRecuPDF = async (infos) => {
    try {
      await axios.post('/api/user/pdf-recu-carte', {
        nomUtilisateur: infos.nomUtilisateur,
        nomCarte: infos.nomCarte,
        prix: infos.prix,
        dateAchat: new Date(),
        transactionId: infos.transactionId,
        numeroCarte: infos.numeroCarte,
        expiration: infos.expiration,
        email: infos.email,
      });
      console.log("✅ Reçu PDF envoyé.");
    } catch (error) {
      console.error("❌ Erreur envoi PDF :", error);
    }
  };

  const handleAchat = async (carte) => {
    if (!user) return;
    setChargement(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/user/acheter-carte',
        { carteId: carte._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Carte achetée avec succès 🎉");

      await envoyerRecuPDF({
        nomUtilisateur: user.nom + ' ' + user.prenom,
        nomCarte: carte.nom,
        prix: carte.prixVirtuelle,
        transactionId: res.data.transactionId,
        numeroCarte: res.data.numeroCarte,
        expiration: res.data.expiration,
        email: user.email
      });

    } catch (err) {
      console.error('Erreur achat carte :', err);
      toast.error("❌ Échec de l’achat. Solde insuffisant ou erreur serveur.");
    }

    setChargement(false);
  };

  return (
    <DashboardLayout titre="Acheter une carte Gabkut">
      <div className="bg-white shadow p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">🛒 Cartes disponibles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartes.map((carte) => (
            <div key={carte._id} className="border rounded-xl p-4 shadow text-center">
              <h3 className="text-xl font-bold">{carte.nom}</h3>
              <p className="text-sm text-gray-600">Réseau : {carte.reseau}</p>
              <p className="text-sm text-gray-600">Type : {carte.type}</p>
              <p className="text-sm text-gray-600">
                Plafond journalier : {carte.plafondJournalier.toLocaleString()} USD
              </p>
              <p className="text-sm text-gray-600">
                Plafond hebdomadaire : {carte.plafondHebdomadaire.toLocaleString()} USD
              </p>
              <p className="text-sm text-blue-700 font-semibold mt-2">
                Prix virtuelle : {carte.prixVirtuelle.toLocaleString()} USD
              </p>

              <button
                onClick={() => handleAchat(carte)}
                disabled={chargement}
                className="mt-4 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {chargement ? 'Achat en cours...' : 'Acheter cette carte'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AcheterCartePage;
