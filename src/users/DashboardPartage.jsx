import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import SuggestionsBox from '../components/SuggestionsBox';
import ChatBox from '../components/ChatBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardPartage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Espace Compte Partagé">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />

      <div className="mt-6 bg-pink-50 border-l-4 border-pink-600 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-pink-700">👥 Mode Compte Partagé</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Accès partagé à plusieurs utilisateurs autorisés</li>
          <li>Permissions configurées par le titulaire principal</li>
          <li>Journalisation de toutes les actions</li>
          <li>Idéal pour couples, familles, associations</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPartage;
