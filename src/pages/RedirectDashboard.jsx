import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RedirectDashboard = () => {
  const { user } = useAuth(); // ⚠️ Doit contenir le champ `typeCompte`
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.typeCompte) return;

    const routeMap = {
      standard: '/dashboard/standard',
      professionnel: '/dashboard/pro',
      institutionnel: '/dashboard/institution',
      VIP: '/dashboard/vip',
      diaspora: '/dashboard/diaspora',
      étudiant: '/dashboard/etudiant',
      élève: '/dashboard/eleve',
      avenir: '/dashboard/avenir',
      partagé: '/dashboard/partage'
    };

    const destination = routeMap[user.typeCompte] || '/dashboard/standard';
    navigate(destination);
  }, [user, navigate]);

  return <div className="text-center mt-10 text-lg">Redirection sécurisée en cours...</div>;
};

export default RedirectDashboard;
