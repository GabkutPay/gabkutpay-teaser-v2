import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoriquePromoCodes from '../components/HistoriquePromoCodes';
// import autres composants comme HistoriqueTransactions, SuggestionsBox, etc. selon besoin

const DashboardUtilisateur = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Appel API pour récupérer les infos utilisateur connecté
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/user'); // À adapter selon ton backend
        setUser(data);
      } catch (error) {
        console.error('Erreur chargement utilisateur :', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="text-white p-6">Chargement du tableau de bord...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">👤 Bonjour, {user.nom} {user.prenom}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🎁 Historique des codes promo */}
        <div className="col-span-1">
          <HistoriquePromoCodes userId={user._id} />
        </div>

        {/* ✅ Tu peux ajouter ici d'autres blocs comme :
          - <HistoriqueTransactions userId={user._id} />
          - <SuggestionsBox userId={user._id} />
          - <StatistiquesFinancieres userId={user._id} /> */}
      </div>
    </div>
  );
};

export default DashboardUtilisateur;
