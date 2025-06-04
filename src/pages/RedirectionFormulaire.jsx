import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormulaireInscription from './FormulaireInscription';

const RedirectionFormulaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const typeCompte = searchParams.get('type');

  const titres = {
    standard: "Formulaire Compte Standard",
    professionnel: "Formulaire Compte Professionnel",
    institutionnel: "Formulaire Compte Institutionnel",
    VIP: "Formulaire Compte VIP",
    diaspora: "Formulaire Diaspora",
    étudiant: "Formulaire Étudiant",
    élève: "Formulaire Élève",
    avenir: "Formulaire Compte Avenir",
    partagé: "Formulaire Compte Partagé",
  };

  const titre = titres[typeCompte] || "Formulaire Gabkut Pay";

  if (!typeCompte) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">❌ Aucun type de compte détecté</h2>
        <p className="mt-2 text-gray-600">Veuillez choisir un type de compte avant de continuer.</p>
        <button
          onClick={() => navigate('/choix-compte')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Retour à la sélection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">{titre}</h1>
      <FormulaireInscription typeComptePrérempli={typeCompte} />
    </div>
  );
};

export default RedirectionFormulaire;
