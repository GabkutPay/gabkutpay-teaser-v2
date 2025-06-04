import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoixTypeCompte = () => {
  const navigate = useNavigate();

  const rediriger = (type) => {
    navigate('/rediriger-compte', { state: { type } });
  };

  const typesDeComptes = [
    { nom: 'Standard', code: 'standard', description: 'Compte individuel de base avec toutes les fonctionnalités.' },
    { nom: 'Professionnel', code: 'professionnel', description: 'Pour entreprises, commerçants et travailleurs indépendants.' },
    { nom: 'Institutionnel', code: 'institutionnel', description: 'Pour les établissements publics, écoles, ministères, ONG.' },
    { nom: 'VIP', code: 'VIP', description: 'Avantages premium, support dédié, plafond élevé.' },
    { nom: 'Diaspora', code: 'diaspora', description: 'Pour ceux vivant à l’étranger, avec options d’envoi et de conversion.' },
    { nom: 'Étudiant', code: 'étudiant', description: 'Compte pour université ou instituts supérieurs, avec tarifs réduits.' },
    { nom: 'Élève', code: 'élève', description: 'Compte jeune avec contrôle parental et limites définies.' },
    { nom: 'Avenir (Enfant)', code: 'avenir', description: 'Pour enfants de moins de 12 ans, avec représentant légal.' },
    { nom: 'Partagé', code: 'partagé', description: 'Compte utilisé par plusieurs membres d’un groupe ou famille.' }
  ];

  return (
    <div className="min-h-screen bg-blue-900 text-white py-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Quel type de compte souhaitez-vous créer ?</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {typesDeComptes.map((compte) => (
          <div
            key={compte.code}
            onClick={() => rediriger(compte.code)}
            className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{compte.nom}</h2>
            <p className="text-sm text-gray-600">{compte.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoixTypeCompte;
