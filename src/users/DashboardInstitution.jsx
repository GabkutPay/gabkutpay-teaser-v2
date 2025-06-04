import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import FacturesBox from '../components/FacturesBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import ChatBox from '../components/ChatBox';
import SuggestionsBox from '../components/SuggestionsBox';
import SoldeBox from '../components/SoldeBox';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DashboardInstitution = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Tableau de bord - Compte Institutionnel">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <FacturesBox user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />
    </DashboardLayout>
  );
};

export default DashboardInstitution;
