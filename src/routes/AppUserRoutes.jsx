// ✅ AppUserRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TableauDeBordUser from '../users/pages/TableauDeBordUser';
import HistoriqueTransactions from '../users/components/HistoriqueTransactions';
import CarteVirtuelleBox from '../users/components/CarteVirtuelleBox';
import RechargeCarteBox from '../users/components/RechargeCarteBox';
import SuggestionsBox from '../users/components/SuggestionsBox';
import ChatBox from '../users/components/ChatBox';
import ReclamationBox from '../users/components/ReclamationBox';
import VerificationOtp from '../users/pages/VerificationOtp';
import TypeComptePage from '../users/pages/TypeComptePage';
import ResumeIAInscription from '../users/components/ResumeIAInscription';
import RequireUserAuth from '../middleware/RequireUserAuth';

const AppUserRoutes = () => {
  return (
    <Routes>
      {/* ✅ Page d’accueil utilisateur protégée */}
      <Route
        path="/dashboard"
        element={<RequireUserAuth><TableauDeBordUser /></RequireUserAuth>}
      />

      {/* ✅ Modules utilisateurs */}
      <Route
        path="/dashboard/transactions"
        element={<RequireUserAuth><HistoriqueTransactions /></RequireUserAuth>}
      />
      <Route
        path="/dashboard/carte"
        element={<RequireUserAuth><CarteVirtuelleBox /></RequireUserAuth>}
      />
      <Route
        path="/dashboard/recharger-carte"
        element={<RequireUserAuth><RechargeCarteBox /></RequireUserAuth>}
      />
      <Route
        path="/dashboard/suggestions"
        element={<RequireUserAuth><SuggestionsBox /></RequireUserAuth>}
      />
      <Route
        path="/dashboard/reclamations"
        element={<RequireUserAuth><ReclamationBox /></RequireUserAuth>}
      />
      <Route
        path="/dashboard/chat"
        element={<RequireUserAuth><ChatBox /></RequireUserAuth>}
      />

      {/* ✅ Pages auxiliaires (accessibles après connexion mais hors tableau) */}
      <Route path="/otp-verification" element={<VerificationOtp />} />
      <Route path="/choix-type-compte" element={<TypeComptePage />} />
      <Route path="/resume-inscription" element={<ResumeIAInscription />} />
    </Routes>
  );
};

export default AppUserRoutes;
