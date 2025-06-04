import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoriquePromoCodes from '../components/HistoriquePromoCodes';

const DashboardPro = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const chargerUtilisateur = async () => {
      try {
        const { data } = await axios.get('/api/auth/user');
        setUser(data);
      } catch (error) {
        console.error('Erreur chargement user :', error);
      }
    };

    chargerUtilisateur();
  }, []);

  if (!user) return <div className="text-white p-6">Chargement tableau de bord Pro...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">👨‍💼 Tableau de bord PRO – {user.nom} {user.prenom}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🔥 Historique des codes promo */}
        <div className="col-span-1">
          <HistoriquePromoCodes userId={user._id} />
        </div>

        {/* 📦 D’autres composants PRO peuvent être ajoutés ici */}
      </div>
    </div>
  );
};

export default DashboardPro;
