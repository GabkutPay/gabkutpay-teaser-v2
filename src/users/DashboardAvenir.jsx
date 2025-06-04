import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import SuggestionsBox from '../components/SuggestionsBox';
import ChatBox from '../components/ChatBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardAvenir = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Espace Avenir - Jeune utilisateur">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-yellow-700">🌱 Espace Avenir</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Découverte du monde financier en toute sécurité</li>
          <li>Restrictions intelligentes selon l’âge</li>
          <li>Contenu éducatif (bientôt avec Mon Coach Gabkut)</li>
          <li>Gabkut Lova enfant (création de chansons kids IA)</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAvenir;
