import React from 'react';
import { motion } from 'framer-motion';

const TeaserVision = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="bg-blue-100 text-gray-900 px-6 py-16 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold mb-6"
      >
        🎯 Vision stratégique 2025–2028
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="max-w-3xl mx-auto text-lg mb-10 leading-relaxed"
      >
        Gabkut Pay n'est pas une alternative.  
        C’est une <strong>réinvention totale</strong> de la finance africaine.  
        Une cité autonome, souveraine, sans files, sans retards, sans dépendance humaine et surtout sans déplacements.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left text-sm">
        {[
          { icon: '👥', text: '65 millions d’utilisateurs actifs d’ici 2028.' },
          { icon: '💳', text: '60 millions de cartes virtuelles Visa et MasterCard délivrées.' },
          { icon: '🌍', text: '370+ pays & territoires connectés via nos circuits.' },
          { icon: '🏛️', text: '40 millions de comptes professionnels & institutionnels actifs.' },
          { icon: '🧑‍💼', text: '30 millions d’agents affiliés et distributeurs agréés.' },
          { icon: '🛡️', text: '100 millions de fraudes bloquées par notre IA en temps réel.' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.15, duration: 0.7 }}
            className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-900"
          >
            <strong>{item.icon} {item.text}</strong>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        className="text-lg text-gray-800 mt-12 max-w-4xl mx-auto leading-relaxed"
      >
        Notre mission principale est claire :  
        <strong>mettre fin à la souffrance financière</strong>.  
        Plus de files d'attente, plus de retards, plus d'aller-retours inutiles, plus des déplacements même pour une petite chose qu'on peut gérer soi-même.  
        Chaque utilisateur doit pouvoir <strong>s’offrir le service qu’il veut, à l’instant où il le veut</strong> — sans bouger, sans dépendre, sans attendre.
        L'indépendance, la liberté, le choix, l'autonomie, l'auto-gestion, l'assistance c'est Gabkut Pay
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.9 }}
        className="text-gray-700 mt-8 max-w-3xl mx-auto text-sm italic leading-relaxed"
      >
        Gabkut Pay donne le contrôle total de l'argent à ceux qui ne l'avaient jamais eu.  
        Chaque retrait, chaque envoi, chaque recharge, chaque reçu est entre vos mains.  
        Et cela, avec ou sans agent, avec ou sans carte, même sans Internet.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="mt-12 max-w-4xl mx-auto text-left border-l-4 border-blue-800 pl-4 italic text-sm text-blue-900"
      >
        <p>
          “Ce que vous voyez ici est le fruit de nuits sans sommeil, de fardeaux pour nos compatriotes, et de vouloir voir du changement.  
          d’une vision claire, et d’un combat pour une finance africaine souveraine.”  
          <br /><br />
          “Je vous invite, actionnaires, partenaires, visionaires, familles, entreprises, gouvernements, ONG, ONGD,… à nous rejoindre.
          Nous sommes prêts. Le système est prêt. L’Afrique numérique mérite ça.”  
        </p>
        <p className="mt-4 font-bold">— Gaël KUTALAKUDIMA GABRIEL, Fondateur de Gabkut</p>
      </motion.div>
    </motion.section>
  );
};

export default TeaserVision;
