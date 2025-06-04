import React from 'react';
import CarteVirtuelleBox from '../components/CarteVirtuelleBox';
import RelevéBox from '../components/ReleveBox';
import SuggestionsBox from '../components/SuggestionsBox';
import ChatBox from '../components/ChatBox';
import SoldeBox from '../components/SoldeBox';
import HistoriqueTransactions from '../components/HistoriqueTransactions';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const DashboardStandard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout titre="Tableau de bord - Compte Standard">
      <SoldeBox user={user} />
      <CarteVirtuelleBox user={user} />
      <HistoriqueTransactions user={user} />
      <RelevéBox user={user} />
      <SuggestionsBox user={user} />
      <ChatBox user={user} />
    </DashboardLayout>
  );
};

export default DashboardStandard;
