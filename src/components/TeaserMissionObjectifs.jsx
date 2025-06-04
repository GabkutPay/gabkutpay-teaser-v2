import React from 'react';
import { motion } from 'framer-motion';

const TeaserMissionObjectifs = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-b from-blue-50 to-white py-20 px-6 text-gray-900"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-blue-900">
          🎯 Notre mission et nos objectifs
        </h2>
        <p className="text-lg sm:text-xl mb-10 leading-relaxed text-gray-800">
          Gabkut Pay n'est pas simplement un service financier. C’est une révolution numérique visant à restituer
          le **contrôle économique** à chaque individu, chaque famille, chaque communauté, où qu’ils se trouvent.
          Nous sommes venus briser toutes les règles pour que l'utilisateur soit son propre maître, vouloir faire ce qu'il veut,
          quand et où il le veut. 
          Nous visons rendre l'indépendance dûe aux propriétaires des portefeuilles. Supprimer les files d'attentes, automatiser les opérations
          afin de limiter des déplacements inutiles à longuer des journées. 
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-900"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">💡 Autonomie financière</h3>
            <p>
              Permettre à chacun d’accéder à ses fonds sans intermédiaire, sans humiliation, sans contrainte géographique.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-900"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">🚀 Innovation continue</h3>
            <p>
              Développer des outils intelligents, sécurisés, intuitifs et puissants : IA, cartes, QR Code, conversions dynamiques...
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-900"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">🌍 Impact continental</h3>
            <p>
              Servir non seulement le Congo, mais l’Afrique entière. Unifier les paiements, stimuler le commerce, connecter les talents.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-900"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">🛡️ Sécurité invisible</h3>
            <p>
              Protéger chaque transaction, chaque donnée, chaque identité avec un système de défense prédictif et IA intégrée.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-900"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">📚 Éducation & transparence</h3>
            <p>
              Former nos utilisateurs à mieux gérer leurs finances. Afficher clairement les frais. Aucune surprise.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-900"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">📈 Croissance inclusive</h3>
            <p>
              Associer les utilisateurs, les partenaires, les investisseurs à une aventure commune avec des retours mesurables.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TeaserMissionObjectifs;
