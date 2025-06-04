import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n/i18n'; // import du système de traduction
import AppPublicRoutes from './routes/public/AppPublicRoutes';
import AppUserRoutes from './routes/AppUserRoutes';
import AppAdminRoutes from './routes/AppAdminRoutes';
import ChatbotIA from './components/ChatbotIA';
import LangSelector from './components/LangSelector';

function App() {
  return (
    <BrowserRouter>
      <LangSelector />
      <Routes>
        {/* 🌍 Routes publiques Gabkut Pay */}
        <Route path="/*" element={<AppPublicRoutes />} />

        {/* 🟢 Utilisateurs connectés (dashboard) */}
        <Route path="/dashboard/*" element={<AppUserRoutes />} />

        {/* 🔴 Administration (teaser admin, kyc admin, etc.) */}
        <Route path="/admin/*" element={<AppAdminRoutes />} />
      </Routes>
      <ChatbotIA />
    </BrowserRouter>
  );
}

export default App;
