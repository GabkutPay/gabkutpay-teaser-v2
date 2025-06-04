// ✅ Unauthorized.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <ShieldAlert size={64} className="text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Accès refusé</h1>
      <p className="mb-4">Vous n’avez pas les droits pour accéder à cette page.</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        ⬅️ Retour à la page précédente
      </button>
    </div>
  );
};

export default Unauthorized;
