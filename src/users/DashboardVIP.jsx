import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import FacturesBox from '../components/FacturesBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import ChatBox from '../components/ChatBox';
import SuggestionsBox from '../components/SuggestionsBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardVIP = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Espace Gabkut VIP">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <FacturesBox user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-yellow-700">🎖️ Avantages VIP</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Cartes illimitées avec plafonds supérieurs</li>
          <li>Frais réduits et support prioritaire</li>
          <li>Accès direct aux nouvelles fonctionnalités IA</li>
          <li>Accès aux services confidentiels et à Gabkut Lova complet</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardVIP;
