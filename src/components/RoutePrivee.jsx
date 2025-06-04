import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoutePrivee = ({ children }) => {
  const { user, loading } = useAuth();

  // ⏳ En attente des infos de l'utilisateur
  if (loading) {
    return <div className="text-center mt-10 text-xl font-semibold">Chargement en cours...</div>;
  }

  // 🔐 Non connecté → Rediriger vers login
  if (!user) {
    return <Navigate to="/connexion" />;
  }

  // ✅ Accès autorisé
  return children;
};

export default RoutePrivee;
