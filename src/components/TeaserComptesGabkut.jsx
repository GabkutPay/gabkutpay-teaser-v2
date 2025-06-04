import React from 'react';
import { motion } from 'framer-motion';

const TeaserComptesGabkut = () => {
  const comptes = [
    {
      nom: 'Standard / Individuel',
      emoji: '👤',
      description: 'Compte personnel classique pour gérer vos finances au quotidien, envoyer, recevoir et retirer sans limite de liberté.',
    },
    {
      nom: 'Professionnel',
      emoji: '💼',
      description: 'Compte pour commerçants, prestataires, startups et freelances. Suivi des paiements, facturation, retraits intelligents.',
    },
    {
      nom: 'Institutionnel',
      emoji: '🏛️',
      description: 'Conçu pour les structures publiques, ONG, programmes, gouvernements. Sécurité renforcée, autorisations multiples.',
    },
    {
      nom: 'VIP',
      emoji: '💎',
      description: 'Compte haut standing avec avantages exclusifs, plafond élevé, ligne prioritaire, gestion dédiée, carte Visa Premium.',
    },
    {
      nom: 'Diaspora',
      emoji: '🌍',
      description: 'Envoyez et gérez de l’argent depuis l’étranger vers l’Afrique sans vous déplacer. Frais optimisés. Conversion immédiate.',
    },
    {
      nom: 'Élève',
      emoji: '📚',
      description: 'Compte éducatif pour recevoir son argent de poche, payer les frais, participer aux quizz éducatifs et jeux de mémoire.',
    },
    {
      nom: 'Étudiant',
      emoji: '🎓',
      description: 'Suivi budgétaire, support scolaire, achat de mégaoctets, réductions sur billets d’avion. Apprentissage IA intégré.',
    },
    {
      nom: 'Avenir (Enfant)',
      emoji: '👶',
      description: 'Compte épargne évolutif, protégé, que les parents ou parrains alimentent pour l’avenir de l’enfant.',
    },
    {
      nom: 'Partagé',
      emoji: '👥',
      description: 'Un seul compte, plusieurs utilisateurs. Accès personnalisé selon rôle. Idéal pour familles, couples ou projets collectifs.',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-blue-100 to-white px-6 py-20 text-gray-900"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-900"
      >
        🧾 Les types de comptes Gabkut Pay
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {comptes.map((compte, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-900"
          >
            <h3 className="text-xl font-bold mb-2 text-blue-800">
              {compte.emoji} {compte.nom}
            </h3>
            <p className="text-sm leading-relaxed">{compte.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="mt-10 text-center"
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#"
          className="inline-block mt-6 px-6 py-3 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition"
        >
          🔐 Je réserve mon compte maintenant
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default TeaserComptesGabkut;
