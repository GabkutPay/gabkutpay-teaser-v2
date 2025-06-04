import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import SuggestionsBox from '../components/SuggestionsBox';
import ChatBox from '../components/ChatBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardEleve = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Espace Élève Gabkut">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-blue-700">📚 Outils Élève</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Suivi du solde scolaire (avec Gabkut Schola)</li>
          <li>Historique de paiement des frais</li>
          <li>Création de musique avec Gabkut Lova</li>
          <li>Espace sécurisé de discussion (modéré)</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEleve;
