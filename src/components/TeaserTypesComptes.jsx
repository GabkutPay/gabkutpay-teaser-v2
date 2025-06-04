import React from 'react';
import { motion } from 'framer-motion';

const TeaserTypesComptes = () => {
  const comptes = [
    { type: 'Standard', icône: '👤', description: 'Pour tous ceux qui souhaitent gérer leur argent facilement, sans paperasse.' },
    { type: 'Professionnel', icône: '🏢', description: 'Idéal pour entrepreneurs, commerçants, freelances et entreprises.' },
    { type: 'Institutionnel', icône: '🏛️', description: 'Destiné aux ONG, écoles, hôpitaux, ministères, administrations.' },
    { type: 'VIP', icône: '👑', description: 'Pour les utilisateurs exigeants, avec assistance dédiée, plafond étendu et bonus exclusifs.' },
    { type: 'Diaspora', icône: '🌍', description: 'Pensé pour nos frères et sœurs vivant à l’étranger avec frais adaptés.' },
    { type: 'Étudiant', icône: '🎓', description: 'Offre spéciale pour les étudiants, avec carte éducation et budget intelligent.' },
    { type: 'Élève', icône: '📚', description: 'Contrôle parental, limite quotidienne, apprentissage financier dès le bas âge.' },
    { type: 'Partagé', icône: '🤝', description: 'Un compte pour 2 à 5 personnes : famille, projet commun, ou association.' },
    { type: 'Avenir (enfant)', icône: '🍼', description: 'Préparez l’avenir de vos enfants avec une carte évolutive et un suivi sécurisé.' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white text-gray-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-10">
          🧩 Types de comptes Gabkut Pay
        </h2>
        <p className="mb-10 text-lg text-gray-700 max-w-3xl mx-auto">
          Gabkut Pay propose plusieurs types de comptes pour s’adapter à votre réalité. Voici ceux que vous pouvez choisir dès aujourd’hui.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {comptes.map((compte, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="border border-blue-200 rounded-xl p-5 bg-blue-50 shadow"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{compte.icône} {compte.type}</h3>
              <p className="text-gray-800">{compte.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeaserTypesComptes;
