import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormulaireRetraitMobile from '../components/FormulaireRetraitMobile';
import HistoriquePromoCodes from '../components/HistoriquePromoCodes';

const DashboardPro = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const chargerUtilisateur = async () => {
      try {
        const { data } = await axios.get('/api/auth/user');
        setUser(data);
      } catch (error) {
        console.error('Erreur lors du chargement de l’utilisateur :', error);
      }
    };

    chargerUtilisateur();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Chargement du tableau de bord professionnel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">
        👨‍💼 Bienvenue sur votre tableau de bord Pro, {user.nom} {user.prenom}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloc : Retrait Mobile Money avec promo automatique */}
        <div className="col-span-1">
          <FormulaireRetraitMobile userId={user._id} />
        </div>

        {/* Bloc : Historique des codes promos */}
        <div className="col-span-1">
          <HistoriquePromoCodes userId={user._id} />
        </div>
      </div>

      {/* Autres blocs spécifiques au compte PRO peuvent être ajoutés ici */}
    </div>
  );
};

export default DashboardPro;
