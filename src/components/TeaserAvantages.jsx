import React from 'react';
import { motion } from 'framer-motion';

const avantages = [
  {
    titre: '💳 Cartes Virtuelles IA',
    texte: 'Des cartes Visa contrôlées par intelligence artificielle, CVV dynamique, auto-déconnexion après usage suspect.',
  },
  {
    titre: '📲 Paiement Mobile & Banque',
    texte: 'Gabkut Pay intègre tous les réseaux Mobile Money et comptes bancaires pour envoyer, recevoir ou retirer.',
  },
  {
    titre: '🔐 Sécurité Bancaire Niveau Avion',
    texte: 'Système redondant, IA de défense, QR vérifiables, documents signés numériquement. Vos données sont sacrées.',
  },
  {
    titre: '🌍 Comptes Multi-Devises',
    texte: 'Créez un compte en USD, CDF, EUR... Change automatique avec taux transparent. Solde multi-monnaies.',
  },
  {
    titre: '✈️ Billets d’avion intégrés',
    texte: 'Réservez et payez vos vols depuis l’appli, avec carte Gabkut ou Mobile Money. Confirmation en PDF + email.',
  },
  {
    titre: '🎓 Espace Éducation et Quiz',
    texte: 'Accédez à des quizz éducatifs, formations sur la finance et même des récompenses. Compte Élève ou Étudiant recommandé.',
  },
];

const TeaserAvantages = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-b from-blue-50 to-white py-20 px-6 text-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900">
          ⚡️ Pourquoi choisir Gabkut Pay ?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {avantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-900"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-800">{item.titre}</h3>
              <p className="text-sm">{item.texte}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeaserAvantages;
