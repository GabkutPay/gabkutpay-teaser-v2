import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import permissions from '../../utils/permissions';

const DashboardStandard = () => {
  const { user } = useAuth();
  const type = user?.typeCompte?.toLowerCase() || 'standard';
  const userPerms = permissions[type];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur votre tableau de bord</h1>

      {userPerms.canUseWallet && (
        <div className="mb-3">
          <button className="bg-blue-600 text-white p-2 rounded-lg">Accéder au Wallet</button>
        </div>
      )}

      {userPerms.canSendMoney && (
        <div className="mb-3">
          <button className="bg-green-600 text-white p-2 rounded-lg">Envoyer de l'argent</button>
        </div>
      )}

      {userPerms.canAccessVirtualCards && (
        <div className="mb-3">
          <button className="bg-purple-600 text-white p-2 rounded-lg">Gérer mes cartes virtuelles</button>
        </div>
      )}

      {userPerms.canUseGabkutLova && (
        <div className="mb-3">
          <button className="bg-pink-600 text-white p-2 rounded-lg">Créer une chanson IA (Gabkut Lova)</button>
        </div>
      )}

      {userPerms.canAccessGabkutVault && (
        <div className="mb-3">
          <button className="bg-gray-700 text-white p-2 rounded-lg">Accéder à Gabkut Vault</button>
        </div>
      )}

      {userPerms.canUseCoachIA && (
        <div className="mb-3">
          <button className="bg-yellow-600 text-white p-2 rounded-lg">Mon coach IA</button>
        </div>
      )}

      {userPerms.canAccessGabkutNetwork && (
        <div className="mb-3">
          <button className="bg-teal-600 text-white p-2 rounded-lg">Réseau Pro (Rencontre professionnelle)</button>
        </div>
      )}

      {/* Suggestion Box, Chat, Missions toujours actifs */}
      <div className="mt-6">
        <button className="bg-indigo-600 text-white p-2 rounded-lg">Boîte à suggestions</button>
        <button className="ml-2 bg-red-600 text-white p-2 rounded-lg">Accéder au chat</button>
        <button className="ml-2 bg-orange-600 text-white p-2 rounded-lg">Voir mes missions</button>
      </div>
    </div>
  );
};

export default DashboardStandard;
