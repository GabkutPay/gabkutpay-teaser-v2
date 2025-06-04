import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import SuggestionsBox from '../components/SuggestionsBox';
import ChatBox from '../components/ChatBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardEtudiant = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Espace Étudiant Gabkut">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-yellow-700">🎓 Outils Étudiant</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Portefeuille étudiant multi-devises</li>
          <li>Suivi des aides et bourses Gabkut</li>
          <li>Accès à Gabkut Lova (création musicale IA)</li>
          <li>Historique + factures scolaires si Gabkut Schola lié</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEtudiant;
