import React from 'react';
import { useNavigate } from 'react-router-dom';

// Liste des différents types de comptes proposés par Gabkut Pay
// Chaque compte est décrit avec son nom et une description concise des services inclus
const comptes = [
  {
    nom: 'Standard',
    description: 'Compte de base pour les particuliers. Inclus : carte virtuelle, transferts nationaux, support 24h/24.',
  },
  {
    nom: 'Professionnel',
    description: 'Destiné aux commerçants, écoles ou entreprises. Inclut outils de gestion + carte professionnelle.',
  },
  {
    nom: 'Institutionnel',
    description: 'Réservé aux organismes publics/gouvernementaux. Suivi personnalisé, plafonds adaptés, reporting.',
  },
  {
    nom: 'VIP',
    description: 'Service haut de gamme. Assistance prioritaire, options avancées, cashback & abonnements exclusifs.',
  },
  {
    nom: 'Diaspora',
    description: 'Conçu pour les utilisateurs en dehors de l’Afrique. Envoi facile vers l’Afrique, carte multidevise.',
  },
  {
    nom: 'Élève',
    description: 'Compte scolaire pour élèves. Frais réduits, historique simplifié, accès parent possible.',
  },
  {
    nom: 'Étudiant',
    description: 'Compte éducatif avec suivi financier, tarifs préférentiels, et carte Gabkut Campus.',
  },
  {
    nom: 'Partagé',
    description: 'Compte utilisé par plusieurs membres (famille, projet). Accès à plusieurs niveaux et journalisation.',
  },
  {
    nom: 'Voyage',
    description: 'Parfait pour les voyageurs. Cartes temporaires, assurance intégrée, assistant IA voyage.',
  }
];

// Composant principal affichant les détails de chaque type de compte Gabkut Pay
const DetailsTypesComptes = () => {
  // Hook de navigation pour permettre à l’utilisateur de revenir à la page précédente
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Titre principal de la page */}
      <h1 className="text-3xl font-bold text-center">Détails des types de comptes</h1>

      {/* Parcours et affichage de chaque type de compte avec description */}
      {comptes.map((compte, index) => (
        <div key={index} className="bg-white shadow rounded-xl p-4">
          {/* Nom du type de compte */}
          <h2 className="text-xl font-semibold">{compte.nom}</h2>
          {/* Description détaillée des avantages et caractéristiques */}
          <p className="text-gray-700">{compte.description}</p>
        </div>
      ))}

      {/* Bouton centré pour revenir à la page précédente */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="btn bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          aria-label="Revenir à la page précédente"
        >
          Revenir
        </button>
      </div>
    </div>
  );
};

export default DetailsTypesComptes;
