// 📁 src/components/teaser/TeaserCallToActionFinal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TeaserCallToActionFinal = () => {
  return (
    <motion.section
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-blue-900 text-white py-20 px-6 text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">🚀 Rejoignez la révolution Gabkut Pay</h2>
      <p className="mb-6 text-lg max-w-2xl mx-auto">
        Que vous soyez un utilisateur individuel, un commerçant, un étudiant, un investisseur, un élève, une ONG, une institution Etatique,
        un professionnel, une entreprise,…
        Gabkut Pay est conçu pour vous propulser vers l’avenir financier.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <a
          href="#precommande"
          className="bg-white text-blue-900 font-bold px-6 py-3 rounded-full hover:bg-blue-100 transition"
        >
          💳 Précommander une carte
        </a>
        <a
          href="#"
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          🔐 Créer un compte maintenant
        </a>
      </div>
    </motion.section>
  );
};

export default TeaserCallToActionFinal;
