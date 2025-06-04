import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import FacturesBox from '../components/FacturesBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import ChatBox from '../components/ChatBox';
import SuggestionsBox from '../components/SuggestionsBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardDiaspora = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Espace Diaspora Gabkut">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <FacturesBox user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-blue-700">🌍 Services spéciaux Diaspora</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Envois internationaux avec taux préférentiel</li>
          <li>Gestion des proches restés au pays</li>
          <li>Accès au module de parrainage multi-niveaux</li>
          <li>Réservations visa, hôtel, assurance intégrées</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardDiaspora;
