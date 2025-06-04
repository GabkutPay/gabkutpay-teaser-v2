// 🔐 src/components/RouteProtegee.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RouteProtegee = ({ children, autoriseTypeCompte = [] }) => {
  const { user } = useAuth();

  // 🔒 1. Non connecté ? Redirige
  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  // 🔒 2. Si restriction par type de compte
  if (autoriseTypeCompte.length > 0 && !autoriseTypeCompte.includes(user.typeCompte?.toLowerCase())) {
    return <Navigate to="/interdit" replace />;
  }

  // ✅ Autorisé
  return children;
};

export default RouteProtegee;
